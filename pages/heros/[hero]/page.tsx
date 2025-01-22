import { Metadata } from "next";
import Navigation from "@/components/navigation";
import Image from "next/image";
import { Heroes } from "../herosInterface";
import fetchData from '@/pages/functions/fetchData'

export const metadata: Metadata = {
  title: "Héros - Dark Angels  - Warhammer 40k",
  description: "Commandant, le héros que vous cherchez est ici",
}

export default function Heros( { heros }: { heros: Heroes }) {
  return (
    <>
        <Navigation isHomePage={false}/>
        <section className="grid-cols-[repeat(2, minmax(350px, 1fr))]">
            <div className="bg-black/70">
                <Image
                    src={heros.imageUrl}
                    alt={heros.name}
                    width={300}
                    height={600} />
            </div>
            <div className="text-black bg-white">
                <h1> Here are the hero&apos;s characteristics: </h1>
                <div>
                    <p>Role : {heros.role}</p>
                    <p>Equipment : {heros.equipment}</p>
                    <p>Faction : {heros.faction}</p>
                    <p>Armies : {heros.armies}</p>
                </div>
            </div>
        </section>
    </>
  )
}

export async function getStaticProps({ params }: { params: { hero: string } }) {
    const data = await fetchData(`http://localhost:1337/api/heroes/${params.hero}`)
    return {
        props: {
            heros: data.data,
        },
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    const data = await fetchData('http://localhost:1337/api/heroes')
    const paths = data.data.map((hero: Heroes) => ({
        params: { hero: hero.id.toString() }
    }))
    return {
        paths,
        fallback: false
    }
}