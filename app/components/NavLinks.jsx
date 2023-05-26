import Link from "next/link"
import { usePathname } from "next/navigation"

function NavLinks() {
  const pathname = usePathname()
  const links = [
    { href: "/", text: "Y'ello", active: pathname === "/" },
    { href: "/discover", text: "Discover", active: pathname === "/discover" },
  ]
  return (
    <nav className="hidden sm:flex space-x-20">
      {links.map((link) => (
        <Link href={link.href} key={link.text}>
          <span
            className={`font-mtn-semibold text-[14px] text-md md:text-lg lg:text-xl ${
              link.active ? "text-mtn-400" : "text-white"
            }  hover:text-mtn-400 transition ease-out 500`}
          >
            {link.text}
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default NavLinks
