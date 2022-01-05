import { User } from '@prisma/client';
import nProgress from 'nprogress';
import nProgressStyles from 'nprogress/nprogress.css';
import * as React from 'react';
import {
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition,
} from 'remix';
import humanImg from '../public/images/human.png';
import { SadEmojiIcon } from './components/Icons';
import { Sidebar } from './components/Sidebar';
import { AuthProvider } from './features/auth';
import { getUser } from './features/auth/utils/getUser';
import styles from './tailwind.css';

nProgress.configure({ showSpinner: false });

export const meta: MetaFunction = () => {
  const description =
    'Share your experiences together with other people.';
  return {
    title: 'Blogo',
    description,
    keywords: 'experience,remix,post,blog,story',
    'twitter:image': humanImg,
    'twitter:card': 'summary',
    'twitter:creator': '@Chimiz_',
    'twitter:site': '@Chimiz_',
    'twitter:title': 'Blogo',
    'twitter:description': description,
    'og:image': humanImg,
    'og:title': 'Blogo',
    'og:description': description,
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: nProgressStyles },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Montserrat/Montserrat-Medium.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Montserrat/Montserrat-Medium.woff',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
  ];
};

type LoaderData = {
  user: User | null;
};

export const loader: LoaderFunction = async ({
  request,
}) => {
  const user = await getUser(request);

  const data: LoaderData = {
    user,
  };

  return data;
};

function Document({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-background">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && (
          <LiveReload />
        )}
      </body>
    </html>
  );
}

export default function App() {
  const { user } = useLoaderData<LoaderData>();

  const transition = useTransition();

  React.useEffect(() => {
    if (transition.state === 'idle') nProgress.done();
    else nProgress.start();
  }, [transition.state]);

  return (
    <Document>
      <AuthProvider user={user!}>
        <main className="max-w-7xl m-auto w-100 text-white">
          <div className="grid grid-cols-4 gap-2 sm:p-10 p-0">
            <div className="lg:col-span-1 col-span-4 h-20">
              <Sidebar />
            </div>
            <div className="col-span-4 lg:col-span-3">
              <Outlet />
            </div>
          </div>
        </main>
      </AuthProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <div className="bg-black-default">
        <div className="flex max-w-lg text-gray-300 flex-col justify-center min-h-screen m-auto gap-4 w-full rounded-md px-4 py-8">
          <div className="flex flex-col items-center text-red-400">
            <SadEmojiIcon className="w-24 h-24" />
            <h1 className="py-2 text-3xl">
              something went very wrong
            </h1>
          </div>
          <div>
            <details>
              <summary>
                <span className="text-gray-300">
                  Error Details
                </span>
              </summary>
              <code className="text-red-400">
                {JSON.stringify(error.stack, null, 2)}
              </code>
            </details>
          </div>
        </div>
      </div>
    </Document>
  );
}
