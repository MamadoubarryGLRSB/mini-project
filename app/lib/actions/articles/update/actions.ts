'use server';

import { revalidateTag } from 'next/cache';

export interface UpdateArticlePayload {
  id: number;
  title: string;
  body: string;
  description: string;
}

export async function updateArticle(payload: UpdateArticlePayload) {
  const { id, ...body } = payload;

  console.log(payload);

  try {
    const response = await fetch(`${process.env.BASE_API_URL_PRISMA}/articles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour de l'article`);
    }

    // Revalider le cache pour la liste des articles si nécessaire
    revalidateTag('articles');

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
