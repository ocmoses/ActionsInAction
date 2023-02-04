import { useState } from "react"

import { FileUploadIcon, InfoIcon } from "../Icons"
import FormErrors from "@/app/components/FormErrors"
import { useEffect } from "react"
function FileInput({ id, label, onChange, border, bg, margin, errors }) {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMessage(null)
    setFile(null)
  }, [])
  const handleFile = (e) => {
    setMessage(null)
    let file = e.target.files[0]
    console.log(file)
    const fileType = file["type"]
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"]
    if (validImageTypes.includes(fileType)) {
      setFile(file)
    } else {
      setFile(file)
      setMessage("Only images accepted")
    }
    onChange({ target: { id, value: file } })
  }
  const removeImage = () => {
    setFile(null)
    setMessage(null)
  }

  return (
    <div className={margin ? margin + " " : "mb-0 "}>
      <div
        className={
          (bg ? bg + " " : "bg-[#212121] ") +
          "relative p-[8px] z-0 w-full group rounded-[10px]"
        }
      >
        <div
          className={`(border ? border + ' ' : 'border-1 border-dashed ') w-full rounded-[11px] bg-[#030303] border-[#333333] py-[24px] px-[16px]`}
        >
          {!file && (
            <div
              className={`group cursor-pointer flex gap-2 justify-between w-full relative`}
            >
              <input
                type="file"
                onChange={handleFile}
                className="h-full w-full opacity-0 z-10 absolute"
                // multiple="multiple"
                name="files"
              />
              <div className="flex flex-start gap-3">
                <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                  <FileUploadIcon />
                </div>
                <div className="flex flex-col">
                  <p className="text-white font-mtn-bold">{label}</p>
                  <p className="text-[#999999]">
                    Drag and drop or a choose file
                  </p>
                  <p className="text-[#999999]">PDF, JPG, PNG (5mb max)</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-between items-end">
                <InfoIcon width={16} height={16} iconClass="" />
                <div className="rounded-full border-1 whitespace-nowrap border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-3 text-[11px] text-white">
                  Choose file
                </div>
              </div>
            </div>
          )}
          {/* <div className="flex justify-end mt-3">
            <div className="rounded-full border-1 border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-2 text-sm text-white">
              Choose file
            </div>
          </div> */}
          {file && (
            <div
              key={file}
              className="text-white w-full h-16 flex items-center justify-between rounded p-3"
            >
              <div className="flex flex-row items-center gap-2">
                <div className="h-12 w-12 ">
                  <img
                    className="w-full h-full rounded"
                    src={URL.createObjectURL(file)}
                  />
                </div>
                <span className="truncate w-44">{file.name}</span>
              </div>
              <div
                onClick={() => {
                  removeImage()
                }}
                className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
              >
                x
              </div>
            </div>
          )}
        </div>
      </div>
      {errors && <FormErrors error={errors[id]} />}
      {message && <div className="text-sm text-red-600 mt-2">{message}</div>}
    </div>
  )
}

export default FileInput
