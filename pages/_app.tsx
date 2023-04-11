import "@/styles/globals.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto min-h-[calc(100vh-300px)] max-w-7xl px-2 sm:min-h-[calc(100vh-400px)] sm:px-6 lg:px-8">
      <Component {...pageProps} />
    </div>
  );
}
