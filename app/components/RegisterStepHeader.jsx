'use client'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { RequestSuccess, RequestError } from '@/app/components/ResponseMessage'
function RegisterStepHeader({ title, subtitle, hand }) {
  const { requestError } = useOnboardingContext()
  return (
    <div className="mb-12 w-full">
      {title && (
        <h1 className="flex justify-start items-center gap-4 mtn-h1 text-white text-[24px] md:text-[28px]  lg:text-[36px]">
          <span>{title}</span>
          {hand && <span className="animate-bounce">{hand}</span>}
        </h1>
      )}
      {subtitle && (
        <p className="font-hairline font-mtn-extralight flex-wrap text-[18px] text-white/70">
          {subtitle}
        </p>
      )}
      {requestError && <RequestError errors={requestError} />}
    </div>
  )
}

export default RegisterStepHeader
