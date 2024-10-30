'use client';

import { login } from '@/app/lib/actions/auth/action';
import { setAuth } from '@/app/lib/redux/features/auth.slice';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { z } from 'zod';

interface LoginFormProps {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormProps>({
    email: '',
    password: ''
  });

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  type FormDataKeys = keyof typeof fieldSchemas;

  const fieldSchemas = {
    email: z.string().email({
      message: 'Veuillez entrer un e-mail valide.'
    }),
    password: z
      .string()
      .min(12, {
        message: 'Le mot de passe doit contenir au moins 12 caractères.'
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
        message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.'
      })
  };

  const schema = z.object({
    email: fieldSchemas.email,
    password: fieldSchemas.password
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);

    try {
      await schema.parseAsync(formData);

      const response = await login(formData);

      if (response.accessToken) {
        const data = { ...response, isAuth: true };

        dispatch(setAuth(data));

        toast.success('Utilisateur connecté avec succès.');

        router.push('/');
      } else if (response.statusCode === 401) {
        toast.error('Identifiants incorrects.');
      } else {
        toast.error('Erreur lors de la connexion, veuillez réessayer.');
      }
    } catch (error: any) {
      console.error('Erreur dans handleSubmit:', error);
      if (error.errors) {
        const newErrors: { [key: string]: string } = {};

        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });

        setErrors(newErrors);
      } else {
        toast.error('Oups, une erreur est survenue.');
      }
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Entrez votre e-mail"
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Entrez votre mot de passe"
          />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoad}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoad ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </div>
      </form>
    </div>
  );
}
