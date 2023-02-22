function ResponsiveLabel() {
  return (
    <div className="bg-yellow-300 p-1 inline-flex fixed top-40 right-0 z-50">
      <span className="text-md font-bold inline-flex sm:hidden">XS</span>
      <span className="text-md font-bold hidden sm:inline-flex md:hidden">
        SM
      </span>
      <span className="text-md font-bold hidden md:inline-flex lg:hidden">
        MD
      </span>
      <span className="text-md font-bold hidden lg:inline-flex xl:hidden">
        LG
      </span>
      <span className="text-md font-bold hidden xl:inline-flex 2xl:hidden">
        XL
      </span>
      <span className="text-md font-bold hidden 2xl:inline-flex">2xl</span>
    </div>
  )
}

export default ResponsiveLabel
