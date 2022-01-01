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
} from 'remix';
import { Sidebar } from './components/Sidebar';
import { getUser } from './features/auth/utils/getUser';
import styles from './tailwind.css';

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
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

export const loader: LoaderFunction = async ({
  request,
}) => {
  const user = await getUser(request);

  return user;
};

export default function App() {
  const user = useLoaderData();

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
      <body className="bg-gray-dark">
        <main className="max-w-7xl m-auto w-100 text-white">
          <div className="grid grid-cols-4 gap-2 sm:p-10 p-0">
            <div className="lg:col-span-1 col-span-4 h-20">
              <Sidebar user={user} />
            </div>
            <div className="col-span-4 lg:col-span-3">
              <Outlet />
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && (
          <LiveReload />
        )}
      </body>
    </html>
  );
}
