import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 items-center mt-8">
      <div className="bg-blue-500 flex flex-col items-center">
        <p>Geteile Packlisten Anwendunge zum gemeinsamen planen von reisen.</p>
        <Link         
        className="m-3 p-2 w-fit rounded-full bg-green-500 transition hover:opacity-80 hover:scale-105"
        href="/join"
        >Jetzt loslegen</Link>
      </div>
    </div>
  );
}
