'use server';

import { createSession } from "../../session/session";

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  try {
    const response = await fetch(`${process.env.REACT_BASE_API_URL_PRISMA}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      } as HeadersInit,
      body: JSON.stringify(data),
    });

    const sessionData = await response.json();
    await createSession(sessionData);


    return sessionData;
  } catch (error: unknown) {
    // Check if the error is an instance of Error and has a message
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}