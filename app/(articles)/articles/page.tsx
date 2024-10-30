import ArticlesWrapper from '@/components/articles/articles-wrapper';

export async function getArticles() {
  try {
    const res = await fetch(`${process.env.REACT_BASE_API_URL_PRISMA}/articles`, { next: { tags: ['articles'] } });

    console.log(res);

    const articles = await res.json();
    

    return articles;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
  }


export default async function ArticlesPage() {
  const articlesResponse = await getArticles();
  return <ArticlesWrapper articlesResponse={articlesResponse} />;
}
