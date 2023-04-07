import Link from "next/link"

function NavLinks() {
  const links = [
    { href: "/", text: "Y'ello" },
    { href: "/discover", text: "Discover" },
    // { href: '/grow', text: 'Grow' },
    // { href: '/dashboard', text: 'Dashboard' },
    // { href: "/community", text: "Community" },
  ]
  return (
    <nav className="hidden sm:flex space-x-20">
      {links.map((link) => (
        <Link href={link.href} key={link.text}>
          <span className="font-mtn-semibold text-[14px] text-md md:text-lg lg:text-xl text-white  hover:text-mtn-400 transition ease-out 500">
            {link.text}
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default NavLinks
