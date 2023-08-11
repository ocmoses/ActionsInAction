import { ArrowRightCircle } from "@/app/components/Icons";
import Link from "next/link";
export default function Button(props) {
  const outline = props.outline ? true : false;
  const noicon = props.noicon && props.noicon === "yes" ? true : false;
  return (
    <>
      {!props.href ? (
        <button
          className={`rounded-full ${
            props.disabled ? "cursor-not-allowed" : ""
          } ${
            props.disabled ? "cursor-not-allowed" : ""
          } ${
            props.paddingclass ?? "pl-4 pr-3 py-2"
          } flex justify-between items-center  ${
          } flex justify-between items-center  ${
            !outline
              ? `text-black ${
                  props.disabled ? "bg-white/20" : "bg-mtn hover:bg-mtn-400"
                } `
              : ` ${
                  props.disabled ? "bg-white/20" : "bg-black/50"
                } text-white border ` +
                (props.outlinecolor ??
                  `${props.disabled ? "" : "border-mtn"}`) +
                `${props.disabled ? "" : " hover:border-mtn-300"}`
              ? `text-black ${
                  props.disabled ? "bg-white/20" : "bg-mtn hover:bg-mtn-400"
                } `
              : ` ${
                  props.disabled ? "bg-white/20" : "bg-black/50"
                } text-white border ` +
                (props.outlinecolor ??
                  `${props.disabled ? "" : "border-mtn"}`) +
                `${props.disabled ? "" : " hover:border-mtn-300"}`
          }  transition ease-in-out 5000`}
          {...props}
          type={props.type ?? "submit"}
        >
          <span
            className={`${
              props.textsizecss ??
              "inline-flex text-sm md:text-lg whitespace-nowrap"
            }`}
          >
            {props.label}
          </span>
          {!noicon && <ArrowRightCircle iconClass="w-6 h-6 ml-4" />}
        </button>
      ) : (
        <Link
          className={`rounded-full ${
            props.paddingclass ?? "pl-3 pr-2 py-2"
          } flex justify-between items-center ${
            !outline
              ? "text-black bg-mtn hover:bg-mtn-400"
              : "bg-black/50 text-white border " +
                (props.outlinecolor ?? "border-mtn") +
                " hover:border-mtn-300"
          }  transition ease-in-out 5000`}
          {...props}
        >
          <span
            className={`${
              props.textsizecss ?? "text-sm md:text-lg whitespace-nowrap "
            }`}
          >
            {props.label}
          </span>
          {!noicon && <ArrowRightCircle iconClass="w-6 h-6 ml-4" />}
        </Link>
      )}
    </>
  );
}
