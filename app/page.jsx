import Image from "next/image";
import {anaheim} from "./fonts"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className={anaheim.className}>
        <img src="https://i1.sndcdn.com/artworks-F11dor2dKfIo0DA6-zRbrxg-t500x500.jpg" alt="Messi" />
      </h2>
    </main>
  );
}
