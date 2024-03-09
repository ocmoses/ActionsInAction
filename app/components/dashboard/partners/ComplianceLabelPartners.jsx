import {
  complianceRequirements,
  company_type,
  license_type,
} from "@/app/modules/constants";
import FieldStatus from "@/app/components/dashboard/compliance/FieldStatus";
import moment from "moment";
import useApp from "@/hooks/useApp";
import usePartners from "@/hooks/usePartners";
import Image from "next/image";
import RejectionReasons from "@/app/components/dashboard/compliance/RejectionReason";
import ComplianceFieldEditModal from "@/app/components/dashboard/partners/ComplianceFieldEditModal";

import { partnerApprovals, Util } from "@/app/modules/utilities";
import { COUNTRIES } from "@/app/modules/countries";
import { STATES } from "@/app/modules/states";
import Portal from "@/app/components/Portal";
import { useState } from "react";
import { useEffect, useContext } from "react";
import {FileViewContext} from "@/app/providers/FileViewProvider";


export default function ComplianceLabelPartners({
  field,
  stage,
  category,
  category_shortcode,
  type,
}) {

  console.log("CATEGORY FIELD", category[field]);

  const [provided, setProvided] = useState(true);

  const { previewFiles } = useApp();
  const { partner, activeApproval } = usePartners();

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const [ApprovalStages, setApprovalStages] = useState(null);
  const [ApprovalStage, setApprovalStage] = useState(null);
  const [Approvals, setApproval] = useState(null);

  const {fileViewer, setFileViewer} = useContext(FileViewContext);

  // console.log("Approvals: ", Approvals);

  // console.log({ type })
  // console.log({ field })
  // console.log("category in compliance label: ",  category);
  // console.log({ category_shortcode })

  const updateField = () => {
    let field_value = category[field];

    if(!field_value){
      setProvided(false);
    }
    if (category_shortcode) {
      switch (type) {
        case "shortcodes":
          field_value = category_shortcode.shortcode.shortcodes;
          break;
        case "pricing_shortcodes":
          field_value = category_shortcode.shortcode_pricing.pricing_shortcodes;
          break;
        case "shortcode_doc":
          field_value = category_shortcode.shortcode.shortcode_doc;
          break;
        case "pricing_doc":
          field_value = category_shortcode.shortcode_pricing.pricing_doc;
          break;
        case "shortcode_issue_date":
          field_value = category_shortcode.shortcode.shortcode_issue_date;
          break;
        case "shortcode_expiry_date":
          field_value = category_shortcode.shortcode.shortcode_expiry_date;
          break;
        case "pricing_issue_date":
          field_value = category_shortcode.shortcode_pricing.pricing_issue_date;
          break;
        case "pricing_expiry_date":
          field_value =
            category_shortcode.shortcode_pricing.pricing_expiry_date;
          break;
        case "state":
          field_value =
            category_shortcode.shortcode_pricing.pricing_expiry_date;
          break;
      }
    }
    //OPEN FIELD EDIT
    setData({
      partner_uuid: partner.uuid,
      category_uuid: category.category_uuid,
      category_stage: stage,
      category_shortcode,
      field_value,
      type,
      field,
      shortcode_uuid: category_shortcode?.shortcode_uuid
        ? category_shortcode?.shortcode_uuid
        : category_shortcode?.uuid
        ? category_shortcode?.shortcode_uuid
        : null,
      country: category.country,
    });
    setShowModal(true);
  };

  useEffect(() => {
    const _approvals = partnerApprovals(partner, category);
    const _approvalStages = partner.approvalStages;

    setApproval(_approvals);
    setApprovalStages(_approvalStages[category.category_uuid]);

    /////////////////////
    let approving  = "";
    for(let i in _approvalStages[category.category_uuid]){
      if(i == stage){
        approving = i+"";
        break;
      }
      // console.log("i in approval stage", i + " is " + (i == stage));
    }

    setApprovalStage(approving);

    console.log("_approvals: ", _approvals);
    // console.log("_approvalStages: ", _approvalStages);
    // console.log("approving: ", approving);

  }, []);

  

  return (
    <>    
      <div
        className={`w-full p-3 border border-[#212121] rounded-[8px] ${
          activeApproval === field && " rounded-xl bg-[#313131]"
        }`}
      >
        {stage in complianceRequirements &&
          (field in complianceRequirements[stage] ||
            field.split("-")[0] in complianceRequirements[stage]) && (
            <>
              <div className="flex relative items-start gap-3 w-full">
                {activeApproval && activeApproval !== field && (
                  <div className="absolute cursor-not-allowed top-[-10px] right-[-10px] bottom-[-10px] left-[-10px] z-20 bg-transparent"></div>
                )}

                <div className="text-[#999999] w-18 h-18">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                    />
                  </svg>
                </div>

                <div className="flex justify-between items-start gap-3 w-full">
                  <div className="flex flex-col grow gap-3 items-start">
                    <div className="flex flex-col gap-0 w-full">
                      <span className="text-[12px] m-0 text-[#999999]">
                        {stage in complianceRequirements &&
                          complianceRequirements[stage][field]?.title}
                      </span>
                      {type === "text" && (
                        <span className="text-white/80 text-[14px] font-bold">
                          {category[field] && category[field]}
                        </span>
                      )}
                      {type === "company_type" && (
                        <span className="text-white/80 text-[14px] font-bold">
                          {category[field] &&
                            company_type?.find(
                              (t) => t.value === category[field]
                            )?.label}
                        </span>
                      )}
                      {type === "license_type" && (
                        <span className="text-white/80 text-[14px] font-bold">
                          {category[field] &&
                            license_type?.find(
                              (t) => t.value === category[field]
                            )?.label}
                        </span>
                      )}
                      {type === "company_state" && (
                        <span className="text-white/80 text-[14px] font-bold">
                          {category[field] &&
                            STATES?.find(
                              (s) =>
                                s.state_code === category[field] &&
                                s.country_code === category.country
                            )?.state_name}
                        </span>
                      )}
                      {type === "country" && (
                        <span className="text-white/80 text-[14px] font-bold flex items-center gap-1">
                          <Image
                            alt={`${category[field]}`}
                            src={`/assets/flags/${
                              category[field]?.toLowerCase() ?? "ng"
                            }.svg`}
                            className={"inline mr-2 rounded-sm h-auto"}
                            width={24}
                            height={15}
                            priority
                          />
                          <span>
                            {" "}
                            {category[field] &&
                              COUNTRIES?.find(
                                (c) => c.value === category[field]
                              )?.title}
                          </span>
                        </span>
                      )}
                      {type === "date" && field in category && (
                        <span className="text-white/80 text-[14px] font-bold whitespace-nowrap">
                          {category[field] &&
                            moment(category[field]).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {type === "file" && category[field]?.file_path && (
                        <span
                          onClick={() =>
                            setFileViewer(category[field]?.file_path ?? NULL)
                          }
                          className="text-white/80 text-[14px] font-bold cursor-pointer"
                        >
                          {category[field]?.file_name}
                        </span>
                      )}
                      {type === "shortcodes" && (
                        <>
                          <span className="text-white/80 text-[14px] font-bold">
                            {category_shortcode.shortcode?.shortcodes?.length >
                              0 &&
                              category_shortcode.shortcode?.shortcodes?.join(
                                ", "
                              )}
                          </span>
                        </>
                      )}
                      {type === "shortcode_doc" && (
                        <span
                          onClick={() =>
                            setFileViewer(
                              category_shortcode.shortcode?.shortcode_doc
                                ?.file_path ?? NULL
                            )
                          }
                          className="text-white/80 text-[14px] font-bold cursor-pointer"
                        >
                          {
                            category_shortcode.shortcode?.shortcode_doc
                              ?.file_name
                          }
                        </span>
                      )}
                      {type === "shortcode_issue_date" && (
                        <span className="text-white/80 text-[14px] font-bold whitespace-nowrap">
                          {category_shortcode.shortcode?.shortcode_issue_date &&
                            moment(
                              category_shortcode.shortcode?.shortcode_issue_date
                            ).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {type === "shortcode_expiry_date" && (
                        <span className="text-white/80 text-[14px] font-bold whitespace-nowrap">
                          {category_shortcode.shortcode
                            ?.shortcode_expiry_date &&
                            moment(
                              category_shortcode.shortcode
                                ?.shortcode_expiry_date
                            ).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {/* PRICING */}
                      {type === "pricing_shortcodes" && (
                        <span className="text-white/80 text-[14px] font-bold">
                          {category_shortcode.shortcode_pricing
                            ?.pricing_shortcodes?.length > 0 &&
                            category_shortcode.shortcode_pricing?.pricing_shortcodes?.join(
                              ", "
                            )}
                        </span>
                      )}
                      {type === "pricing_doc" && (
                        <span
                          onClick={() =>
                            setFileViewer(
                              category_shortcode.shortcode_pricing?.pricing_doc
                                ?.file_path ?? NULL
                            )
                          }
                          className="text-white/80 text-[14px] font-bold cursor-pointer"
                        >
                          {
                            category_shortcode.shortcode_pricing?.pricing_doc
                              ?.file_name
                          }
                        </span>
                      )}
                      {type === "pricing_issue_date" && (
                        <span className="text-white/80 text-[14px] font-bold whitespace-nowrap">
                          {category_shortcode.shortcode_pricing
                            ?.pricing_issue_date &&
                            moment(
                              category_shortcode.shortcode_pricing
                                ?.pricing_issue_date
                            ).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {type === "pricing_expiry_date" && (
                        <span className="text-white/80 text-[14px] font-bold whitespace-nowrap">
                          {category_shortcode.shortcode_pricing
                            ?.pricing_expiry_date &&
                            moment(
                              category_shortcode.shortcode_pricing
                                ?.pricing_expiry_date
                            ).format("DD / MMM / YYYY")}
                        </span>
                      )}
                    </div>
                  </div>
                  {!Util.isEmpty(Approvals) &&
                    Approvals?.counts?.status &&
                    Approvals?.counts?.status && (
                      <div className="flex flex-col gap-0 items-end">
                        <div className="grow-0">
                          <FieldStatus
                            status={Approvals?.counts.status[field]}
                          />
                        </div>
                        {Approvals?.counts?.status[field] === "approved" && (
                          <span className="text-[#999999] text-[12px] whitespace-nowrap">
                            {Approvals?.fieldDates?.vas_license_id?.length >
                              0 &&
                              moment(
                                Approvals?.fieldDates?.vas_license_id[0]
                              ).format("MMM D, YYYY [at] h:mm:ss a")}
                          </span>
                        )}
                      </div>
                    )}
                </div>
              </div>
              {Approvals &&
                Approvals?.counts?.status &&
                Approvals?.counts?.status[field] === "rejected" && (
                  <RejectionReasons
                    title={
                      stage in complianceRequirements &&
                      complianceRequirements[stage][field]?.title
                    }
                    field={field}
                    approvals={Approvals}
                    onclick={updateField}
                    categoryField={category[field]}
                  />
                )}
            </>
          )}
      </div>
      {showModal && (
        <Portal>
          <ComplianceFieldEditModal setShowModal={setShowModal} data={data} provided={provided} />
        </Portal>
      )}
    </>
  );
}

