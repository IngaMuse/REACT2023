import "@/styles/globals.css";
import "normalize.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { wrapper } from "../lib/store/store";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default wrapper.withRedux(App);
