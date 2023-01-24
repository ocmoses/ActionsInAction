import jumia from "/assets/brand/jumia.png"
// import alt from '/assets/brand/alt.png'
// import konga from '/assets/brand/konga.png'
// import seed from '/assets/brand/seed.png'
// import soft from '/assets/brand/soft.png'
// import bolt from '/assets/brand/bolt.png'
import Image from "next/image"

function TrustBrands() {
  const trustBrands = [jumia, alt, konga, seed, soft, bolt]

  return (
    <>
      <p> Those who trusted us:</p>
      <Image src={jumia} width={50} height="auto" />
      {/* <div className="grid">
        {trustBrands.map((brand) => (
          <div key={brand}>{brand}</div>
        ))}
      </div> */}
    </>
  )
}

export default TrustBrands
