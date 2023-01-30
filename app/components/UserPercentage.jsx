import { useEffect, useState } from "react"

export default function UserPercentage({
  percent,
  size,
  thickness,
  textsize,
  borderWidthCss,
  borderColorCss,
}) {
  const [dim, setInnerCircle] = useState({
    size: 20,
    thickness: 4,
    inner: 16,
    textsize,
  })
  useEffect(() => {
    const Size = size ? parseInt(size) : 20
    const Textsize = textsize ? parseInt(textsize) : 14
    const Thickness = thickness ? parseInt(thickness) : 4
    const iSize = Size - Thickness
    setInnerCircle({
      size: Size,
      thickness: Thickness,
      inner: iSize,
      textsize: Textsize,
    })
  }, [size, thickness, textsize])
  return (
    <>
      {percent && (
        <div className="text-white flex items-center gap-3 mr-0 md:mr-3">
          <div
            className={`radial-progress text-2xl  text-mtn bg-[#333333] ${
              borderWidthCss ?? "border-2"
            } ${borderColorCss ?? "border-[#333]"}`}
            style={{
              "--value": percent,
              "--size": `${dim.size}px`,
              "--thickness": `${dim.thickness}px`,
            }}
          >
            <span
              className={`rounded-full flex justify-center items-center bg-black`}
              style={{
                minHeight: `${dim.inner}px`,
                minWidth: `${dim.inner}px`,
                fontSize: `${dim.textsize}px`,
              }}
            >
              {percent}%
            </span>
          </div>
          {/* <span>{percent}% completed</span> */}
        </div>
      )}
    </>
  )
}
