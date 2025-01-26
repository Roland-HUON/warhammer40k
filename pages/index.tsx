import { Metadata } from "next"
import Navigation from "@/components/navigation";
import Image from "next/image";
import fetchData from "./functions/fetchData";

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

export default function Home({ faction }: { faction: Faction[] }) {
  return (
    <>
      <Navigation isHomePage={true} />
      <div>
        <Image
        src="/home/darkangels-bg2.jpg"
        alt="Dark Angels background"
        layout="fill"
        objectFit="cover"/>
        {faction.length > 0 ? (
          faction.map((faction) => (
        <div className="absolute bottom-0 bg-black opacity-75 text-white p-4" key={faction.id}>
          <h1 className="text-3xl">{ faction.name }</h1>
          <p className="pt-4 text-base">{faction.description}</p>
        </div>
        ))
        ) : (
          <div className="absolute bottom-0 bg-black opacity-75 text-white p-4">
            <h1 className="text-3xl">No factions available</h1>
          </div>
        )}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const data = await fetchData('http://localhost:1337/api/factions')
  return {
    props: {
      faction: data.data,
    },
    revalidate: 60,
  }
}