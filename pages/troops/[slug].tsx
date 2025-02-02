import { Metadata } from "next";
import Navigation from "@/components/navigation";
import Image from "next/image";
import { Troop } from './troopInterface'
import fetchData from '@/pages/functions/fetchData'

export const metadata: Metadata = {
  title: "Troops - Dark Angels - Warhammer 40k",
  description: "Commander, your troops are ready to fight!",
}

export default function Troops( { troops }: { troops: Troop }) {
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
                <h1> Here are the troop&apos;s characteristics: </h1>
                <div>
                    <p>Faction : {troops.faction}</p>
                    <p>Armies : {troops.armies}</p>
                </div>
            </div>
        </section>
    </>
  )
}

export async function getStaticProps( { params }: { params: { slug: string } }) {
    const baseUrl = 'http://localhost:1337/api/troops';
    const imageData = await fetchData(baseUrl);

    const troop = imageData.data.find((troop: Troop) => troop.slug === params.slug);

    const troopDocumentId = troop.documentId;

    const newUrl = await fetchData(`http://localhost:1337/api/troops/${troopDocumentId}?populate=*`);
    const imageUrl = `http://localhost:1337${newUrl.data.imageUrl.url}`
        ? `http://localhost:1337${newUrl.data.imageUrl.url}` 
        : '/default-image.jpg';
    return {
        props: {
            troops: {
                id: troop.id,
                documentId: troop.documentId,
                name: troop.name,
                faction: troop.faction,
                armies: troop.armies,
                imageUrl: imageUrl,
                slug: troop.slug,
            },
        },
        revalidate: 60,
    };
}

export async function getStaticPaths (){
    const baseUrl = 'http://localhost:1337/api/troops';
    const data = await fetchData(baseUrl);
    const paths = data.data.map((troop: Troop) => ({
        params: { slug: troop.slug },
    }))
    console.log(paths)

    return {
        paths,
        fallback: "blocking",
    };
};