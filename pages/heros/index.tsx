import Image from 'next/image'
import Navigation from '@/components/navigation'
import { Metadata } from 'next'
import fetchData from '@/pages/functions/fetchData'
import Link from 'next/link'
import { Heroes } from './herosInterface'

export const metadata: Metadata = {
    title: "Heros - Dark Angels  - Warhammer 40k",
    description: "Welcome to the Darks Angels Commander ! Here you will find the great heroes of our faction !",
}

export default async function Heros({ heros }: { heros: Heroes[] }) {
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
                            <h2 className='pt-4 text-3xl'>Here you will find the great heroes of our faction !</h2>
                        </div>
                        <div className='flex justify-between w-full'>
                            {heros.map((hero) => (
                                <Link key={hero.id} href={`/heros/${hero.slug}`}>
                                    <div className='transition-transform hover:scale-110'>
                                        <Image
                                            src={hero.imageUrl}
                                            alt={hero.name}
                                            width={300}
                                            height={600} />
                                        <h3>{hero.name}</h3>
                                    </div>
                                </Link>
                            ))}
                            <div className='transition-transform hover:scale-110'>
                                <Image
                                    src="/heros/lion_eljonson.png"
                                    alt=""
                                    width={300}
                                    height={600} />
                                <h3>Lion El&apos;Jonson</h3>
                            </div>
                            <div>
                                <Image
                                    src="/heros/azrael.png"
                                    alt=""
                                    width={300}
                                    height={600} />
                                <h3>Azrael</h3>
                            </div>
                            <div>
                                <Image
                                    src="/heros/ezekiel.png"
                                    alt=""
                                    width={300}
                                    height={600} />
                                <h3>Ezekiel</h3>
                            </div>
                            <div>
                                <Image
                                    src="/heros/asmodai.png"
                                    alt=""
                                    width={300}
                                    height={600} />
                                <h3>Asmodai</h3>
                            </div>
                            <div>
                                <Image
                                    src="/heros/sammael.png"
                                    alt=""
                                    width={300}
                                    height={600} />
                                <h3>Sammael</h3>
                            </div>
                            <div>
                                <Image
                                    src="/heros/belial.png"
                                    alt=""
                                    width={300}
                                    height={600} />
                                <h3>Belial</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const data = await fetchData('http://localhost:1337/api/heroes')
    return {
      props: {
        heros: data.data,
      },
      revalidate: 60,
    }
}