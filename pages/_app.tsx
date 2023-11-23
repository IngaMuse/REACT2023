import "@/styles/globals.css";
import "normalize.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { wrapper } from "../lib/store/store";
import { Provider } from "react-redux";
import ErrorBoundary from "@/components/Error/Error";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <main className={roboto.className}>
        <ErrorBoundary>
          <Component {...props.pageProps} />
        </ErrorBoundary>
      </main>
    </Provider>
  );
}

export default App;
