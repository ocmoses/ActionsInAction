import { useState } from "react"

import { FileUploadIcon, FileUploadActiveIcon, InfoIcon } from "../Icons"
import FormErrors from "@/app/components/FormErrors"
import useErrors from "@/hooks/useErrors"
import { useEffect } from "react"
import Image from "next/image"
function FileInput({
  id,
  doc_id,
  label,
  onChange,
  allowedtypes,
  value,
  bg,
  margin,
  errors,
}) {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [doc, setDoc] = useState(null)

  const [{ setError, removeError }] = useErrors(null)

  useEffect(() => {
    setMessage(null)
    setFile(null)
    setDoc(null)
    removeError(id)
  }, [])

  useEffect(() => {
    if (file) {
      setDoc({
        file_name: file.name,
        file_path: null,
        file_size: Math.ceil(file.size / 1024),
        file_type: file.type.split("/")[1],
      })
      onChange({ target: { id, value: file } })
    } else if (value) {
      setDoc({
        file_name: value.file_name,
        file_path: value.file_path,
        file_size: value.file_size,
        file_type: value.file_type,
      })
    } else {
      setDoc({
        file_name: null,
        file_path: null,
        file_size: null,
        file_type: null,
      })
    }
  }, [value, file])
  console.log({ errors })
  const handleFile = (e) => {
    removeError(id)
    let file = e.target.files[0]
    console.log({ file })
    const fileType = file["type"]
    const validImageTypes = allowedtypes ?? ["application/pdf"]
    if (validImageTypes.includes(fileType)) {
      setFile(file)
    } else {
      setError({ [id]: "Only PDF accepted" })
      console.log("Error")
      file = null
    }
  }
  const removeImage = () => {
    if (file) {
      setFile(null)
      onChange({ target: { id, value: null } })
    } else if (doc) {
      setDoc(null)
      onChange({ target: { id: doc_id, value: null } })
    }
    removeError(id)
  }

  return (
    <div className={margin ? margin + " " : "mb-0 relative"}>
      <div
        className={
          (bg ? bg + " " : "bg-[#212121] ") +
          "relative p-[8px] z-0 w-full group rounded-[10px]"
        }
      >
        <div
          className={`(border ? border + ' ' : 'border-1 border-dashed ') w-full rounded-[11px] bg-[#030303] border-[#333333] py-[24px] px-[16px]`}
        >
          <div
            className={`group cursor-pointer flex gap-2 justify-between w-full relative`}
          >
            <input
              type="file"
              onChange={handleFile}
              className="h-full w-full opacity-0 z-10 absolute"
              name="files"
            />
            {!doc?.file_name && (
              <>
                <div className="flex flex-start gap-3">
                  <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                    <FileUploadIcon />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-mtn-bold">{label}</p>
                    {!errors[id] && (
                      <p className="text-[#999999]">
                        Drag and drop or a choose file
                      </p>
                    )}
                    {errors[id] && (
                      <div className="flex flex-col items-start">
                        <span className="truncate overflow-hidden text-red-600 text-[13px]">
                          {errors ? errors[id] : message ? message : ""}
                        </span>
                      </div>
                    )}
                    <p className="text-[#999999]">PDF file (5mb max)</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 justify-between items-end">
                  <InfoIcon width={16} height={16} iconClass="" />
                  <div className="rounded-full border-1 whitespace-nowrap border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-3 text-[11px] text-white">
                    Choose file
                  </div>
                </div>
              </>
            )}
            {doc?.file_name && (
              <>
                <div className="flex flex-start items-center gap-3">
                  <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                    <FileUploadActiveIcon />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-mtn-bold">{label}</p>
                    {!errors[id] && (
                      <p className="text-[#999999]">{doc?.file_name}</p>
                    )}
                    {errors[id] && (
                      <div className="flex flex-col items-start">
                        <span className="truncate overflow-hidden text-red-600 text-[13px]">
                          {errors ? errors[id] : message ? message : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileInput
