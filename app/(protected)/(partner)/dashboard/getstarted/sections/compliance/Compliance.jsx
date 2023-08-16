"use client";
import RegisterStepHeader from "@/app/components/RegisterStepHeader";
import FileInput from "@/app/components/form/FileInput";
import FileInputWrapper from "@/app/components/form/FileInputWrapper";
import TextInput from "@/app/components/form/TextInput";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";
import ButtonNext from "@/app/components/form/ButtonNext";
import useErrors from "@/hooks/useErrors";
import usePartners from "@/hooks/usePartners";
import useProcessing from "@/hooks/useProcessing";
import FormErrors from "@/app/components/FormErrors";
import axios from "axios";
import { NextEndPoints } from "@/app/modules/endpoints";
import { useState, useEffect } from "react";
import { Util } from "@/utils/utility";
import { TailSpinPreloader } from "@/app/components/Icons";
import { forms, company_type } from "@/app/modules/constants";
import {
  scrollToTop,
  ValidateField,
  fieldRequired,
} from "@/app/modules/utilities";

function Compliance() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing();
  const {
    partner,
    category,
    registerPartner,
    updatePartner,
    checkUpdateStatus,
    nextStage,
  } = usePartners();

  const [retryTIN, setRetryTIN] = useState(false);
  const [checkingTIN, setCheckingTIN] = useState(false);
  const [lastTINChecked, setLastTINChecked] = useState(null);
  const [retryCAC, setRetryCAC] = useState(false);
  const [checkingCAC, setCheckingCAC] = useState(false);
  const [lastCACChecked, setLastCACChecked] = useState(null);

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    rc_no: "",
    tin_no: "",
    tin_doc: "",
    memart_doc: "",
    cac_doc: "",
    tin_file: "",
    memart_file: "",
    cac_file: "",

    company_type: "co",
    tin_data: {},
    cac_data: {},
    valid_cac: "yes",
    valid_tin: "no",
  });
  const { title, subtitle, hand, fields } = forms["compliance"];
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data);
  const [isMasterData, setIsMasterData] = useState(false);
  useEffect(() => {
    if (category) {
      const Category =
        partner.master &&
        partner.sections[partner.master.category_uuid]?.compliance &&
        category.category_uuid !== partner.master.category_uuid
          ? partner.master
          : category;
      setIsMasterData(
        partner.master &&
          partner.sections[partner.master.category_uuid]?.compliance &&
          category.category_uuid !== partner.master.category_uuid
      );

      setData({
        partner_uuid: Category?.partner_uuid ?? "",
        category_uuid: category?.category_uuid ?? "",
        rc_no:
          process.env.NODE_ENV === "production"
            ? Category?.rc_no ?? ""
            : "12345678",
        tin_no:
          process.env.NODE_ENV === "production"
            ? Category?.tin_no ?? ""
            : "654326",
        tin_doc: Category?.tin_doc ?? {},
        memart_doc: Category?.memart_doc ?? {},
        cac_doc: Category?.cac_doc ?? {},
        tin_file: "",
        memart_file: "",
        cac_file: "",
        company_type: Category?.company_type ?? "co",
        tin_data: Category?.tin_data ?? {},
        cac_data: Category?.cac_data ?? {},
        valid_cac:
          process.env.NODE_ENV === "production"
            ? Category?.valid_cac ?? "yes"
            : "yes",
        valid_tin:
          process.env.NODE_ENV === "production"
            ? Category?.valid_tin ?? "no"
            : "yes",
      });
      setLastTINChecked(Category?.tin_no);
      setLastCACChecked(Category?.rc_no);
    }
  }, [category]);

  useEffect(() => {
    setForm("compliance");
    setProcessing(false);
    scrollToTop("onboardinglayout");
  }, []);

  const verifyTIN = async (tin_no) => {
    // if (process.env.NODE_ENV !== "production") {
    //   setData((prvState) => ({
    //     ...prvState,
    //     rc_no: "14386692",
    //     tin_data: {},
    //     valid_tin: "yes",
    //     valid_cac: "yes",
    //   }))
    //   return
    // }
    setLastCACChecked("");
    setRetryTIN(false);
    if (tin_no === lastTINChecked) return;

    removeError("company_type");
    removeError("tin_no");
    removeError("rc_no");
    if (!tin_no) {
      setData((prvState) => ({
        ...prvState,
        valid_tin: "no",
        valid_cac: "no",
      }));
      return setError({ tin_no: "Your TIN is required" });
    }

    if (!tin_no.includes("-")) {
      setData((prvState) => ({
        ...prvState,
        valid_tin: "no",
        valid_cac: "no",
      }));
      return setError({ tin_no: "Your TIN must include an hyphen ('-')" });
    }
    try {
      setCheckingTIN(true);
      const response = await axios
        .get(`${NextEndPoints.TIN_CHECK}?tin=${tin_no}`)
        .catch((err) => {
          console.log({ err });
          setCheckingTIN(false);
          setData((prvState) => ({
            ...prvState,
            valid_tin: "no",
            valid_cac: "no",
          }));
          return setError({
            tin_no: "An error occured while verifying your TIN (TIN-001)",
          });
        });
      setCheckingTIN(false);
      setLastTINChecked(tin_no);
      if (response) {
        const { success, data: result, error } = response.data;
        if (error) {
          setData((prvState) => ({
            ...prvState,
            valid_tin: "no",
            valid_cac: "no",
          }));
          return setError({ tin_no: error });
        }
        if (!result) {
          setData((prvState) => ({
            ...prvState,
            valid_tin: "no",
            valid_cac: "no",
          }));
          return setError({
            tin_no: "Something went wrong while verifying your TIN (TIN-002)",
          });
        }
        if (!result.TIN) {
          setData((prvState) => ({
            ...prvState,
            valid_tin: "no",
            valid_cac: "no",
          }));
          return setError({
            tin_no:
              "Your TIN may be invalid or cannot be verified. Please try again with a valid TIN (TIN-003)",
          });
        }
        setData((prvState) => ({
          ...prvState,
          rc_no: result["RC/BN"] ?? "",
          tin_data: result,
          valid_tin: "yes",
          valid_cac: result["RC/BN"] ? "yes" : "no",
        }));
        verifyCAC();
      } else {
        setData((prvState) => ({
          ...prvState,
          valid_tin: "no",
          valid_cac: "no",
        }));
        return setError({
          tin_no: "Something went wrong while verifying your TIN (TIN-004)",
        });
      }
    } catch (error) {
      console.log({ error });
      setCheckingTIN(false);
      setData((prvState) => ({
        ...prvState,
        valid_tin: "no",
        valid_cac: "no",
      }));
      return setError({
        tin_no: "An error occured while verifying your TIN (TIN-005)",
      });
    }
  };
  const verifyCAC = async () => {
    setRetryCAC(false);
    if (data.rc_no === lastCACChecked) return;
    removeError("company_type");
    removeError("tin_no");
    removeError("rc_no");

    if (!data.rc_no) {
      setData((prvState) => ({
        ...prvState,
        valid_cac: "no",
      }));
      return setError({ rc_no: "Your CAC is required" });
    }
    if (data.valid_tin !== "yes") {
      setData((prvState) => ({
        ...prvState,
        valid_cac: "no",
      }));
      return setError({ rc_no: "Please provide a valid TIN to continue" });
    }
    if (!data.company_type) {
      setData((prvState) => ({
        ...prvState,
        valid_cac: "no",
      }));
      return setError({ rc_no: "Your company type is required" });
    }
    let rc_no = data.rc_no;
    if (rc_no.toUpperCase().indexOf("RC") !== 0) {
      rc_no = `RC${rc_no}`;
      setData((prvState) => ({ ...prvState, rc_no }));
    }

    try {
      setCheckingCAC(true);
      const response = await axios
        .get(
          `${NextEndPoints.CAC_CHECK}?cac=${rc_no}&type=${data.company_type}`
        )
        .catch((err) => {
          console.log({ err });
          setCheckingCAC(false);
          setData((prvState) => ({
            ...prvState,
            valid_cac: "no",
          }));
          return setError({
            rc_no: "An error occured while verifying your CAC (CAC-001)",
          });
        });
      setCheckingCAC(false);
      setLastCACChecked(rc_no);

      if (response) {
        const { data: result, error } = response.data;

        if (error) {
          setData((prvState) => ({
            ...prvState,
            valid_cac: "no",
          }));
          return setError({ rc_no: error });
        }
        if (result.valid) {
          setData((prvState) => ({
            ...prvState,
            cac_data: result,
            valid_cac: "yes",
          }));
        }
      } else {
        setData((prvState) => ({
          ...prvState,
          valid_cac: "no",
        }));
        return setError({
          rc_no:
            "Your CAC numver could not be verified at this time. Please try again. (CAC-002)",
        });
      }
    } catch (error) {
      setCheckingCAC(false);
      console.log({ error });
      setData((prvState) => ({
        ...prvState,
        valid_cac: "no",
      }));
      return setError({
        rc_no: "An error occured while verifying your CAC (CAC-003)",
      });
    }
  };
  const onChangeCompanyType = async (company_type) => {
    removeError("company_type");
    removeError("tin_no");
    removeError("rc_no");
    if (!company_type) {
      setData((prvState) => ({
        ...prvState,
        valid_tin: "no",
        valid_cac: "no",
      }));
      return setError({ company_type: "Your company type is required" });
    }

    if (!data.tin_no || !data.rc_no) {
      setData((prvState) => ({
        ...prvState,
        valid_tin: "no",
        valid_cac: "no",
      }));
      return;
    }

    // verifyTIN(data.tin_no)
  };
  useEffect(() => {
    if (retryTIN) verifyTIN(data.tin_no);
  }, [retryTIN]);

  const Retry = (type) => {
    if (type === "tin") {
      setLastTINChecked("");
      setRetryTIN(true);
    } else {
      setLastCACChecked("");
      setRetryCAC(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    if (!Util.isEmpty(fields)) {
      for (const field in fields) {
        if (
          field !== "tin_doc" &&
          field !== "memart_doc" &&
          field !== "cac_doc"
        ) {
          const error = ValidateField(field, "compliance", data, category);
          if (error) {
            scrollToTop("onboardinglayout");
            return setError({
              [field]: error,
            });
          }
        }
      }
    }
    if (
      fieldRequired("tin_doc", "compliance", category) &&
      Util.isEmpty(data.tin_doc) &&
      !data.tin_file
    ) {
      scrollToTop("onboardinglayout");
      return setError({ tin_file: `TIN document is required` });
    }
    if (
      fieldRequired("memart_doc", "compliance", category) &&
      Util.isEmpty(data.memart_doc) &&
      !data.memart_file
    ) {
      scrollToTop("onboardinglayout");
      return setError({ memart_file: `Memart document is required` });
    }

    if (
      fieldRequired("cac_doc", "compliance", category) &&
      Util.isEmpty(data.cac_doc) &&
      !data.cac_file
    ) {
      scrollToTop("onboardinglayout");
      return setError({ cac_file: `CAC certificate is required` });
    }
    const result = await registerPartner("compliance", data);
    if (result) {
      // console.log({ category })
      scrollToTop("onboardinglayout");
      if (result?.error) return setError({ compliance: result.error });
      if (result.data?.partner) {
        updatePartner(result?.data?.partner);
        const newcategory = result.data?.partner.categories.find(
          (c) => c.category_uuid === category.category_uuid
        );
        newcategory.profile_stage.compliance = "1";
        const { nextstage: NextStage } = nextStage(newcategory, partner);
        // console.log({ NextStage })
        return setForm(NextStage);
      }
    }
  };
  const handleFormChange = (e) => {
    removeError(e.target.id);
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const Validate = (field) => {
    const error = ValidateField(field, "compliance", data, category);
    if (error)
      return setError({
        [field]: error,
      });
  };

  return (
    <div
      id="onboardingform"
      className="w3-animate-opacity pb-20 w-full max-w-[550px]"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["compliance"]} />}
        </div>
        <SelectInput
          id="company_type"
          label="Company type"
          disabled={
            isMasterData ||
            checkingTIN ||
            checkingCAC ||
            partner?.contract_status !== "not_started"
          }
          value={data.company_type}
          onChange={(e) => {
            handleFormChange(e);
            onChangeCompanyType(e.target.value);
            Validate("company_type");
          }}
          errors={errors}
          margin="mb-1"
        >
          <SelectInputOption value="" label="" />
          {company_type.map((ct) => (
            <SelectInputOption
              key={ct.value}
              value={ct.value}
              label={ct.label}
            />
          ))}
        </SelectInput>
        <p className="mb-6 mx-0 text-[14px] text-[#999999]">
          Select your company type to continue
        </p>
        {data.company_type && (
          <>
            <div className="md:grid md:grid-cols-2 md:gap-4">
              <div className="relative ">
                <TextInput
                  id="tin_no"
                  label="Tax identification number"
                  disabled={
                    isMasterData ||
                    checkingTIN ||
                    checkingCAC ||
                    partner?.contract_status !== "not_started"
                  }
                  value={data.tin_no}
                  onChange={handleFormChange}
                  onBlur={(e) => {
                    // Hidden for now
                    // verifyTIN(e.target.value);
                    // Validate("tin_no");
                  }}
                  errors={errors}
                  margin="mb-1"
                />
                {errors?.tin_no && (
                  <div className="mb-1">
                    <span
                      onClick={() => Retry("tin")}
                      className="cursor-pointer text-white text-[13px] my-3 inline-flex px-4 py-1 rounded-full border border-white/20 border-white/50 by-transparent hover:bg-white/20"
                    >
                      Retry
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="mb-0 mx-0 text-[12px] text-[#999999]">
                    TIN number must include an hyphen ("-"). <br />
                    E.g. 12345678-0001
                  </p>
                  {checkingTIN && (
                    <p className="mt-3 mb-0 mx-0 px-0 pt-2 text-white text-[12px] flex justify-start gap-3 items-center">
                      <TailSpinPreloader
                        width={24}
                        height={24}
                        fill="#efb703"
                      />{" "}
                      Verifying your TIN...
                    </p>
                  )}
                </div>
              </div>
              <div className="relative ">
                <TextInput
                  id="rc_no"
                  label="RC Number"
                  disabled={
                    isMasterData ||
                    !data.tin_no ||
                    checkingTIN ||
                    checkingCAC ||
                    partner?.contract_status !== "not_started"
                  }
                  value={data.rc_no}
                  onChange={handleFormChange}
                  onBlur={(e) => {
                    // Suspending this for now
                    // verifyCAC()
                  }}
                  errors={errors}
                  margin="mb-1"
                />
                {errors?.rc_no && (
                  <div className="mb-1">
                    <span
                      onClick={() => Retry("cac")}
                      className="cursor-pointer text-white text-[13px] my-3 inline-flex px-4 py-1 rounded-full border border-white/20 border-white/50 by-transparent hover:bg-white/20"
                    >
                      Retry
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="mb-0 mx-0 text-[12px] text-[#999999]">
                    RC number must include "RC". <br />
                    E.g. RC1234567
                  </p>
                  {checkingCAC && (
                    <p className="mt-3 mb-0 mx-0 px-0 pt-2 text-white text-[12px] flex justify-start gap-3 items-center">
                      <TailSpinPreloader
                        width={24}
                        height={24}
                        fill="#efb703"
                      />{" "}
                      Verifying your CAC...
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* {data.valid_tin === "yes" && data.valid_cac === "yes" && ( */}
              <>
                <FileInputWrapper>
                  <FileInput
                    id="tin_file"
                    doc_id="tin_doc"
                    label="TIN Document"
                    value={data.tin_doc}
                    onChange={handleFormChange}
                    errors={errors}
                    disabled={
                      isMasterData || partner?.contract_status !== "not_started"
                    }
                  />
                  <FileInput
                    id="memart_file"
                    doc_id="memart_doc"
                    label="Memart certificate"
                    value={data.memart_doc}
                    onChange={handleFormChange}
                    errors={errors}
                    disabled={
                      isMasterData || partner?.contract_status !== "not_started"
                    }
                  />
                  <FileInput
                    id="cac_file"
                    doc_id="cac_doc"
                    label="CAC Registration Certificate"
                    value={data.cac_doc}
                    onChange={handleFormChange}
                    errors={errors}
                    disabled={
                      isMasterData || partner?.contract_status !== "not_started"
                    }
                  />
                </FileInputWrapper>
                {!isMasterData &&
                  partner?.contract_status === "not_started" && (
                    <div className="mt-6">
                      {processing ? (
                        <TailSpinPreloader
                          width={40}
                          height={40}
                          fill="#efb703"
                        />
                      ) : (
                        <div className="flex items-center gap-4">
                          {/* <ButtonPrev
                          onClick={() => moveToPrevForm("compliance")}
                          type="button"
                          label="Back"
                          outline="yes"
                          outlinecolor="border-white"
                        /> */}
                          <ButtonNext
                            type="submit"
                            label={
                              checkUpdateStatus("compliance")
                                ? "Update"
                                : "Next"
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
              </>
            {/* )} */} 
            {/* // removed */}
          </>
        )}
      </form>
    </div>
  );
}

export default Compliance;
