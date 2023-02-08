"use client"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import DatePicker from "@/app/components/form/DatePicker"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import ButtonNext from "@/app/components/form/ButtonNext"
import ButtonPrev from "@/app/components/form/ButtonPrev"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import Image from "next/image"
import { outputDate } from "app/modules/utilities"
import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms } from "@/app/modules/constants"

function Shortcode() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing()
  const { category, registerPartner } = usePartners()

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    shortcodes: [],
  })
  const [shtcde, setShtcde] = useState("")
  const [shortcodeSet, setShortcodeSet] = useState(0)
  const [activeform, setActiveform] = useState("shortcode")

  const [formdata, setFormdata] = useState({
    shortcode: {
      shortcodes: ["12345", "34234", "65434"], // ARRAY OR STRING
      shortcode_doc: null, //FILE
      shortcode_file: null, //FILE
      shortcode_issue_date: "2020-06-08", //DATE
      shortcode_expiry_date: "2024-06-07", //DATE
    },
    shortcode_pricing: {
      pricing_shortcodes: ["12345", "65434"], // ARRAY OR STRING
      pricing_doc: null,
      pricing_file: null,
      pricing_issue_date: "2020-06-20", //DATE
      pricing_expiry_date: "2024-06-01", //DATE
    },
  })
  const { title, subtitle, hand, required } = forms["shortcode"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    setForm("shortcode")
    setProcessing(false)
    setShortcodeSet(0)
    setActiveform(null)
  }, [])
  useEffect(() => {
    if (category) {
      console.log({ category })
      setData({
        partner_uuid: category?.partner_uuid ?? "",
        category_uuid: category?.category_uuid ?? "",
        shortcodes: [
          // ARRAY OF OBJECT
          {
            shortcode: {
              shortcodes: ["12345", "34234", "65434"], // ARRAY OR STRING
              shortcode_doc: null, //FILE
              shortcode_file: null, //FILE
              shortcode_issue_date: "2020-06-08", //DATE
              shortcode_expiry_date: "2024-06-07", //DATE
            },
            shortcode_pricing: {
              pricing_shortcodes: ["12345", "65434"], // ARRAY OR STRING
              pricing_doc: null,
              pricing_file: null,
              pricing_issue_date: "2020-06-20", //DATE
              pricing_expiry_date: "2024-06-01", //DATE
            },
          },
        ],
      })
    }
  }, [category])

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()

    if (Util.isEmpty(data.shortcodes))
      return setError({ shortcode: `Please provide shortcode data` })

    data.shortcodes.map((shortcodePrice) => {
      if (!shortcodePrice.shortcode?.shortcodes.length) {
        return setError({ shortcode: `Shortcode is required` })
      }
      if (
        !shortcodePrice.shortcode.shortcode_doc &&
        !shortcodePrice.shortcode.shortcode_file
      )
        return setError({ shortcode: `Shortcode document is required` })
    })

    const result = await registerPartner("shortcode", data)
    // console.log({ result })
    if (result) {
      if (result?.error) return setError({ shortcode: result.error })
    }
    // moveToNextForm(["shortcode"])
  }
  const handleShortcodeFormChange = (e) => {
    removeError(e.target.id)
    setFormdata((prevState) => ({
      ...prevState,
      shortcode: { ...prevState.shortcode, [e.target.id]: e.target.value },
    }))
  }
  const handlePricingFormChange = (e) => {
    removeError(e.target.id)
    setFormdata((prevState) => ({
      ...prevState,
      shortcode_pricing: {
        ...prevState.shortcode_pricing,
        [e.target.id]: e.target.value,
      },
    }))
  }
  const formShortcodeArray = (shtcd) => {
    const input = shtcd
      ?.replaceAll(";", ",")
      .replaceAll(",", ",")
      .replaceAll(" ", ",")
      .replaceAll(".", ",")
    if (!input) return null
    const inputArray = input.split(",")
    if (!inputArray.length) return null
    const string = []
    for (let i = 0; i < inputArray.length; i++) {
      if (!(!inputArray[i].trim() || /^\s*$/.test(inputArray[i].trim())))
        string.push(inputArray[i].trim())
    }
    return string.filter((str) => str !== "undefined")
  }
  const handleKeyUp = (e) => {
    removeError("shtcde")
    let content = []
    if (e.key === " " || e.key === "Enter") {
      content = formShortcodeArray(shtcde)
      // if (cnt.length > 0) content.push(cnt)
    }
    if (content.length > 0) {
      const duplicate = []
      content.map((c) => {
        if (formdata.shortcode.shortcodes.includes(c)) {
          duplicate.push(c)
        }
      })
      if (duplicate.length > 0) {
        setError({
          shtcde: `${duplicate.join(", ")} already exists in shortcodes`,
        })
        return
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
      }))

      setShtcde("")
    }
  }
  const handleShortcodeChange = (e) => {
    setShtcde(e.target.value)
  }
  const resetFormdata = () => {
    clearErrors()
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
    })
  }
  const removeShtcde = (index) => {
    const shtcd = formdata.shortcode.shortcodes[index]
    const newArray = formdata.shortcode.shortcodes.filter(
      (sc, i) => i !== index
    )
    const newPricingArray =
      formdata.shortcode_pricing.pricing_shortcodes.filter((sc) => sc !== shtcd)
    setFormdata((prevState) => ({
      ...prevState,
      shortcode: { ...prevState.shortcode, shortcodes: newArray },
      shortcode_pricing: {
        ...prevState.shortcode_pricing,
        pricing_shortcodes: newPricingArray,
      },
    }))
  }
  const removePricingShtcde = (index) => {
    const newArray = formdata.shortcode_pricing.pricing_shortcodes.filter(
      (sc, i) => i !== index
    )
    setFormdata((prevState) => ({
      ...prevState,
      shortcode_pricing: {
        ...prevState.shortcode_pricing,
        pricing_shortcodes: newArray,
      },
    }))
  }

  const editShortcode = (index) => {
    clearErrors()
    const _data = data.shortcodes[index]
    setFormdata(_data)
    setShortcodeSet(index)
    setActiveform("shortcode")
  }
  const addShortcode = () => {
    resetFormdata()
    const index = data.shortcodes.length
    setShortcodeSet(index)
    setActiveform("shortcode")
  }
  const deleteShortcode = (index) => {
    clearErrors()
    const newData = data.shortcodes.filter((d, i) => i !== index)
    setData((oldData) => ({ ...oldData, shortcodes: newData }))
  }
  const goToPricing = () => {
    setActiveform("pricing")
  }
  const cancelShortcode = () => {
    resetFormdata()
    setActiveform(null)
    setShortcodeSet(null)
  }
  const goBackToShortcode = () => {
    setActiveform("shortcode")
  }
  const saveShortcode = () => {
    clearErrors()
    if (!(formdata.shortcode.shortcodes.length > 0)) {
      return setError({ shortcode: `Shortcode is required` })
    } else {
      if (
        !formdata.shortcode.shortcode_doc &&
        !formdata.shortcode.shortcode_file
      ) {
        return setError({ shortcode: `Shortcode document is required` })
      }
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
    }
    if (data.shortcodes[shortcodeSet]) {
      setData((prvState) => {
        const newState = prvState.shortcodes.map((sc, i) => {
          if (i === shortcodeSet) {
            return newPayload
          } else {
            return sc
          }
        })
        return { ...prvState, shortcodes: newState }
      })
    } else {
      setData((prvState) => {
        prvState.shortcodes.push(newPayload)
        return prvState
      })
      // data.shortcodes.push(newPayload)
    }
    resetFormdata()
    setActiveform(null)
    setShortcodeSet(null)
  }
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
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
                        <span>Edit</span>
                      </button>
                      <div
                        onClick={() => deleteShortcode(index)}
                        className="flex justify-center items-center rounded-full text-sm w-6 h-6 text-red-600 hover:text-red-600/60 bg-transparent border border-red-600 hover:border-red/60 transition ease-in-out 5000 cursor-pointer"
                      >
                        x
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={addShortcode}
                    className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
                  >
                    <span>Add shortcodes</span>
                  </button>
                </div>
              </>
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
              label="Short code document"
              value={
                formdata.shortcode.shortcode_file ??
                formdata.shortcode.shortcode_doc
              }
              onChange={handleShortcodeFormChange}
              errors={errors}
              margin="mb-6"
            />
          </FileInputWrapper>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="">
              <DatePicker
                id="shortcode_issue_date"
                label="Issue date"
                value={formdata.shortcode.shortcode_issue_date}
                onChange={handleShortcodeFormChange}
                errors={errors}
              />
            </div>
            <div className=" ">
              <DatePicker
                id="shortcode_expiry_date"
                label="Expiry date"
                value={formdata.shortcode.shortcode_expiry_date}
                onChange={handleShortcodeFormChange}
                errors={errors}
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
                  <div
                    onClick={() => {
                      removeShtcde(index)
                    }}
                    className="flex items-center cursor-pointer justify-center rounded-full text-white/80 hover:text-red-300"
                  >
                    x
                  </div>
                </span>
              ))}
          </div>
          <TextInput
            id="shtcde"
            label="Short codes"
            value={shtcde}
            onKeyUp={handleKeyUp}
            onChange={handleShortcodeChange}
            onBlur={handleKeyUp}
            errors={errors}
            margin="mb-2"
          />
          <p className="text-[12px] text-[#999999] mb-2">
            Enter multile comma-separated shortcodes and press "Enter" to apply
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelShortcode}
              className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
            >
              <span>Cancel</span>
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
            <span
              className="text-[##FFCB03] cursor-pointer"
              onClick={goBackToShortcode}
            >
              Edit
            </span>
          </p>
          <div className="flex justify-start flex-wrap gap-4 mt-4 mb-4">
            {formdata.shortcode_pricing.pricing_shortcodes?.length > 0 &&
              formdata.shortcode_pricing.pricing_shortcodes.map((sc, index) => (
                <span
                  key={`pricing-${sc}-${index}`}
                  className="flex justify-between gap-3 py-1 px-2 text-white font-bold rounded-lg border border-white/20"
                >
                  <span>{sc}</span>
                  <div
                    onClick={() => {
                      removePricingShtcde(index)
                    }}
                    className="flex items-center cursor-pointer justify-center rounded-full text-white/80 hover:text-red-300"
                  >
                    x
                  </div>
                </span>
              ))}
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="">
              <DatePicker
                id="pricing_issue_date"
                label="Issue date"
                value={formdata.shortcode_pricing.pricing_issue_date}
                onChange={handlePricingFormChange}
                errors={errors}
              />
            </div>
            <div className=" ">
              <DatePicker
                id="pricing_expiry_date"
                label="Expiry date"
                value={formdata.shortcode_pricing.pricing_expiry_date}
                onChange={handlePricingFormChange}
                errors={errors}
              />
            </div>
          </div>
          <FileInputWrapper>
            <FileInput
              id="pricing_file"
              label="Short code document"
              value={
                formdata.shortcode_pricing.pricing_file ??
                formdata.shortcode_pricing.pricing_doc
              }
              onChange={handlePricingFormChange}
              errors={errors}
              margin="mb-6"
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
            <button
              type="button"
              onClick={saveShortcode}
              className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
            >
              <span>Save shortcodes</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          {processing ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            !activeform && (
              <div className="flex items-center gap-4">
                <ButtonPrev
                  onClick={() => moveToPrevForm("shortcode")}
                  type="button"
                  label="Next"
                  outline="yes"
                  outlinecolor="border-white"
                />

                <ButtonNext onClick={handleSubmit} type="button" label="Next" />
              </div>
            )
          )}
        </div>
      </form>
    </div>
  )
}

export default Shortcode
