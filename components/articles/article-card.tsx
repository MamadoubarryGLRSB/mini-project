'use client';

import { deleteArticle } from '@/app/lib/actions/delete/action';
import { useAppSelector } from '@/app/lib/redux/hooks';
import { formatDate } from '@/utils/helper-fonctions';
import Link from 'next/link';

import toast from 'react-hot-toast';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  body: string;
  createdAt: string;
}

export default function ArticleCard({ id, title, description, createdAt, body }: ArticleCardProps) {

  const { isAuth } = useAppSelector((state) => state.auth);
    
  const handleDelete = async () => {
    try {
      const res = await deleteArticle(id);
      if (res) {
        toast.success('Article Supprimé!');
      }
    } catch (error: unknown) {
      toast.error("Erreur lors de la mise à jour de l'article. Veuillez réessayer.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 transition transform hover:-translate-y-2 hover:shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 mb-2">{description}</p>
      <p className="text-gray-500 mb-2">{body}</p>
      <p className="text-gray-400 text-sm">Publié le : {formatDate(new Date(createdAt))}</p>

      <div className="flex flex-row items-center justify-between mt-4">
        <Link
          href={`/articles/${id}`}
          className="flex items-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition transform hover:-translate-y-1 hover:shadow focus:outline-none dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-700"
        >
          <FaEye className="mr-2" />
          Voir l&apos;article
        </Link>
        
        {isAuth && (
          <>
            <Link
              href={`/edit-article/${id}`}
              className="flex items-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition transform hover:-translate-y-1 hover:shadow focus:outline-none dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-700"
            >
              <FaEdit className="mr-2" />
              Modifier
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition transform hover:-translate-y-1 hover:shadow focus:outline-none dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-700"
            >
              <FaTrash className="mr-2" />
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
