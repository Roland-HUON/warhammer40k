import Image from "next/image"
import Link from "next/link"

interface NavigationProps {
  isHomePage: boolean;
}

export default function Navigation({ isHomePage }: NavigationProps) {

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
            src={isHomePage ? "/logo/logo-black.png" : "/logo/logo.png"}
            width={50}
            height={50}
            alt="Logo de la faction Dark Angels"></Image>
          </Link>
          <nav className={`hidden md:flex items-center space-x-6 text-sm uppercase font-black ${isHomePage ? '' : 'text-[#898989]'}`}>
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