import Image from 'next/image'
import Navigation from '@/components/navigation'

export default function Heros() {
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
                    <div>
                        <h1>Bienvenue chez les Darks Angels Commandant !</h1>
                        <h2>Ici vous retrouverez les grands héros de notre faction !</h2>
                    </div>
                </section>
            </main>
        </>
    )
}