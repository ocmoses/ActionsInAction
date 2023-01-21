import usePartners from "@/hooks/usePartners"

export default function UserPercent() {
  const { partner } = usePartners()
  return (
    <div className="text-white flex items-center gap-3 mr-0 md:mr-3">
      {partner?.progress && (
        <>
          <div
            className="radial-progress text-2xl  text-mtn bg-[#333333] border-2 border-[#333]"
            style={{
              "--value": partner?.progress.percent,
              "--size": "20px",
              "--thickness": "4px",
            }}
          ></div>{" "}
          <span>{partner?.progress.percent}% completed</span>
        </>
      )}
    </div>
  )
}
