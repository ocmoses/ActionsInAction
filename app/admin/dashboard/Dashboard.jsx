"use client";
import { useState, useEffect } from "react";
import { getPartnerInitials, filterPartner } from "@/app/modules/utilities";
import useProcessing from "@/hooks/useProcessing";
import useAdmins from "@/hooks/useAdmins";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import { useRouter } from "next/navigation";
import useApp from "@/hooks/useApp";
import Image from "next/image";

import useLogout from "@/hooks/useLogout";
import Filter from "@/app/components/Filter";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";

export default function Dashboard({ allPartners }) {
  const { getAllPartners, allCategories, categories } = useAdmins();
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [Partners, setPartners] = useState([]);

  const [fetchingPartners, setFetchingPartners] = useState(false);
  const router = useRouter();
  const { setRouteloading } = useApp();
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);
  const [onboardingStatus, setOnboardingStatus] = useState(null);

  const [allFilteredPartners, setAllFilteredPartners] = useState([]);
  const [allPagedPartners, setAllPagedPartners] = useState([]);

  const { LogoutAdmin } = useLogout();

  const get_all_Partner = async () => {
    if (fetchingPartners) return;
    setFetchingPartners(true);
    const _onboardingStatus =
      onboardingStatus === "all" ? "" : onboardingStatus;
    const All_Partners = await getAllPartners(page, perPage, _onboardingStatus);
    setPartners(All_Partners.partners);
    setFetchingPartners(false);
    if (All_Partners.error) setError({ compliance: All_Partners.error });
    setNavigation(All_Partners.navigation);
  };

  useEffect(() => {
    setProcessing(false);

    if ((onboardingStatus || perPage, page)) {
      get_all_Partner();
    }
  }, [page, onboardingStatus, perPage]);

  useEffect(() => {
    setProcessing(false);
    setProcessing(true);
    if (allPartners?.partners) {
      if (allPartners.partners?.length) {
        allPartners.partners.map((partner) => {
          filterPartner(partner, categories);
        });
      }

      for (let partner of allPartners.partners) {
        if (partner.submitted_on) {
          partner.status = "Submitted";
          partner.created_at = partner.submitted_on;
        } else {
          partner.status = "Not submitted";
        }
      }

      setPartners(allPartners.partners);
      setAllFilteredPartners(allPartners.partners);

      if (allPartners.error) {
        setProcessing(false);
        setError({ compliance: allPartners.error });
      }
      setProcessing(false);
    } else {
      LogoutAdmin();
    }
  }, [allPartners]);

  const goToPartnerDetail = (uuid) => {
    setRouteloading(true);
    router.push(`/admin/compliance/${uuid}`);
  };
  return (
    <div id="compliance" className="flex flex-cols pb-12 min-h-screen">
      <div className="w-full pt-[72px] px-12 mx-auto flex-grow ">
        <div className="flex justify-between items-center ">
          <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
            <h2>Applicants</h2>
            <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
              {allFilteredPartners?.length}
            </span>
          </div>
        </div>

        {errors && errors["compliance"] && (
          <div className="mb-6">
            <FormErrors error={errors["compliance"]} />
          </div>
        )}

        <div className="w-full mt-10 min-h-screen">
          <Filter
            list={allPartners.partners}
            filterAction={setAllFilteredPartners}
            keysArray={["uuid", "company_name", "Percent", "email"]}
            statusArray={["Submitted", "Not submitted"]}
          />

          <div className="rounded-[17px] border-1 border-white/20 overflow-x-auto">
            <table className="table w-full transparent">
              <tbody>
                <tr className="w-full bg-white/20 rounded-[5px]">
                  <th>
                    <span className="text-[13px]">Company</span>
                  </th>
                  <th>
                    <span className="text-[13px]">Progress</span>
                  </th>
                  <th>
                    <span className="text-[13px]">Categories</span>
                  </th>
                  <th>
                    <span className="text-[13px]">Submitted on</span>
                  </th>
                  <th>
                    <span className="text-[13px]">Contributors</span>
                  </th>
                </tr>

                {/* row 1 */}

                {allPagedPartners?.map((partner) => (
                  <tr
                    key={partner.uuid}
                    className="border-b border-b-white/10 cursor-pointer bg-transparent hover:bg-white/20"
                    onClick={() => goToPartnerDetail(partner.uuid)}
                  >
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                          <span>
                            {getPartnerInitials(partner.company_name)}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {partner.company_name}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/80">
                            {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                            {partner.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-0">
                        <div className="flex gap-1 items-center">
                          <div className="flex items-center rounded-full overflow-hidden w-[100px] z-0 relative h-[15px] border border-white/20 text-mtn text-[12px] bg-black justify-center">
                            <div
                              className={`left-0 top-0 z-10 absolute h-[15px] bg-[#FFCB03]`}
                              style={{
                                width: `${partner?.Percent}px`,
                                backgroundColor: "#FFCB03",
                              }}
                            ></div>
                            <div className="left-1 top-[-3px] z-20 px-2 absolute text-white h-[15px] bg-transparent">
                              {partner?.Percent}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-0">
                        {partner?.categories?.length > 0 &&
                          partner?.categories.map((category, index) => (
                            <div
                              key={category?.category_uuid}
                              className={`flex justify-center items-center tooltip tooltip-top tooltip-mtn w-[36px] h-[36px] text-[#FFCB03] rounded-full bg-white border border-[#999999] ${
                                index > 0 && "ml-[-8px]"
                              }`}
                              data-tip={category?.category_name}
                            >
                              {allCategories &&
                                allCategories[category?.category_uuid]
                                  ?.icon && (
                                  <Image
                                    src={
                                      allCategories[category?.category_uuid]
                                        ?.icon
                                    }
                                    alt=""
                                    width={28}
                                    height={28}
                                  />
                                )}
                            </div>
                          ))}
                      </div>
                    </td>
                    <td>
                      <div>
                        {partner?.submitted_on
                          ? moment(partner?.submitted_on).format("DD/MM/YYYY")
                          : "Not submitted"}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-0">
                        {partner?.contributors?.length > 0 &&
                          partner?.contributors.map((contributor, index) => (
                            <div
                              key={contributor.admin_user?.uuid}
                              className={`flex justify-center items-center tooltip tooltip-top tooltip-mtn w-[36px] h-[36px] text-[#FFCB03] rounded-full bg-white border border-[#999999] ${
                                index > 0 && "ml-[-8px]"
                              }`}
                              data-tip={contributor?.username?.toUpperCase()}
                            >
                              {contributor?.username && (
                                <span className="text-black font-bold">
                                  {contributor?.username &&
                                    contributor?.admin_user?.username[0].toUpperCase()}
                                </span>
                              )}
                            </div>
                          ))}
                      </div>
                    </td>
                    {/* <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th> */}
                  </tr>
                ))}

                {/* row 2 */}
              </tbody>
            </table>
            {allFilteredPartners.length == 0 && allPagedPartners.length == 0 ? (
              <EmptyTable list={"Partners"} />
            ) : (
              <TablePager
                list={allFilteredPartners}
                action={setAllPagedPartners}
              />
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
