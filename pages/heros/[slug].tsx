import { Metadata } from "next";
import Navigation from "@/components/navigation";
import Image from "next/image";
import { Heroes } from "./herosInterface";
import fetchData from '@/pages/functions/fetchData'

export const metadata: Metadata = {
  title: "Heroes - Dark Angels  - Warhammer 40k",
  description: "Commander, the hero you're looking for is here",
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

export async function getStaticProps( { params }: { params: { slug: string } }) {
    const baseUrl = 'http://localhost:1337/api/heroes';
    const imageData = await fetchData(baseUrl);

    const hero = imageData.data.find((hero: Heroes) => hero.slug === params.slug);

    const heroDocumentId = hero.documentId;

    const newUrl = await fetchData(`http://localhost:1337/api/heroes/${heroDocumentId}?populate=*`);
    const imageUrl = `http://localhost:1337${newUrl.data.imageUrl.url}`
        ? `http://localhost:1337${newUrl.data.imageUrl.url}` 
        : '/default-image.jpg';
    return {
        props: {
            heros: {
                id: hero.id,
                documentId: hero.documentId,
                name: hero.name,
                role: hero.role,
                equipment: hero.equipment,
                faction: hero.faction,
                armies: hero.armies,
                imageUrl: imageUrl,
                slug: hero.slug,
            },
        },
        revalidate: 60,
    };
}

export async function getStaticPaths (){
    const baseUrl = 'http://localhost:1337/api/heroes';
    const data = await fetchData(baseUrl);
    const paths = data.data.map((hero: Heroes) => ({
        params: { slug: hero.slug },
    }))
    console.log(paths)

    return {
        paths,
        fallback: "blocking",
    };
};