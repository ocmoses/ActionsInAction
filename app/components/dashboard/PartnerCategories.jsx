import UserPercentage from "@/app/components/UserPercentage"
import Button from "@/app/components/form/Button"

export default function PartnerCategories({
  type,
  partnerCategories,
  onClick,
}) {
  return (
    <>
      <div
        className={`flex ${
          type === "getstarted" ? "flex-col" : "grid grid-cols-2"
        } gap-4 max-w-[837px] mt-16 w3-animate-opacity`}
      >
        {partnerCategories.map(
          (progress) =>
            progress.category_name && (
              <div
                onClick={() => onClick(progress.uuid)}
                key={progress.uuid}
                className="flex flex-col cursor-pointer items-center md:flex-row justify-between gap-6 cursor bg-[#111111] p-[24px] border border-white/10 rounded-xl"
              >
                <div className="flex flex-col justify-start sm:flex-row sm:justify-center gap-6 items-center">
                  <div className="flex justify-center items-center">
                    <UserPercentage
                      size={type === "getstarted" ? 86 : 54}
                      thickness={2}
                      textsize={type === "getstarted" ? 20 : 15}
                      percent={progress.percentage}
                    />
                  </div>
                  <div className="flex flex-col gap-0 justify-center items-center sm:items-start h-full">
                    <span className="text-sm text-[#999999]">In progress</span>
                    <span className="text-white text-center md:text-left font-bold">
                      {progress.category_name}
                    </span>
                  </div>
                </div>
                <div className="sm:hidden md:flex gap-6 justify-center md:justify-end items-center">
                  {progress.percentage < 100 ? (
                    <Button
                      label="Finish up"
                      noicon="yes"
                      textsizecss="text-[12px] md:text-sm whitespace-nowrap text-ellipsis overflow-hidden"
                    />
                  ) : (
                    <div className="flex justify-center">
                      <Button
                        onClick={() => onClick(progress.uuid)}
                        label="Detail"
                        outline="yes"
                        noicon="yes"
                        textsizecss="text-[12px] md:text-sm whitespace-nowrap text-ellipsis overflow-hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </>
  )
}
