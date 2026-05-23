-- 2BAC English Prep Supabase setup
-- Run this once in Supabase SQL Editor, then update supabase-config.js with your project URL and anon key.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default 'Student',
  role text not null default 'student' check (role in ('student', 'admin')),
  status text not null default 'active' check (status in ('active', 'disabled')),
  class_group text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_progress (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists student_progress_touch_updated_at on public.student_progress;
create trigger student_progress_touch_updated_at
before update on public.student_progress
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, status)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', 'Student'),
    'student',
    'active'
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(public.profiles.full_name, excluded.full_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and status = 'active'
  );
$$;

create or replace function public.is_active_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and status = 'active'
  );
$$;

alter table public.profiles enable row level security;
alter table public.student_progress enable row level security;

drop policy if exists profiles_read_own_or_admin on public.profiles;
create policy profiles_read_own_or_admin
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_insert_own_student on public.profiles;
create policy profiles_insert_own_student
on public.profiles for insert
to authenticated
with check (id = auth.uid() and role = 'student' and status = 'active');

drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_admin_update
on public.profiles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists progress_read_own_or_admin on public.student_progress;
create policy progress_read_own_or_admin
on public.student_progress for select
to authenticated
using ((user_id = auth.uid() and public.is_active_user()) or public.is_admin());

drop policy if exists progress_insert_own on public.student_progress;
create policy progress_insert_own
on public.student_progress for insert
to authenticated
with check (user_id = auth.uid() and public.is_active_user());

drop policy if exists progress_update_own on public.student_progress;
create policy progress_update_own
on public.student_progress for update
to authenticated
using (user_id = auth.uid() and public.is_active_user())
with check (user_id = auth.uid() and public.is_active_user());

drop policy if exists progress_delete_own_or_admin on public.student_progress;
create policy progress_delete_own_or_admin
on public.student_progress for delete
to authenticated
using ((user_id = auth.uid() and public.is_active_user()) or public.is_admin());

-- After the first admin signs up, run this with their real email:
-- update public.profiles set role = 'admin' where email = 'admin@example.com';
