import {
  AccountinfoIcon,
  CompanyDetailIcon,
  ComplianceIcon,
  IndemnityIcon,
  NccLicenseIcon,
  ShortcodeIcon,
  ContactPersonIcon,
  ReviewIcon,
} from "./Icons"
import { profileMenuIcons } from "@/app/modules/constants"
import Badge from "@/app/components/ProfileTabBadge"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"

function ProfileTabItem({ menu, form }) {
  const { moveToNextForm } = useProcessing()
  const { checkUpdateStatus } = usePartners()
  return (
    <div
      // onClick={() =>
      //   checkUpdateStatus(menu) ? moveToNextForm([menu, true]) : {}
      // }
      onClick={() =>
        process.env.NODE_ENV === "production"
          ? checkUpdateStatus(menu)
            ? moveToNextForm([menu, true])
            : {}
          : moveToNextForm([menu, true])
      }
      className={`flex justify-start items-center gap-3 h-[44px] md:min-w-[175px] mb-4 ${
        checkUpdateStatus(menu) && "cursor-pointer"
      }`}
    >
      <div
        className={`${
          menu === form && "border-[#FFCB03] border-1"
        } flex items-center justify-center  rounded-full min-w-[40px] h-[40px]`}
      >
        {menu === "companydetail" && (
          <div className="text-white relative">
            <CompanyDetailIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />
            <Badge name={"companydetail"} />
          </div>
        )}
        {menu === "confirmcompanyinfo" && (
          <div className="text-white relative">
            <CompanyDetailIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />
            <Badge name={"confirmcompanyinfo"} />
          </div>
        )}
        {menu === "contactperson" && (
          <div className="text-white relative">
            <ContactPersonIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"contactperson"} />
          </div>
        )}
        {menu === "compliance" && (
          <div className="text-white relative">
            <ComplianceIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"compliance"} />
          </div>
        )}
        {menu === "ncclicense" && (
          <div className="text-white relative">
            <NccLicenseIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"ncclicense"} />
          </div>
        )}
        {menu === "nlrclicense" && (
          <div className="text-white relative">
            <NccLicenseIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"nlrclicense"} />
          </div>
        )}
        {menu === "shortcode" && (
          <div className="text-white relative">
            <ShortcodeIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"shortcode"} />
          </div>
        )}
        {menu === "indemnity" && (
          <div className="text-white relative">
            <IndemnityIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"indemnity"} />
          </div>
        )}
        {menu === "accountinfo" && (
          <div className="text-white relative">
            <AccountinfoIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"accountinfo"} />
          </div>
        )}
        {menu === "review" && (
          <div className="text-white relative">
            <ReviewIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"review"} />
          </div>
        )}
        {menu === "updatereview" && (
          <div className="text-white relative">
            <ReviewIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge name={"updatereview"} />
          </div>
        )}
      </div>
      <span
        className={`block text-start whitespace-nowrap ${
          menu === form ? "text-[#FFCB03]" : "text-[#999999]"
        } hidden  md:flex`}
      >
        {profileMenuIcons[menu]?.title}
      </span>
    </div>
  )
}

export default ProfileTabItem
