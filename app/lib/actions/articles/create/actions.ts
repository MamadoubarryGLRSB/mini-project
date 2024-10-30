'use server';

import { revalidateTag } from 'next/cache';

export interface CreateArticlePayload {
  title: string;
  body: string;
  description: string;
}

export async function createArticle(body: CreateArticlePayload) {
  console.log(body);
  try {
    const response = await fetch(`${process.env.BASE_API_URL_PRISMA}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la création de l'article `);
    }

    revalidateTag('articles');

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
