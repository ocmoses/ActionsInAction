import { ArrowRightCircle } from "@/app/components/Icons"
import Link from "next/link"
export default function Button(props) {
  return (
    <>
      {!props.type ? (
        <button
          className="rounded-full pl-6 pr-3 py-2 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000"
          {...props}
          type={props.type ?? "submit"}
        >
          <span className="text-sm md:text-xl">{props.label}</span>
          <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
        </button>
      ) : (
        <Link
          className="rounded-full pl-6 pr-3 py-2 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000"
          {...props}
        >
          <span className="text-sm md:text-xl">{props.label}</span>
          <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
        </Link>
      )}
    </>
  )
}
