function RegisterStepHeader({ title, subtitle, hand }) {
  return (
    <div className="mb-12">
      {title && (
        <h1 className="flex items-center gap-4 mtn-h1  text-white text-3xl md:text-4xl  lg:text-5xl">
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

export default RegisterStepHeader
