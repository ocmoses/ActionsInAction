import { fieldsCounts, fieldCounts } from "@/app/modules/constants";
import { getStatuses, partnerApprovals } from "@/app/modules/utilities";

import useAdmins from "@/hooks/useAdmins";
import useRoles from "@/hooks/useRoles";
import { useEffect, useState } from "react";

export default function CategoryStageStatus({ stage, category, partner }) {

  // console.log("stage___", stage);

  const { isSuperadmin } = useRoles();
  const { admin } = useAdmins();
  const [ApprovalStages, setApprovalStages] = useState(null);
  const [ApprovalStage, setApprovalStage] = useState(null);
  const [Approvals, setApproval] = useState(null);

  useEffect(() => {
    fieldsCounts();
    const _approvals = partnerApprovals(partner, category);
    const _approvalStages = partner.approvalStages;

    console.log("Partner Approvals in category stage status", _approvals);
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
    
  }, [partner.approvalStages, category]);

  let dept;
  let counts;

  // console.log("Approvals", Approvals);
  // console.log("ApprovalStages", ApprovalStages);

  // try{

  //   if (Approvals) {
  //     if (!isSuperadmin() && admin && admin.department_code) {
  //       dept = admin.department_code;      
  //     }else{
  
  //       for(let i in ApprovalStages[ApprovalStage]){
  //         dept = i+"";
  //         break;
  //       }
  
  //     }
  
  //     counts = {};
  
  //     const stageApprovals = ApprovalStages[stage] ? Object.keys(ApprovalStages[stage][Object.keys(ApprovalStages[stage])[0]]) : [];
  
  //     // console.log("ApprovalStage stageApprovals", stageApprovals);
  
  //     let total = ApprovalStages && stageApprovals.length;
  //     let approved = 0;
  //     let rejected = 0;
  //     let corrected = 0;
  //     let pending = 0;
  //     let status = 'approved';
  
  //     for(let entry of stageApprovals){
  
  //       // console.log("stageApprovals[entry]", entry + " " + ApprovalStages[stage][dept][entry]);
        
  //       if(ApprovalStages[stage][dept][entry] ==  'approved'){
  //         approved++;
  //       }else if(ApprovalStages[stage][dept][entry] ==  'rejected'){
  //         rejected++;
  //       }else if(ApprovalStages[stage][dept][entry] ==  'processing'){
  //         processing++;
  //       }else if(ApprovalStages[stage][dept][entry] ==  'corrected'){
  //         corrected++;
  //       }else if(ApprovalStages[stage][dept][entry] ==  'pending'){
  //         pending++;
  //       }
                          
  //     }
  
  //     if(stageApprovals.length == 0){
  //       status = 'pending';
  //     }else if(approved == total){
  //       status = 'approved';
  //     }else if(rejected > 0){
  //       status = 'rejected';
  //     }else if(corrected > 0){
  //       status = 'corrected';
  //     }else{
  //       status = 'processing';
  //     }
  
  //     counts.approved = approved;
  //     counts.corrected = corrected;
  //     counts.rejected = rejected;
  //     counts.pending = pending;
  //     counts.status = status;
  //   }  

  // }catch(e){
    if (Approvals) {
        if (!isSuperadmin() && admin && admin.department_code) {
          dept = admin.department_code;
          counts =
            stage in Approvals && Approvals[stage][dept]?.counts
              ? Approvals[stage][dept]?.counts
            : null;
      } else {
        counts = Approvals[stage]?.counts;
      }
    }
  // }

  
  // console.log("Approval stage", ApprovalStage);

  
  

  // console.log({ stage, counts })
  const { bg, textcolor, iconcolor, icon, text } = getStatuses(
    counts?.status,
    counts
  );
  return (
    <div
      className={`inline-flex gap-1 items-center rounded-2xl ${bg} py-[3px] pl-[10px] pr-[14px]`}
    >
      <span className={`${iconcolor}`}>{icon}</span>
      <span className={`${textcolor} text-[11px]`}>{text}</span>
    </div>
  );
}
