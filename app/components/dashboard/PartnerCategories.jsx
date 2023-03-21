import UserPercentage from "@/app/components/UserPercentage"
import Button from "@/app/components/form/Button"
import Image from "next/image"

export default function PartnerCategories({
  partner,
  type,
  partnerCategories,
  onClick,
}) {
  return (
    <>
      <div
        className={`flex ${
          type === "getstarted" || partnerCategories?.length < 2
            ? "flex-col"
            : "grid grid-cols-1 lg:grid-cols-2"
        } gap-4 max-w-[837px] mt-16 w3-animate-opacity`}
      >
        {partnerCategories?.map(
          (category) =>
            category.category_name && (
              <div
                onClick={() =>
                  category.status === "open" ? onClick(category.uuid) : {}
                }
                key={category.uuid}
                className={`flex flex-col ${
                  category.status === "open" ?? "cursor - pointer"
                } items-center md:flex-row justify-between gap-6 cursor bg-[#111111] p-[24px] border border-white/10 rounded-xl`}
              >
                {/* {console.log({ category })} */}
                <div className="flex flex-col justify-start sm:flex-row sm:justify-center gap-6 items-center">
                  <div className="flex justify-center items-center">
                    <UserPercentage
                      size={
                        type === "getstarted" || partnerCategories.length < 2
                          ? 86
                          : 54
                      }
                      thickness={2}
                      textsize={
                        type === "getstarted" || partnerCategories.length < 2
                          ? 20
                          : 15
                      }
                      percent={category.percentage}
                    />
                  </div>
                  <div className="flex flex-col gap-0 justify-center items-center sm:items-start h-full">
                    <span className="text-sm text-[#999999]">
                      {category.status === "open"
                        ? "In progress"
                        : category.status === "pending"
                        ? "In review"
                        : ""}
                    </span>

                    <span className="text-white text-center md:text-left font-bold">
                      {category.category_name} {category.status}
                    </span>
                  </div>
                </div>
                <div className="sm:hidden md:flex gap-6 justify-center md:justify-end items-center">
                  {category.status === "open" ? (
                    <Button
                      label={
                        partner.onboarding_type == "new"
                          ? "Finish up"
                          : "Review application"
                      }
                      noicon="yes"
                      textsizecss="!text-[11px] md:text-sm whitespace-nowrap text-ellipsis overflow-hidden"
                      paddingclass="px-3 py-1"
                    />
                  ) : (
                    <div className="flex justify-center">
                      <div className="flex gap-2 bg-[#2D200A] text-[#F9D89A] rounded-full px-3 py-1 text-[11px] md:text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                        <Image
                          alt=""
                          src="/assets/icons/review.svg"
                          width={16}
                          height={16}
                        />
                        <span>In review</span>
                      </div>
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
