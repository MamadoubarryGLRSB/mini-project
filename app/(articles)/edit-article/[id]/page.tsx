import { EditArticleForm } from '@/components/articles/edit-article-form';

async function getArticleById(id: number) {
  try {
    const article = await fetch(`${process.env.BASE_API_URL_PRISMA}/articles/${id}`);

    const data = await article.json();

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export default async function EditArticlePage({ params }: { params: { id: number } }) {
  const { id } = params;

  const article = await getArticleById(id);

  return <EditArticleForm article={article} />;
}
