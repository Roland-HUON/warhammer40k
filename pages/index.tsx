import { Metadata } from "next"
import Navigation from "@/components/navigation";
import Image from "next/image";

interface Faction {
  id: number,
  name: string,
  description: string,
  imageUrl: string,
  factionUrl: string,
}

export const metadata: Metadata = {
  title: "Dark Angels - Warhammer 40k",
  description: "Les Dark Angels sont une des Légions Space Marines d'origine, fondée par Lion El'Jonson. Ils sont connus pour leur secret et leur obsession à...",
}

export default function Home() {
  return (
    <>
      <Navigation />
      <div>
        <Image
        src="/home/darkangels-bg2.jpg"
        alt="Dark Angels background"
        layout="fill"
        objectFit="cover"/>
        <div className="absolute bottom-0 bg-black opacity-75 text-white p-4">
          <h1 className="text-3xl">Dark Angels</h1>
          <p className="pt-4 text-base">The Dark Angels are considered amongst the most powerful and secretive of the Loyalist Space Marine Chapters. They were the Ist Legion of the original 20 Space Marine Legions to be created during the First Founding of the 30th Millennium.</p>
        </div>
      </div>
    </>
  )
}

export async function generateStaticProps() {
  const res : Response = await fetch("http://localhost:1337/api/factions");
  const data : {data: Faction[]} = await res.json();
  return {
    props: {
      factions: data.data,
    },
    revalidate: 60,
  }
}