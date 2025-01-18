"use client"

import Image from "next/image"
import Link from "next/link"

// async function getStaticProps() {
//   const res : Response = await fetch("http://localhost:1337/api/factions");
//   const data : {data: Faction[]} = await res.json();
//   return {
//     props: {
//       factions: data.data,
//     },
//     revalidate: 60,
//   }
// }

export default function Navigation() {

  const routes = [
    { href: "/", label: "Home" },
    { href: "/heros", label: "Heros" },
    { href: "/troops", label: "Troops" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
            src="/logo/logo.png"
            width={50}
            height={50}
            alt="Logo de la faction Dark Angels"></Image>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {routes.slice(1).map((route) => (
              <Link
                key={route.href}
                href={route.href}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}