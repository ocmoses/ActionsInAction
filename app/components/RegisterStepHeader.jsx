"use client";
// import { useOnboardingContext } from "@/hooks/useOnboardingContext"
export default function RegisterStepHeader({
  title,
  subtitle,
  hand,
  align,
  className,
  titleClassName,
  subtitleClassName,
}) {
  return (
    <div className={`mb-12 w-full ${className}`}>
      {title && (
        <h1
          className={`flex ${
            align ?? "justify-center text-center md:text-start md:justify-start"
          } font-mtn-light items-center gap-4 mtn-h1 text-white text-[24px] md:text-[28px]  lg:text-[36px]`}
        >
          <span className={titleClassName}>{title}</span>
          {hand && <span className="animate-bounce">{hand}</span>}
        </h1>
      )}
      {subtitle && (
        <div className="font-hairline font-mtn-extralight flex-wrap text-[18px] text-white/70 text-center justify-start md:text-start md:justify-start">
          <p className={`${subtitleClassName}`}>{subtitle}</p>
        </div>
      )}
    </div>
  );
}
