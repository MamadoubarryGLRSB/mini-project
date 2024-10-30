'use client';
import { register } from '@/app/lib/actions/register/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router=useRouter();
  const formFields = [
    {
      label: 'Nom',
      name: 'name',
      placeholder: 'Ex: Barry',
      type: 'text',
      value: formData.name,
      errors: errors.name
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Entrer votre adresse mail',
      type: 'texemailt',
      value: formData.email,
      errors: errors.email
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Entrer votre password',
      type: 'password',
      value: formData.password,
      errors: errors.password
    },
    {
      label: 'PasswordConfirm',
      name: 'passwordConfirm',
      placeholder: 'Veillez confirmer votre mot de pass',
      type: 'password',
      value: formData.passwordConfirm,
      errors: errors.passwordConfirm
    }
  ];

  type FormDataKeys = keyof typeof fieldSchemas;

  const fieldSchemas = {
    name: z.string().min(5, {
      message: 'Le nom doit avoir minimum 5 caractère '
    }),

    email: z.string().email({
      message: 'veillez entrer une adresse mail valid'
    }),
    password: z
      .string()
      .min(12, {
        message: 'Doit avoir 12 chiffres'
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
        message: 'le password doit contenir au mini un c M n '
      }),
    passwordConfirm: z
      .string()
      .min(12, {
        message: 'Doit avoir 12 chiffres'
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
        message: 'le password doit contenir au mini un c M n '
      })
  };

  const schema = z.object({
    name: fieldSchemas.name,
    email: fieldSchemas.email,
    password: fieldSchemas.password,
    passwordConfirm: fieldSchemas.passwordConfirm
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    try {
      await schema.parseAsync(formData);

      const response = await register(formData);
      if (response.id) toast.success('Utilisateur ajouté avec succès');
      else toast.error('oups y a un souci');
      router.push('/');
    } catch (error: any) {
      if (error.errors) {
        const newErrors: { [key: string]: string } = {};

        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });

        setErrors(newErrors);
      } else {
        toast.error('Oups');
      }
    }
  };

  return (
    <>
      <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-6">
                {formFields.map((field, index) => (
                  <div key={index}>
                    <label
                      htmlFor={field.name}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
