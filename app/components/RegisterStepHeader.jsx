'use client'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
export default function RegisterStepHeader({ title, subtitle, hand, align }) {
  return (
    <div className="mb-12 w-full">
      {title && (
        <h1
          className={`flex justify-${
            align ?? 'start'
          } font-mtn-light items-center gap-4 mtn-h1 text-white text-[24px] md:text-[28px]  lg:text-[36px]`}
        >
          <span>{title}</span>
          {hand && <span className="animate-bounce">{hand}</span>}
        </h1>
      )}
      {subtitle && (
        <p className="font-hairline font-mtn-extralight flex-wrap text-[18px] text-white/70">
          {subtitle}
        </p>
      )}
    </div>
  )
}
