export interface Article {
    id: number;
    title: string;
    description: string;
    body: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    authorId: number | null;
  }
  