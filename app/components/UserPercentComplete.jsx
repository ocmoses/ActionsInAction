import { useOnboardingContext } from '@/hooks/useOnboardingContext'

export default function UserPercent() {
  const { partnerInfo } = useOnboardingContext()
  return (
    <div className="text-white flex items-center gap-3 mr-0 md:mr-3">
      <div
        className="radial-progress text-2xl  text-mtn bg-[#333333] border-2 border-[#333]"
        style={{
          '--value': partnerInfo?.progress?.percent,
          '--size': '20px',
          '--thickness': '4px'
        }}
      ></div>{' '}
      <span>{partnerInfo?.progress?.percent}% completed</span>
    </div>
  )
}
