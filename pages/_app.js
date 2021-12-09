import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
