export default function ButtonPrev(props) {
  const noicon = props.noicon && props.noicon === "yes" ? true : false;
  return (
    <button
      className={`rounded-full ${
        props.textsizecss ?? "text-sm"
      } pl-2 pr-3 py-2 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
      {...props}
      type={props.type ?? "submit"}
    >
      {!noicon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      )}
      <span>{props.label ?? "Next"}</span>
    </button>
  );
}
