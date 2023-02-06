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
  const [shortcodes, setShortCodes] = useState([])
  const [shtcde, setShtcde] = useState("")
  const [shortcodeSet, setShortcodeSet] = useState(0)
  const [activeform, setActiveform] = useState("shortcode")

  const { title, subtitle, hand, required } = forms["shortcode"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)

  useEffect(() => {
    setForm("shortcode")
    setProcessing(false)
    setShortcodeSet(0)
    setActiveform("shortcode")
  }, [])
  useEffect(() => {
    // {
    //   partner_uuid: category?.partner_uuid ?? "",
    //   category_uuid: category?.category_uuid ?? "",
    //   category_shortcodes: [
    //     // ARRAY OF OBJECT
    //     {
    //       shortcode: {
    //         shortcodes: [], // ARRAY OR STRING
    //         shortcode_doc: null, //FILE
    //         shortcode_file: null, //FILE
    //         shortcode_issue_date: "", //DATE
    //         shortcode_expiry_date: "", //DATE
    //       },
    //       shortcode_pricing: {
    //         pricing_shortcodes: [], // ARRAY OR STRING
    //         pricing_doc: null,
    //         pricing_file: null,
    //         pricing_issue_date: "", //DATE
    //         pricing_expiry_date: "", //DATE
    //       },
    //     },
    //   ],
    // }
    if (category)
      setData({
        partner_uuid: category?.partner_uuid ?? "",
        category_uuid: category?.category_uuid ?? "",
        shortcodes: category?.shortcodes ?? "",
      })
  }, [category])

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    let error = false
    if (!Util.isEmpty(required)) {
      for (const field in required) {
        if (!!!data[field]) {
          error = true
          setError(field, `${required[field]} is required`)
        }
      }
      if (error) return
    }
    const result = await registerPartner("shortcode", data)
    console.log({ result })
    if (result) {
      if (result?.error) return setError({ shortcode: result.error })
    }
    moveToNextForm(["shortcode"])
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const handleDateChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const formShortcodeArray = (shtcd) => {
    const input = shtcd
      ?.replaceAll(";", " ")
      .replaceAll(",", " ")
      .replaceAll(".", " ")
    if (!input) return null
    const inputArray = input.split(" ")
    if (!inputArray.length) return null
    const string = []
    for (let i = 0; i < inputArray.length; i++) {
      if (!(!inputArray[i].trim() || /^\s*$/.test(inputArray[i].trim())))
        string.push(inputArray[i].trim())
    }
    return string.filter((str) => str !== "undefined")
  }

  const handleKeyUp = (e) => {
    const content = []
    if (e.key === " " || e.key === "Enter") {
      console.log(shtcde)
      let cnt = formShortcodeArray(shtcde)
      if (cnt.length > 0) content.push(cnt)
    }
    if (content.length > 0) {
      setShortCodes((oldState) => [...oldState, ...content])
      setShtcde("")
    }
  }

  const handleShortcodeChange = (e) => {
    // console.log("value", e.target.value)
    setShtcde(e.target.value)
  }
  const removeShtcde = (index) => {
    console.log(index)
    const newArray = shortcodes.filter((sc, i) => i !== index)
    setShortCodes(newArray)
  }
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["shortcode"]} />}
        </div>
        {data?.category_shortcodes?.length > 0 && (
          <>
            <div className="flex justify-start flex-wrap gap-4 mt-4 mb-4">
              {shortcodes?.length > 0 &&
                shortcodes.map((sc, index) => (
                  <span className="flex justify-between gap-3 py-1 px-2 text-white font-bold rounded-lg border border-white/20">
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
          </>
        )}
        {activeform === "shortcode" && (
          <div id="shortcodeform" className="w3-animate-opacity">
            <FileInputWrapper>
              <FileInput
                id="shortcode_doc"
                label="Short code document"
                value={data.shortcode_doc}
                onChange={handleFormChange}
                errors={errors}
                margin="mb-6"
              />
            </FileInputWrapper>
            <div className="md:grid md:grid-cols-2 md:gap-4">
              <div className="">
                <DatePicker
                  id="shortcode_issue_date"
                  label="Issue date"
                  value={data.shortcode_issue_date}
                  onChange={handleDateChange}
                  errors={errors}
                />
              </div>
              <div className=" ">
                <DatePicker
                  id="shortcode_expiry_date"
                  label="Expiry date"
                  value={data.shortcode_expiry_date}
                  onChange={handleDateChange}
                  errors={errors}
                />
              </div>
            </div>
            <p className="mb-0 text-[#999999]">Enter applicable short codes</p>
            <div className="flex justify-start flex-wrap gap-4 mt-4 mb-4">
              {shortcodes?.length > 0 &&
                shortcodes.map((sc, index) => (
                  <span className="flex justify-between gap-3 py-1 px-2 text-white font-bold rounded-lg border border-white/20">
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
              Enter multile comma-separated shortcodes and press "Enter" to
              apply
            </p>
            <div className="mt-3 flex justify-end">
              <button
                className={`rounded-full text-sm px-4 py-1 flex justify-between items-center text-white bg-transparent border border-white hover:border-white/60 transition ease-in-out 5000`}
              >
                <span>Next</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          {processing ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            <div className="flex items-center gap-4">
              <ButtonPrev
                onClick={() => moveToPrevForm("shortcode")}
                type="button"
                label="Next"
                outline="yes"
                outlinecolor="border-white"
              />
              <ButtonNext type="submit" label="Next" />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Shortcode
