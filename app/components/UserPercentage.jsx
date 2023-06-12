import { useEffect, useState } from "react";

export default function UserPercentage({
  percent,
  hidelabel,
  size,
  thickness,
  textsize,
  borderWidthCss,
  borderColorCss,
}) {
  const [config, setInnerCircle] = useState({
    size: 20,
    thickness: 4,
    inner: 16,
    textsize,
  });
  useEffect(() => {
    const Hidelabel = hidelabel ?? false;
    const Size = size ? parseInt(size) : 20;
    const Textsize = textsize ? parseInt(textsize) : 14;
    const Thickness = thickness ? parseInt(thickness) : 4;
    const iSize = Size - Thickness;
    setInnerCircle({
      size: Size,
      thickness: Thickness,
      inner: iSize,
      textsize: Textsize,
      hidelabel: Hidelabel,
    });
  }, [size, thickness, textsize, hidelabel]);
  return (
    <>
      {/* {percent && ( */}
      <div className="text-white flex items-center gap-3 m-0">
        <div
          className={`radial-progress text-2xl  text-mtn bg-[#333333] ${
            borderWidthCss ?? "border-2"
          } ${borderColorCss ?? "border-[#333]"}`}
          style={{
            "--value": percent ?? 0,
            "--size": `${config.size}px`,
            "--thickness": `${config.thickness}px`,
          }}
        >
          {!config.hidelabel && (
            <span
              className={`rounded-full flex justify-center items-center bg-black`}
              style={{
                minHeight: `${config.inner}px`,
                minWidth: `${config.inner}px`,
                fontSize: `${config.textsize}px`,
              }}
            >
              {percent ?? 0} %
            </span>
          )}
        </div>
        {/* <span>{percent}% completed</span> */}
      </div>
      {/* )} */}
    </>
  );
}
