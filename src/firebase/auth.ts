'use client';

import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, browserLocalPersistence, setPersistence, sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '@/firebase';

export async function signInWithGoogle() {
  const auth = useAuth();
  await setPersistence(auth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signInWithGithub() {
  const auth = useAuth();
  await setPersistence(auth, browserLocalPersistence);
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function sendPasswordResetEmail(email: string) {
  const auth = useAuth();
  return firebaseSendPasswordResetEmail(auth, email);
}