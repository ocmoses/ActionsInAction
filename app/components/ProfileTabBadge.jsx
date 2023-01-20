import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { StepBadge } from './Icons'
export default function ProfileTabBadge({ type, name }) {
  const { checkUpdateStatus } = useOnboardingContext()
  return (
    <StepBadge
      iconClass="absolute right-[-4px] bottom-[-4px]"
      fill={checkUpdateStatus(type, name) ? '#FFCB03' : '#666666'}
    />
  )
}
