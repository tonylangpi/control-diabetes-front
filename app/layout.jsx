import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './Providers'
const inter = Inter({ subsets: ["latin"] });
import Navbar from './components/Nav'
import {SWRProvider} from './swr-provider'
import { Toaster } from "sonner";

export const metadata = {
  title: "Gestion Pacientes App",
  description: "Aplicacion administrativa para la gestion de pacientes con diabetes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <SWRProvider>
            <div className="h-screen">
              <Navbar />
              {children}
              <Toaster position="top-center" richColors  visibleToasts={1} duration={4000} />
            </div>
          </SWRProvider>
        </Providers>
      </body>
    </html>
  );
}
