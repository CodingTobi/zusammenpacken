import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-between text-white items-center mt-8 mx-4">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-center text-2xl text-white">Geteile Packlisten Anwendunge zum gemeinsamen planen von reisen.</h1>
        <h2 className="text-center text-lg text-slate-200">Portfolio Projekt II an der HSRM</h2>
        <Link
          className="m-3 p-2 w-fit rounded-full bg-green-500 text-black transition hover:opacity-80 hover:scale-105"
          href="/join"
        >Jetzt loslegen</Link>
        <div className="flex flex-wrap h-full m-8 gap-6 justify-evenly">
          <Image src="/hompage_logos/logo_next.png" alt="Logo" width={64} height={64} />
          <Image src="/hompage_logos/logo_react.png" alt="Logo" width={64} height={64} />
          <Image src="/hompage_logos/logo_socket.png" alt="Logo" width={64} height={64} />
          <Image src="/hompage_logos/logo_tailwind.png" alt="Logo" width={64} height={64} />
          <Image src="/hompage_logos/logo_typescript.png" alt="Logo" width={64} height={64} />
        </div>
      </div>
      <div>
        <p className="text-center text-slate-300 font-semibold text-lg py-4">
          Zusammenpacken ermöglicht es dir, deine Reise mit anderen zu planen und sicherzustellen, dass du nichts vergisst. Egal ob du alleine reist oder mit Freunden, unsere App hilft dir, organisiert zu bleiben. Jetzt loslegen und deine nächste Reise stressfrei genießen!
        </p>
        <Image className="hidden md:block" src={"/img/zusammenpacken_example.png"} alt="Zusammenpacken Beispiel" width={2705} height={646} />
        <Image className="block md:hidden" src={"/img/zusammenpacken_example_mobile.png"} alt="Zusammenpacken Beispiel" width={931} height={646} />
        
      </div>
      <p className="m-4">Betreut durch <a className="transition hover:text-green-500" href="https://www.cs.hs-rm.de/~iwer/">Prof. Dr. Eva-Maria Iwer</a></p>
    </div>
  );
}
