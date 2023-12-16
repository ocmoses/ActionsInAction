"use client";
import TextInput from "@/app/components/form/TextInput";
import FileInput from "@/app/components/form/FileInput";
import DatePicker from "@/app/components/form/DatePicker";
import FileInputWrapper from "@/app/components/form/FileInputWrapper";
import RegisterStepHeader from "@/app/components/RegisterStepHeader";
import ButtonNext from "@/app/components/form/ButtonNext";
import ButtonPrev from "@/app/components/form/ButtonPrev";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import Image from "next/image";
import { outputDate, getNextStage } from "app/modules/utilities";
import { useState, useEffect } from "react";
import { Util } from "@/utils/utility";
import { TailSpinPreloader } from "@/app/components/Icons";
import { forms, validities } from "@/app/modules/constants";
import {
  scrollToTop,
  validateExpiryDate,
  getValidityRange,
  ValidateField,
  fieldRequired,
  fieldName,
} from "@/app/modules/utilities";

function Shortcode() {
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
  const { min_start_date, max_end_date, yesterday, tomorrow } =
    getValidityRange(validities.shortcode);

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    shortcodes: [],
  });
  const [shtcde, setShtcde] = useState("");
  const [shortcodeSet, setShortcodeSet] = useState(0);
  const [activeform, setActiveform] = useState("shortcode");

  const [formdata, setFormdata] = useState({
    shortcode: {
      shortcodes: process.env.NODE_ENV === "production" ? [] : ["777", "966"], // ARRAY OR STRING
      shortcode_doc: {}, //FILE
      shortcode_file: null, //FILE
      shortcode_issue_date:
        process.env.NODE_ENV === "production" ? "" : "2022-01-20", //DATE
      shortcode_expiry_date:
        process.env.NODE_ENV === "production" ? "" : "2023-06-20", //DATE
    },
    shortcode_pricing: {
      pricing_shortcodes:
        process.env.NODE_ENV === "production" ? [] : ["777", "966"], // ARRAY OR STRING
      pricing_doc: {},
      pricing_file: null,
      pricing_issue_date:
        process.env.NODE_ENV === "production" ? "" : "2022-01-20", //DATE
      pricing_expiry_date:
        process.env.NODE_ENV === "production" ? "" : "2023-06-20", //DATE
    },
  });
  const { title, subtitle, hand, required } = forms["shortcode"];
  const [pageTitle, setPageTitle] = useState(title);
  useEffect(() => {
   setProcessing(false);
    setPageTitle(
      activeform === "pricing"
        ? "Provide your short code pricing details"
        : title
    );
  }, [activeform]);
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data);
  useEffect(() => {
   setProcessing(false);
    setForm("shortcode");
    setProcessing(false);
    setShortcodeSet(0);
    setActiveform(null);
    scrollToTop("onboardinglayout");
  }, []);
  const [isMasterData, setIsMasterData] = useState(false);
  useEffect(() => {
   setProcessing(false);
    if (category) {
      const Category =
        partner.master &&
        partner.sections[partner.master.category_uuid]?.shortcode &&
        category.category_uuid !== partner.master.category_uuid
          ? partner.master
          : category;

      setIsMasterData(
        partner.master &&
          partner.sections[partner.master.category_uuid]?.shortcode &&
          category.category_uuid !== partner.master.category_uuid
      );
      const Shortcodes = [];
      if (Category?.shortcodes?.length > 0) {
        Category.shortcodes.map((sc) => {
          sc.shortcode.shortcode_file = "";
          sc.shortcode_pricing.pricing_file = "";
          // Shortcodes.push(sc)
          Shortcodes.push({
            ...sc,
            shortcode: { ...sc.shortcode, shortcode_file: "" },
            shortcode_pricing: {
              ...sc.shortcode_pricing,
              pricing_file: "",
            },
          });
        });
      }
      setData({
        partner_uuid: Category?.partner_uuid ?? "",
        category_uuid: category?.category_uuid ?? "",
        shortcodes: Shortcodes ?? [],
      });
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    if (
      fieldRequired("shortcode", "shortcode", category) &&
      // category?.validation.shortcode === "r" &&
      Util.isEmpty(data.shortcodes)
    )
      return setError({ shortcode: `Please provide shortcode data` });
    data.shortcodes.map((shortcodePrice) => {
      if (
        fieldRequired("shortcode", "shortcode", category) &&
        !shortcodePrice.shortcode?.shortcodes.length
      ) {
        return setError({ shortcode: `Shortcode is required` });
      }
      if (
        fieldRequired("shortcode_doc", "shortcode", category) &&
        !shortcodePrice.shortcode.shortcode_doc &&
        !shortcodePrice.shortcode.shortcode_file
      )
        return setError({ shortcode: `Shortcode document is required` });
    });
    const result = await registerPartner("shortcode", data);
    if (result) {
      scrollToTop("onboardinglayout");
      if (result?.error) return setError({ shortcode: result.error });
    }
    if (result.data?.partner) {
      updatePartner(result?.data?.partner);
      const newcategory = result.data?.partner.categories.find(
        (c) => c.category_uuid === category.category_uuid
      );
      newcategory.profile_stage.shortcode = "1";
      const { nextstage: NextStage } = nextStage(newcategory, partner);
      return setForm(NextStage);
    }
  };
  const handleShortcodeFormChange = (e) => {
    removeError(e.target.id);
    setFormdata((prevState) => ({
      ...prevState,
      shortcode: { ...prevState.shortcode, [e.target.id]: e.target.value },
    }));
  };
  const handlePricingFormChange = (e) => {
    removeError(e.target.id);
    setFormdata((prevState) => ({
      ...prevState,
      shortcode_pricing: {
        ...prevState.shortcode_pricing,
        [e.target.id]: e.target.value,
      },
    }));
  };
  const formShortcodeArray = (shtcd) => {
    const input = shtcd
      ?.replaceAll(";", ",")
      .replaceAll(" ", ",")
      .replaceAll(".", ",");
    if (!input) return null;
    const inputArray = input.split(",");
    if (!inputArray.length) return null;
    const string = [];
    for (let i = 0; i < inputArray.length; i++) {
      if (!(!inputArray[i].trim() || /^\s*$/.test(inputArray[i].trim())))
        string.push(inputArray[i].trim());
    }
    return string.filter((str) => str !== "undefined");
  };
  const handleKeyUp = (e) => {
    if (e.key === " " || e.key === "Enter") {
      processKeyUp();
    }
  };
  const processKeyUp = () => {
    removeError("shtcde");
    let content = [];
    content = formShortcodeArray(shtcde);
    if (content && content.length > 0) {
      const duplicate = [];
      content.map((c) => {
        if (formdata.shortcode.shortcodes.includes(c)) {
          duplicate.push(c);
        }
      });
      if (duplicate.length > 0) {
        setError({
          shtcde: `${duplicate.join(", ")} already exists in shortcodes`,
        });
        return false;
      }
      //  9088, 65674 8765 098, 564 737 966
      setFormdata((prevState) => ({
        ...prevState,
        shortcode: {
          ...prevState.shortcode,
          shortcodes: [...prevState.shortcode.shortcodes, ...content],
        },
        shortcode_pricing: {
          ...prevState.pricing,
          pricing_shortcodes: [
            ...prevState.shortcode_pricing.pricing_shortcodes,
            ...content,
          ],
        },
      }));

      setShtcde("");
    }
    return true;
  };
  const handleShortcodeChange = (e) => {
    setShtcde(e.target.value);
  };
  const resetFormdata = () => {
    clearErrors();
    setFormdata({
      shortcode: {
        shortcodes: [], // ARRAY OR STRING
        shortcode_doc: null, //FILE
        shortcode_file: null, //FILE
        shortcode_issue_date: "", //DATE
        shortcode_expiry_date: "", //DATE
      },
      shortcode_pricing: {
        pricing_shortcodes: [], // ARRAY OR STRING
        pricing_doc: null,
        pricing_file: null,
        pricing_issue_date: "", //DATE
        pricing_expiry_date: "", //DATE
      },
    });
  };
  const removeShtcde = (index) => {
    const shtcd = formdata.shortcode.shortcodes[index];
    const newArray = formdata.shortcode.shortcodes.filter(
      (sc, i) => i !== index
    );
    const newPricingArray =
      formdata.shortcode_pricing.pricing_shortcodes.filter(
        (sc) => sc !== shtcd
      );
    setFormdata((prevState) => ({
      ...prevState,
      shortcode: { ...prevState.shortcode, shortcodes: newArray },
      shortcode_pricing: {
        ...prevState.shortcode_pricing,
        pricing_shortcodes: newPricingArray,
      },
    }));
  };
  const removePricingShtcde = (index) => {
    const newArray = formdata.shortcode_pricing.pricing_shortcodes.filter(
      (sc, i) => i !== index
    );
    setFormdata((prevState) => ({
      ...prevState,
      shortcode_pricing: {
        ...prevState.shortcode_pricing,
        pricing_shortcodes: newArray,
      },
    }));
  };

  const editShortcode = (index) => {
    clearErrors();
    const _data = data.shortcodes[index];
    setFormdata(_data);
    setShortcodeSet(index);
    setActiveform("shortcode");
  };
  const addShortcode = () => {
    setFormdata({
      shortcode: {
        shortcodes: process.env.NODE_ENV === "production" ? [] : ["777", "966"], // ARRAY OR STRING
        shortcode_doc: {}, //FILE
        shortcode_file: null, //FILE
        shortcode_issue_date:
          process.env.NODE_ENV === "production" ? "" : "2022-06-20", //DATE
        shortcode_expiry_date:
          process.env.NODE_ENV === "production" ? "" : "2023-06-20", //DATE
      },
      shortcode_pricing: {
        pricing_shortcodes:
          process.env.NODE_ENV === "production" ? [] : ["777", "966"], // ARRAY OR STRING
        pricing_doc: {},
        pricing_file: null,
        pricing_issue_date:
          process.env.NODE_ENV === "production" ? "" : "2022-06-20", //DATE
        pricing_expiry_date:
          process.env.NODE_ENV === "production" ? "" : "2023-06-20", //DATE
      },
    });
    const index = data.shortcodes.length;
    setShortcodeSet(index);
    setActiveform("shortcode");
  };
  const deleteShortcode = (index) => {
    clearErrors();
    const newData = data.shortcodes.filter((d, i) => i !== index);
    setData((oldData) => ({ ...oldData, shortcodes: newData }));
  };

  const cancelShortcode = () => {
    resetFormdata();
    setActiveform(null);
    setShortcodeSet(null);
  };
  const goBackToShortcode = () => {
    setActiveform("shortcode");
  };
  const goToPricing = () => {
    // console.log("collected shortcode", shtcde);
    // return;

    if(shtcde.trim() != ""){
      processKeyUp();
      return;
    }
    
    if(shtcde.trim() == '' && formdata.shortcode.shortcodes.length == 0){
      return setError({ shortcode: `Shortcode is required` });
    }

    if (!processKeyUp()) return;
    clearErrors();
    if (
      fieldRequired("shortcode", "shortcode", category) &&
      // category?.validation.shortcode === "r" &&
      required.shortcode &&
      !(formdata.shortcode.shortcodes.length > 0)
    ) {
      scrollToTop("onboardinglayout");
      return setError({ shortcode: `Shortcode is required` });
    }
    if (
      fieldRequired("shortcode_doc", "shortcode", category) &&
      formdata.shortcode.shortcodes.length > 0
    ) {
      if (
        fieldRequired("shortcode_doc", "shortcode", category) &&
        !formdata.shortcode.shortcode_doc &&
        !formdata.shortcode.shortcode_file
      ) {
        scrollToTop("onboardinglayout");
        return setError({ shortcode: `Shortcode document is required` });
      }
      if (
        fieldRequired("shortcode_issue_date", "shortcode", category) &&
        !formdata.shortcode.shortcode_issue_date
      ) {
        scrollToTop("onboardinglayout");
        return setError({
          shortcode: `Shortcode issue date is required`,
        });
      }
      if (
        fieldRequired("shortcode_expiry_date", "shortcode", category) &&
        !formdata.shortcode.shortcode_expiry_date
      ) {
        scrollToTop("onboardinglayout");
        return setError({
          shortcode: `Shortcode expiry date is required`,
        });
      }
      if (
        formdata.shortcode.shortcode_issue_date &&
        formdata.shortcode.shortcode_expiry_date &&
        validities.shortcode
      ) {
        const expiryError = validateExpiryDate(
          formdata.shortcode.shortcode_issue_date,
          formdata.shortcode.shortcode_expiry_date,
          validities.shortcode
        );
        if (expiryError) return setError({ shortcode: expiryError });
      }
    }
    setActiveform("pricing");
  };
  const saveShortcode = () => {
    clearErrors();

    if (
      fieldRequired("shortcode_pricing_doc", "shortcode", category) &&
      formdata.shortcode_pricing.pricing_shortcodes.length > 0
    ) {
      if (
        fieldRequired("shortcode_pricing_doc", "shortcode", category) &&
        !formdata.shortcode_pricing.pricing_doc &&
        !formdata.shortcode_pricing.pricing_file
      ) {
        scrollToTop("onboardinglayout");
        return setError({
          shortcode: `Shortcode pricing document is required`,
        });
      }
      if (
        fieldRequired("pricing_issue_date", "shortcode", category) &&
        !formdata.shortcode_pricing.pricing_issue_date
      ) {
        scrollToTop("onboardinglayout");
        return setError({
          shortcode: `Shortcode pricing issue date is required`,
        });
      }
      if (
        fieldRequired("pricing_expiry_date", "shortcode", category) &&
        !formdata.shortcode_pricing.pricing_expiry_date
      ) {
        scrollToTop("onboardinglayout");
        return setError({
          shortcode: `Shortcode pricing expiry date is required`,
        });
      }
      const pricingExpiryError = validateExpiryDate(
        formdata.shortcode_pricing.pricing_issue_date,
        formdata.shortcode_pricing.pricing_expiry_date,
        validities.shortcode_pricing
      );
      if (pricingExpiryError)
        return setError({ shortcode: pricingExpiryError });
    }
    const newPayload = {
      shortcode: {
        shortcodes: formdata.shortcode.shortcodes, // ARRAY OR STRING
        shortcode_doc: formdata.shortcode.shortcode_doc, //FILE
        shortcode_file: formdata.shortcode.shortcode_file, //FILE
        shortcode_issue_date: formdata.shortcode.shortcode_issue_date,
        shortcode_expiry_date: formdata.shortcode.shortcode_expiry_date,
      },
      shortcode_pricing: {
        pricing_shortcodes: formdata.shortcode_pricing.pricing_shortcodes, // ARRAY OR STRING
        pricing_doc: formdata.shortcode_pricing.pricing_doc,
        pricing_file: formdata.shortcode_pricing.pricing_file,
        pricing_issue_date: formdata.shortcode_pricing.pricing_issue_date, //DATE
        pricing_expiry_date: formdata.shortcode_pricing.pricing_expiry_date, //DATE
      },
    };
    if (data.shortcodes[shortcodeSet]) {
      setData((prvState) => {
        const newState = prvState.shortcodes.map((sc, i) => {
          if (i === shortcodeSet) {
            return newPayload;
          } else {
            return sc;
          }
        });
        return { ...prvState, shortcodes: newState };
      });
    } else {
      setData((prvState) => {
        return {
          ...prvState,
          shortcodes: [...prvState.shortcodes, newPayload],
        };
      });
    }
    resetFormdata();
    setActiveform(null);
    setShortcodeSet(null);
  };
  const ValidateShortcode = (field) => {
    removeError(field);
    const error = ValidateField(
      field,
      "shortcode",
      formdata.shortcode,
      category
    );
    if (error)
      return setError({
        [field]: error,
      });
  };
  const ValidatePricing = (field) => {
    removeError(field);
    const error = ValidateField(
      field,
      "shortcode",
      formdata.shortcode,
      category
    );
    if (error)
      return setError({
        [field]: error,
      });
  };
  return (
    <div
      id="onboardingform"
      className="w3-animate-opacity pb-20 w-full max-w-[492px]"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={pageTitle} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["shortcode"]} />}
        </div>
        {!activeform && (
          <div className={`w3-animate-opacity`}>
            {data?.shortcodes?.length > 0 && (
              <>
                {data?.shortcodes?.map((d, index) => (
                  <div
                    key={`'shortcode-${index}`}
                    className="flex justify-between items-center gap-4 mt-4 mb-4 p-[12px] rounded-lg bg-[#212121]"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <div className="flex justify-center items-center rounded-full w-[44px] h-[44px] bg-[#111111]">
                        <Image
                          src="/assets/icons/shortcode.svg"
                          width={20}
                          height={20}
                          alt=""
                        />
                      </div>
                      {d.shortcode.shortcodes?.length > 0 && (
                        <div className="flex flex-col truncate">
                          <div className="flex justify-start items-center text-lg text-white truncate">
                            {d.shortcode.shortcodes.join(", ")}
                          </div>
                          <div className="flex justify-start items-center text-sm text-[#999999] truncate">
                            Issued{" "}
                            {outputDate(d.shortcode.shortcode_issue_date)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => editShortcode(index)}
                        className={`rounded-full text-sm px-2 h-6 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
                      >
                        <span>
                          {!isMasterData &&
                          partner?.contract_status === "not_started" &&
                          partner?.contract_status !== "not_started"
                            ? "Edit"
                            : "View"}
                        </span>
                      </button>
                      {!isMasterData &&
                        partner?.contract_status === "not_started" &&
                        partner?.contract_status !== "not_started" && (
                          <div
                            onClick={() => deleteShortcode(index)}
                            className="flex justify-center items-center rounded-full text-sm w-6 h-6 text-red-600 hover:text-red-600/60 bg-transparent border border-red-600 hover:border-red/60 transition ease-in-out 5000 cursor-pointer"
                          >
                            x
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </>
            )}
            {!isMasterData && partner?.contract_status === "not_started" && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={addShortcode}
                  className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
                >
                  <span>Add shortcodes</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div
          id="shortcodeform"
          className={`w3-animate-opacity ${
            activeform !== "shortcode" && "hidden"
          } `}
        >
          <FileInputWrapper>
            <FileInput
              id="shortcode_file"
              doc_id="shortcode_doc"
              label="Short code document"
              key={`shortcode_file-${shortcodeSet}}`}
              value={
                formdata.shortcode?.shortcode_file?.name
                  ? formdata.shortcode.shortcode_file
                  : formdata.shortcode.shortcode_doc
              }
              onChange={handleShortcodeFormChange}
              errors={errors}
              margin="mb-6"
              disabled={
                isMasterData || partner?.contract_status !== "not_started"
              }
            />
          </FileInputWrapper>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="">
              <DatePicker
                id="shortcode_issue_date"
                label="Issue date"
                value={formdata.shortcode.shortcode_issue_date}
                onChange={handleShortcodeFormChange}
                onBlur={() => ValidateShortcode("shortcode_issue_date")}
                errors={errors}
                min={new Date(min_start_date)}
                max={yesterday}
                disabled={
                  isMasterData || partner?.contract_status !== "not_started"
                }
              />
            </div>
            <div className=" ">
              <DatePicker
                id="shortcode_expiry_date"
                label="Expiry date"
                value={formdata.shortcode.shortcode_expiry_date}
                onChange={handleShortcodeFormChange}
                onBlur={() => ValidateShortcode("shortcode_expiry_date")}
                errors={errors}
                min={tomorrow}
                max={new Date(max_end_date)}
                disabled={
                  isMasterData || partner?.contract_status !== "not_started"
                }
              />
            </div>
          </div>
          <p className="mb-0 text-[#999999]">Enter applicable short codes</p>
          <div className="flex justify-start flex-wrap gap-4 mt-4 mb-4">
            {formdata.shortcode.shortcodes?.length > 0 &&
              formdata.shortcode.shortcodes.map((sc, index) => (
                <span
                  key={`shortcode-${sc}-${index}`}
                  className="flex justify-between gap-3 py-1 px-2 text-white font-bold rounded-lg border border-white/20"
                >
                  <span>{sc}</span>
                  {!isMasterData &&
                    partner?.contract_status === "not_started" && (
                      <div
                        onClick={() => {
                          removeShtcde(index);
                        }}
                        className="flex items-center cursor-pointer justify-center rounded-full text-white/80 hover:text-red-300"
                      >
                        x
                      </div>
                    )}
                </span>
              ))}
          </div>
          <TextInput
            id="shtcde"
            label="Short codes"
            value={shtcde}
            onKeyUp={handleKeyUp}
            onChange={handleShortcodeChange}
            errors={errors}
            margin="mb-2"
            disabled={
              isMasterData || partner?.contract_status !== "not_started"
            }
          />
          <p className="text-[12px] text-[#999999] mb-2">
            Enter multiple comma-separated shortcodes and press "Enter" to apply
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelShortcode}
              className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
            >
              <span>Close</span>
            </button>
            <button
              type="button"
              onClick={goToPricing}
              className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
            >
              <span>Next</span>
            </button>
          </div>
        </div>
        <div
          id="pricingform"
          className={`w3-animate-opacity ${
            activeform !== "pricing" && "hidden"
          } `}
        >
          <p className="mb-0 text-[#999999]">
            Your shortcodes{" "}
            {!isMasterData && partner?.contract_status === "not_started" && (
              <span
                className="text-[##FFCB03] cursor-pointer"
                onClick={goBackToShortcode}
              >
                Edit
              </span>
            )}
          </p>

          <div className="flex justify-start flex-wrap gap-4 mt-4 mb-4">
            {formdata.shortcode_pricing.pricing_shortcodes?.length > 0 &&
              formdata.shortcode_pricing.pricing_shortcodes.map((sc, index) => (
                <span
                  key={`pricing-${sc}-${index}`}
                  className="flex justify-between gap-3 py-1 px-2 text-white font-bold rounded-lg border border-white/20"
                >
                  <span>{sc}</span>
                  {!isMasterData &&
                    partner?.contract_status === "not_started" && (
                      <div
                        onClick={() => {
                          removePricingShtcde(index);
                        }}
                        className="flex items-center cursor-pointer justify-center rounded-full text-white/80 hover:text-red-300"
                      >
                        x
                      </div>
                    )}
                </span>
              ))}
          </div>
          <p className="my-3 text-[#999999]">
            Pricing detail for your short codes
          </p>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="">
              <DatePicker
                id="pricing_issue_date"
                label="Issue date"
                value={formdata.shortcode_pricing.pricing_issue_date}
                onChange={handlePricingFormChange}
                onBlur={() => ValidatePricing("pricing_issue_date")}
                errors={errors}
                min={new Date(min_start_date)}
                max={yesterday}
                disabled={
                  isMasterData || partner?.contract_status !== "not_started"
                }
              />
            </div>
            <div className=" ">
              <DatePicker
                id="pricing_expiry_date"
                label="Expiry date"
                value={formdata.shortcode_pricing.pricing_expiry_date}
                onChange={handlePricingFormChange}
                onBlur={() => ValidatePricing("pricing_expiry_date")}
                errors={errors}
                min={tomorrow}
                max={new Date(max_end_date)}
                disabled={
                  isMasterData || partner?.contract_status !== "not_started"
                }
              />
            </div>
          </div>
          <FileInputWrapper>
            <FileInput
              id="pricing_file"
              doc_id="pricing_doc"
              label="Pricing document"
              key={`pricing_file-${shortcodeSet}}`}
              value={
                formdata.shortcode_pricing.pricing_file?.name
                  ? formdata.shortcode_pricing.pricing_file
                  : formdata.shortcode_pricing.pricing_doc
              }
              onChange={handlePricingFormChange}
              errors={errors}
              margin="mb-6"
              disabled={
                isMasterData || partner?.contract_status !== "not_started"
              }
            />
          </FileInputWrapper>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={goBackToShortcode}
              className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
            >
              <span>Back</span>
            </button>
            {!isMasterData && partner?.contract_status === "not_started" && (
              <button
                type="button"
                onClick={saveShortcode}
                className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
              >
                <span>Save shortcodes</span>
              </button>
            )}
          </div>
        </div>
        {!isMasterData && partner?.contract_status === "not_started" && (
          <div className="mt-8">
            {/* {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : ( */}
              !activeform && (
                <div className="flex items-center gap-4">
                  {/* <ButtonPrev
                  onClick={() => moveToPrevForm("shortcode")}
                  type="button"
                  label="Back"
                  outline="yes"
                  outlinecolor="border-white"
                /> */}

                  <ButtonNext
                    onClick={handleSubmit}
                    type="button"
                    label={checkUpdateStatus("shortcode") ? "Update" : "Next"}
                  />
                </div>
              )
            {/* )} */}
          </div>
        )}
      </form>
    </div>
  );
}

export default Shortcode;
