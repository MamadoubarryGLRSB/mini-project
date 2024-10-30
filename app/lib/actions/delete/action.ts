'use server';

import { revalidateTag } from 'next/cache';


export async function deleteArticle(id:number) {


  try {
    const response = await fetch(`${process.env.BASE_API_URL_PRISMA}/articles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression`);
    }

    // Revalider le cache pour la liste des articles si nécessaire
    revalidateTag('articles');

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}