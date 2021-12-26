import type { LinksFunction, MetaFunction } from 'remix';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
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

export default function App() {
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
      <body className="bg-gray-default font-montserrat">
        <main>
          <Outlet />
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
