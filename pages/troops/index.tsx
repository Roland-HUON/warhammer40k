import Image from 'next/image'
import Navigation from '@/components/navigation'
import { Metadata } from 'next'
import fetchData from '@/pages/functions/fetchData'
import Link from 'next/link'
import { Troop } from './troopInterface'

export const metadata: Metadata = {
    title: "Troops - Dark Angels  - Warhammer 40k",
    description: "Welcome to the Darks Angels Commander ! Here you will find the entirety of our forces !",
}

export default async function Troops({ troops }: { troops: Troop[] }) {
    return (
        <>
            <Navigation isHomePage={false} />
            <main>
                <section>
                    <div>
                        <Image
                            src="/heros/hero-background.jpeg"
                            alt=''
                            layout="fill"
                            objectFit="cover"></Image>
                    </div>
                    <div className='bg-black/70 absolute z-10 text-white h-screen flex flex-col justify-center items-center uppercase font-black tracking-widest text-center gap-8'>
                        <div>
                            <h1 className='text-7xl'>Welcome to the Darks Angels Commander !</h1>
                            <h2 className='pt-4 text-3xl'>Here you will find the entirety of our forces !</h2>
                        </div>
                        <div className='flex justify-between w-full'>
                            {troops.map((troop) => (
                                <Link key={troop.id} href={`/troops/${troop.slug}`}>
                                    <div className='transition-transform hover:scale-110'>
                                        <Image
                                            src={troop.imageUrl}
                                            alt={troop.name}
                                            width={150}
                                            height={300} />
                                        <h3>{troop.name}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export async function getStaticProps(){
    const baseUrl = 'http://localhost:1337/api/troops';
    const troopsData = await fetchData(baseUrl);

    const troopsWithImages = await Promise.all(
        troopsData.data.map(async (troop: Troop) => {
            const imageData = await fetchData(`http://localhost:1337/api/troops/${troop.documentId}?populate=*`);
            const imageUrl = `http://localhost:1337${imageData.data.imageUrl.url}`
                ? `http://localhost:1337${imageData.data.imageUrl.url}` 
                : '/default-image.jpg';
            console.log(imageUrl);
            return {
                id: troop.id,
                documentId: troop.documentId,
                name: troop.name,
                faction: troop.faction,
                armies: troop.armies,
                imageUrl,
                slug: troop.slug,
            };
        })
    );

    return {
        props: {
            troops: troopsWithImages,
        },
        revalidate: 60,
    }
}