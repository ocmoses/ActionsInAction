export default function ButtonNext(props) {
  const noicon = props.noicon ? true : false
  return (
    <button
      className={`rounded-full pl-3 pr-2 py-2 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000`}
      {...props}
      type={props.type ?? "submit"}
    >
      <span className={`${props.textsizecss ?? "text-sm"}`}>
        {props.label ?? "Next"}
      </span>
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  )
}
