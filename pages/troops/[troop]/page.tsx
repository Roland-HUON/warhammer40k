import { Metadata } from "next";
import Navigation from "@/components/navigation";
import Image from "next/image";
import { Troop } from '../troopInterface'
import fetchData from '@/pages/functions/fetchData'

export const metadata: Metadata = {
  title: "Troops - Dark Angels - Warhammer 40k",
  description: "Commander, your troops are ready to fight!",
}

export default function Heros( { troops }: { troops: Troop }) {
  return (
    <>
        <Navigation isHomePage={false}/>
        <section className="grid-cols-[repeat(2, minmax(350px, 1fr))]">
            <div className="bg-black/70">
                <Image
                    src={troops.imageUrl}
                    alt={troops.name}
                    width={300}
                    height={600} />
            </div>
            <div className="text-black bg-white">
                <h1> Here are the hero&apos;s characteristics: </h1>
                <div>
                    <p>Faction : {troops.faction}</p>
                    <p>Armies : {troops.armies}</p>
                </div>
            </div>
        </section>
    </>
  )
}

export async function getStaticProps({ params }: { params: { troop: string } }) {
    const data = await fetchData(`http://localhost:1337/api/troops/${params.troop}`)
    return {
        props: {
            troops: data.data,
        },
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    const data = await fetchData('http://localhost:1337/api/troops')
    const paths = data.data.map((troop: Troop) => ({
        params: { hero: troop.id.toString() }
    }))
    return {
        paths,
        fallback: false
    }
}