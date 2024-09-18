import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Link href={"/translate"}>translate</Link>
    </main>
  );
}
