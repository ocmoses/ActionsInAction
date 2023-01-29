import {
  AccountInfoIcon,
  CompanyDetailIcon,
  ComplianceIcon,
  IndemnityIcon,
  NccLicenseIcon,
  ShortcodeIcon,
  ContactPersonIcon,
  ReviewIcon,
} from "./Icons"
import { profileMenuIcons } from "@/app/modules/constants"
import Badge from "./ProfileTabBadge"
function ProfileTabItem({ menu, form }) {
  return (
    <div className="flex justify-start items-center gap-3 h-[44px] lg:min-w-[175px] mb-4">
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
            <Badge type="review" name={"companydetail"} />
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
            <Badge type="updatereview" name={"confirmcompanyinfo"} />
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

            <Badge type="updatereview" name={"contactperson"} />
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

            <Badge type="review" name={"compliance"} />
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

            <Badge type="review" name={"ncclicense"} />
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

            <Badge type="review" name={"nlrclicense"} />
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

            <Badge type="review" name={"shortcode"} />
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

            <Badge type="review" name={"indemnity"} />
          </div>
        )}
        {menu === "accountinfo" && (
          <div className="text-white relative">
            <AccountInfoIcon
              fill={menu === form ? "#ffffff" : "#999999"}
              iconClass={
                menu === form
                  ? " w3-animate-opacity text-white w-[20px] h-[20px]"
                  : "w-[20px] h-[20px]"
              }
            />

            <Badge type="review" name={"accountinfo"} />
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

            <Badge type="review" name={"review"} />
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

            <Badge type="updatereview" name={"updatereview"} />
          </div>
        )}
      </div>
      <span
        className={`block text-start whitespace-nowrap ${
          menu === form ? "text-[#FFCB03]" : "text-[#999999]"
        } hidden  lg:flex`}
      >
        {profileMenuIcons[menu]?.title}
      </span>
    </div>
  )
}

export default ProfileTabItem
