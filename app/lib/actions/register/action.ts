'use server';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export async function register(data: RegisterData) {
  try {
    const response = await fetch(`${process.env.REACT_BASE_API_URL_PRISMA}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      } as HeadersInit,
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
