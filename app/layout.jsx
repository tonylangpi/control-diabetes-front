import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './Providers'
const inter = Inter({ subsets: ["latin"] });
import Navbar from './components/Nav'

export const metadata = {
  title: "Gestion Pacientes App",
  description: "Aplicacion administrativa para la gestion de pacientes con diabetes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
            <Navbar/>
             {children}
          </div>
          </Providers>
      </body>
    </html>
  );
}
