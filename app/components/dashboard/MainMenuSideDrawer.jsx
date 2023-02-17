export default function MainMenuSideDrawer({
  children,
  menuOpen,
  setMenuOpen,
}) {
  const closeDrawer = () => {
    setMenuOpen(false)
  }
  return (
    <main
      className={
        "fixed overflow-hidden z-10 bg-black bg-opacity-10 inset-0 transform ease-in-out " +
        (menuOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-50 opacity-0 translate-x-full ")
      }
    >
      <section
        className={
          "left-0 w-screen absolute border-r-2 border-r-white/20 bg-[#030303]/90 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (menuOpen ? " translate-x-0 " : " -translate-x-full ")
        }
      >
        <article className="relative pt-20 pb-10 pl-10 h-full">
          <div
            onClick={closeDrawer}
            className="absolute z-50 text-[#999999] cursor-pointer hover:text-white top-10 right-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {children}
        </article>
      </section>
      {/* <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setMenuOpen(false)
        }}
      ></section> */}
    </main>
  )
}
