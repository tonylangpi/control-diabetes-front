import Image from "next/image";
import {anaheim} from "./fonts"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className={anaheim.className}>Hola maje</h2>
    </main>
  );
}
