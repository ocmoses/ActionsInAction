import Link from 'next/link'

function NavLinks() {
  const links = [
    { to: '/', text: 'Yello' },
    { to: '/discover', text: 'Discover' },
    { to: '/grow', text: 'Grow' },
    { to: '/dashboard', text: 'Dashboard' },
    { to: '/community', text: 'Community' }
  ]
  return (
    <nav className="hidden sm:flex">
      {links.map((link) => (
        <Link href={'#'} key={link.text}>
          <span className="font-mtn font font-bold mr-4 md:mr-6 lg:mr-8 text-md md:text-lg lg:text-xl text-white  hover:text-mtn-400 transition ease-out 500">
            {link.text}
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default NavLinks
