import usePartners from "@/hooks/usePartners"
import { StepBadgeIcon } from "./Icons"
export default function ProfileTabBadge({ type, name }) {
  const { checkUpdateStatus } = usePartners()
  return (
    <StepBadgeIcon
      iconClass="absolute right-[-4px] bottom-[-4px]"
      fill={checkUpdateStatus(type, name) ? "#FFCB03" : "#999999"}
    />
  )
}
