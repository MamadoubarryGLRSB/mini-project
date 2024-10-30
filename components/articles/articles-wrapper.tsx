'use client';
import { useState } from 'react';
import { Article } from '@/ts/interfaces/article.interface';
import Link from 'next/link';
import ArticleCard from './article-card';
import { Fragment } from 'react';
import { useAppSelector } from '@/app/lib/redux/hooks';

interface ArticlesWrapperProps {
  articlesResponse: Article[];
}

export default function ArticlesWrapper({ articlesResponse }: ArticlesWrapperProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4; // Nombre d'articles à afficher par page

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(articlesResponse.length / articlesPerPage);

  // Calculer les articles à afficher pour la page actuelle
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articlesResponse.slice(indexOfFirstArticle, indexOfLastArticle);

  const { isAuth } = useAppSelector((state) => state.auth);
  // Fonction pour changer de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="relative mb-6">
        <h1 className="text-center font-bold text-3xl text-blue-800 underline underline-offset-8">
          Liste des articles
        </h1>
        
        
        <Link href="/create-new-article">
        <>
        {isAuth && (
          <button className="absolute right-4 top-0 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
          Add Article
        </button>

        )}
          
          </>
        </Link>
      </div>

      <p className="text-2xl">{articlesResponse.length} articles</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {currentArticles.map((article: Article) => (
          <Fragment key={article.id}>
            <ArticleCard
              id={article.id}
              title={article.title}
              description={article.description}
              createdAt={article.createdAt}
              body={article.body}
            />
          </Fragment>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            } hover:bg-blue-500 focus:outline-none`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
