export default function CategorySideDrawer({
  children,
  isOpen,
  setIsOpen,
  setTmpCat,
}) {
  const closeDrawer = () => {
    setTmpCat(null)
    setIsOpen(false)
  }
  return (
    <main
      className={
        "fixed overflow-hidden z-10 bg-black bg-opacity-75 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full ")
      }
    >
      <section
        className={
          " w-screen max-w-[380px] right-0 pr-[60px] absolute border-l-2 border-l-white/20 bg-[#030303]/90 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-md pb-10 h-full">
          <div
            onClick={closeDrawer}
            className="absolute z-50 text-[#999999] cursor-pointer hover:text-white top-[30px] right-[40px]"
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
          setIsOpen(false)
        }}
      ></section> */}
    </main>
  )
}
