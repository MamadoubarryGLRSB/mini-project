'use client';

import { createArticle } from '@/app/lib/actions/articles/create/actions';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
interface FormData {
  title: string;
  body: string;
  description: string;
  published: boolean;
}

export default function NewArticlePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    body: '',
    description: '',
    published: true
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formFields = [
    {
      label: 'Title',
      name: 'title',
      placeholder: 'Title',
      type: 'text',
      value: formData.title,
      errors: errors.title
    },
    {
      label: 'Corps',
      name: 'body',
      placeholder: 'Title',
      type: 'text',
      value: formData.body,
      errors: errors.body
    },
    {
      label: 'Description',
      name: 'description',
      placeholder: 'Saisir votre description',
      type: 'text',
      value: formData.description,
      errors: errors.description
    }
  ];
  type FormDataKeys = keyof typeof fieldSchemas;

  const fieldSchemas = {
    title: z.string().min(5, {
      message: 'Le titre de article doit faire au minimun 5 caractères'
    }),
    body: z.string().min(5, {
      message: 'le body doit faire au minimun 5 caractères'
    }),
    description: z.string().min(5, {
      message: 'la description doit faire au minimun 5 caractères'
    })
  };

  const schema = z.object({
    title: fieldSchemas.title,
    body: fieldSchemas.body,
    description: fieldSchemas.description
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if (value === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      return;
    }
    try {
      await fieldSchemas[name as FormDataKeys].parseAsync(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (err: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: err.errors[0]?.message || ''
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.parseAsync(formData);
      await createArticle(formData);

      toast.success('Articles crée avec succès !');
      router.push('/articles');
    } catch (error: any) {
      if (error.erros) {
        const newErrors: { [key: string]: string } = {};

        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });

        setErrors(newErrors);
      } else {
        toast.error("Erreur lors de la creation de l'article. Veuillez réessayer.");
      }
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Créer un nouvel article</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-6">
              {formFields.map((field, index: number) => (
                <div key={index}>
                  <label htmlFor={field.label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={field.value}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                  />
                  {errors && (
                    <span className="mt-1 text-sm text-red-500" id="error_input">
                      {field.errors}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
