import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";


import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { ChakraProvider } from "@chakra-ui/react";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <main className={styles.main}>
              <ChakraProvider>{children}</ChakraProvider>
            </main>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
