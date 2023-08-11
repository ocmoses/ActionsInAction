export default function CallToAction({
  bg,
  border,
  message,
  description,
  label,
  button,
  feedback,
  onclick,
  icon,
  color,
  desccolor,
}) {
  return (
    <div className={`flex justify-between gap-6 items-center px-[24px] py-[18px] ${bg ? bg : ''} border ${border ? border : 'border-[#621E1E]'} rounded-lg`}>
      <div className="flex justify-start items-center gap-6">
        <div
          className={`flex justify-center p-0 items-center ${
            color ?? "text-[#FF9897]"
          } text-black rounded-full`}
        >
          {icon}
        </div>
        <div className="flex flex-col justify-center md:justify-start gap-3 px-2 py-3">
          {message && (
            <p
              className={`my-0  text-[16px] ${
                color ?? "text-[#FF9897]"
              } leading-[18px]`}
            >
              {message}
            </p>
          )}
          {description && (
            <p
              className={`my-0 ${
                desccolor ?? "text-[#999999]"
              } text-[14px] leading-[16px]`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      {label && (
        <p
          onClick={onclick}
          className="text-[#999999] my-0 text-sm cursor-pointer whitespace-nowrap hover:text-white/70"
        >
          {label}
        </p>
      )}
      {button && (
        <button
          onClick={onclick}
          className="text-black font-bold rounded-full py-2 px-6 bg-yellow-600 text-sm cursor-pointer whitespace-nowrap hover:text-white"
        >
          {button}
        </button>
      )}
      {feedback && (
        feedback
      )}
    </div>
  );
}
