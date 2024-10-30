'use client';

import { deleteCookies } from '@/app/lib/actions/sessionCookies/action';
import { removeAuth } from '@/app/lib/redux/features/auth.slice';
import { useAppSelector } from '@/app/lib/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Nav() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuth } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(removeAuth());
    await deleteCookies();
    router.push('/');
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="flow bite logo"
            className="h-8"
            width={50}
            height={50}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-Football</span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/competitions"
                className={`${
                  pathname === '/competitions' ? 'text-blue-500 underline' : 'text-black'
                } block py-2 px-3 rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Competitions
              </Link>
            </li>
            <li>
              <Link
                href="/teams"
                className={`${
                  pathname === '/teams' ? 'text-blue-500 underline' : 'text-black'
                } block py-2 px-3 rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Teams
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className={`${
                  pathname === '/articles' ? 'text-blue-500 underline' : 'text-black'
                } block py-2 px-3 rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Articles
              </Link>
            </li>
            {isAuth && (
              <li>
                <Link
                  href="/create-new-article"
                  className={`${
                    pathname === '/create-new-article' ? 'text-blue-500 underline' : 'text-black'
                  } block py-2 px-3 rounded md:bg-transparent md:p-0`}
                  aria-current="page"
                >
                  Ajouter Article
                </Link>
              </li>
            )}

            {!isAuth ? (
              <li>
                <Link
                  href="/login"
                  className={`${
                    pathname === '/login' ? 'text-blue-500 underline' : 'text-black'
                  } block py-2 px-3 rounded md:bg-transparent md:p-0`}
                  aria-current={pathname === '/login' ? 'page' : undefined}
                >
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="text-black block py-2 px-3 rounded md:bg-transparent md:p-0"
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
