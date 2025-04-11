'use server';

import { cookies } from "next/headers";
import { db, auth } from "@/firebase/admin";

// ONE WEEK SESSION LENGTH
const SESSION_LENGTH = 60 * 60 * 24 * 7; // seconds * minutes * hours * days

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if(userRecord.exists) {
      return {
        success: false,
        message: 'User already exists. Please sign in instead.',
      }
    }

    await db.collection('users').doc().set({
      name,
      email,
    });

    return {
      success: true,
      message: 'Account created successfully. Please sign in.',
    }

  } catch(error: any) {
    console.error(`Error creating a user: ${error}`);

    if(error.code === 'auth/email-already-exists') {
      return {
        error: error,
        success: false,
        message: 'This email is already in use',
      }
    }

    return {
      error: error,
      success: false,
      message: 'Failed to create an account',
    }
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if(!userRecord) {
      return {
        success: false,
        message: 'User does not exist. Create an account.'
      }
    }

    await setSessionCookie(idToken);

  } catch(error) {
    console.error(`Error signing in to account: ${error}`);

    return {
      error: error,
      success: false,
      message: 'Failed to sign in to account',
    }
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 1000 * SESSION_LENGTH,
  });

  cookieStore.set('session', sessionCookie, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: SESSION_LENGTH,
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if(!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

    if(!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;

  } catch(error) {
    console.error(`Error occurred while attempting getCurrentUser action: ${error}`);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}