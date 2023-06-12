export default function DiscoverGridBox({ image, text }) {
  return (
    <>
      <div
        className="flex flex-col items-center justify-start gap-[24px] max-w-[250px] pt-[30px] pb-[24px] px-[26px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(57, 57, 57, 0.36) 0%, rgba(27, 27, 27, 0) 108.59%)",
          border: "0.940476px solid rgba(34, 34, 34, 0.34)",
          filter: "drop-shadow(0px 12.8387px 13.6946px rgba(0, 0, 0, 0.25))",
          borderRadius: "15.0476px",
        }}
      >
        {image}
        <p className="font-mtn-light text-[#C7C7C7] text-[17px] leading-[107.5%] tracking-[-0.03em] text-white text-center">
          {text}
        </p>
      </div>
    </>
  );
}
