import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLinks() {
  const pathname = usePathname()
  const links = [
    { href: "/", text: "Y'ello", active: pathname === "/" },
    { href: "/discover", text: "Discover", active: pathname === "/discover" },
    { href: "/faq", text: "FAQs", active: pathname === "/faq" },
  ]
  return (
    <nav className="space-x-10 max-[700px]:hidden">
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
};



export const NavLinksMobile = () => {
  const pathname = usePathname()
  const links = [
    { href: "/", text: "Y'ello", active: pathname === "/" },
    { href: "/discover", text: "Discover", active: pathname === "/discover" },
    { href: "/faq", text: "FAQ", active: pathname === "/faq" },
  ]
  return (
    <nav className="flex flex-col gap-8 py-[30px] z-50">
      {links.map((link) => (
        <Link href={link.href} key={link.text}>
          <span
            className={`font-mtn-semibold text-white text-[14px] text-md md:text-lg lg:text-xl py-2  border-mtn border-solid ${
              link.active ? "border-b-2" : ""
            }  hover:border-b-2 transition ease-out 500`}
          >
            {link.text}
          </span>
        </Link>
      ))}
    </nav>
  )
};

