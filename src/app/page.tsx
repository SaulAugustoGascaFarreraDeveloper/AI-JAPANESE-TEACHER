import Experience from "@/components/Experience";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full flex-col h-screen">
      <Navbar />
     <Experience />
    </main>
  );
}
