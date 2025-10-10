'use client';

import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, browserLocalPersistence, setPersistence, sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth';

// These helper functions are intended to be used from non-component contexts.
// They obtain the Auth SDK instance directly instead of using the React hook
// `useAuth`, which must only be called from React function components or custom hooks.

export async function signInWithGoogle() {
  const auth = getAuth();
  await setPersistence(auth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signInWithGithub() {
  const auth = getAuth();
  await setPersistence(auth, browserLocalPersistence);
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function sendPasswordResetEmail(email: string) {
  const auth = getAuth();
  return firebaseSendPasswordResetEmail(auth, email);
}