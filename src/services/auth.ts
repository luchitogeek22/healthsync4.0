import type { Session } from '@supabase/supabase-js';
import { requireSupabase } from '../lib/supabase';

export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
}

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await requireSupabase()
    .from('profiles')
    .select('id, role, full_name')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function signIn(email: string, password: string): Promise<Session> {
  const { data, error } = await requireSupabase().auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  if (!data.session) throw new Error('No se pudo crear una sesión.');
  return data.session;
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await requireSupabase().auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await requireSupabase().auth.signOut();
  if (error) throw error;
}
