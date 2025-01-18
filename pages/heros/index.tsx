import Image from 'next/image'

export default function Heros() {
    return (
        <>
            <section>
                <div>
                    <Image
                        src="/images/heros/dark-angel-1.jpg"
                        alt=''
                        layout="fill"
                        objectFit="cover"></Image>
                </div>
                <div>
                    <h1>Bienvenue chez les Darks Angels Commandant !</h1>
                    <h2>Ici vous retrouverez les grands héros de notre faction !</h2>
                </div>
            </section>
        </>
    )
}