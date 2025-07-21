"use client";
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export function useAuth() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  // Simuler un utilisateur Supabase avec l'ID de Clerk
  const supabaseUser = user ? {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || ''
  } : null;

  return {
    user: supabaseUser,
    loading,
    isLoaded
  };
} 