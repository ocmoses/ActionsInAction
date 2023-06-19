import usePartners from "@/hooks/usePartners";
import Image from "next/image";
import { StepBadgeIcon } from "./Icons";
export default function ProfileTabBadge({ name }) {
  const { checkUpdateStatus } = usePartners();
  return (
    <>
      {checkUpdateStatus(name) && (
        <Image
          src="/assets/icons/check-solid.svg"
          width={16}
          height={16}
          alt=""
          className="absolute right-[-4px] bottom-[-4px]"
        />
      )}
    </>
  );
}
