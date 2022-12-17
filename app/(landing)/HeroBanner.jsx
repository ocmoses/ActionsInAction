import Image from 'next/image'

function MainHeader() {
  return (
    <div className="absolute -z-10 top-16 md:top-0 left-0 right-0 bottom-0">
      <div className="relative ">
        <Image
          className="object-cover"
          src="/assets/pic/hero.png"
          alt=""
          priority
          width={3538}
          height={2749}
        />
      </div>
    </div>
  )
}

export default MainHeader
