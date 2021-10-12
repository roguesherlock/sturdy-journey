import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "tailwindcss/tailwind.css";
import "../css/rating.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
