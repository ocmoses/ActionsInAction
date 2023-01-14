import Image from 'next/image'

function MainHeader() {
  return (
    <div className="absolute top-16 md:top-0 left-0 right-0 bottom-0">
      <Image
        className="object-cover"
        src="/assets/pic/hero.png"
        alt=""
        priority
        width={3538}
        height={2749}
      />
    </div>
  )
}

export default MainHeader
