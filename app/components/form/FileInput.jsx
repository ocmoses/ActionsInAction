import { useState } from "react"

import { FileUploadIcon, InfoIcon } from "../Icons"
import FormErrors from "@/app/components/FormErrors"
import { useEffect } from "react"
import Image from "next/image"
function FileInput({
  id,
  label,
  onChange,
  allowedtypes,
  value,
  border,
  bg,
  margin,
  errors,
}) {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    setMessage(null)
    setFile(null)
    setDoc(null)
  }, [])

  useEffect(() => {
    setDoc(value)
  }, [value])

  const handleFile = (e) => {
    setMessage(null)
    let file = e.target.files[0]
    // console.log(file)
    const fileType = file["type"]
    const validImageTypes = allowedtypes ?? ["application/pdf"]
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
    setFile(null)
    setMessage(null)
    setDoc(null)
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
          <div
            className={`group cursor-pointer flex gap-2 justify-between w-full relative`}
          >
            <input
              type="file"
              onChange={handleFile}
              className="h-full w-full opacity-0 z-10 absolute"
              name="files"
            />
            {!file && !doc?.file_name && (
              <>
                <div className="flex flex-start gap-3">
                  <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                    <FileUploadIcon />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-mtn-bold">{label}</p>
                    <p className="text-[#999999]">
                      Drag and drop or a choose file
                    </p>
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

            {file && (
              <div className="text-white w-full h-16 flex items-center justify-between rounded p-3">
                <div className="flex flex-row items-start gap-2">
                  <div className="h-12 w-12 ">
                    <Image
                      src={`/assets/icons/files-icons/doc.png`}
                      width={512}
                      height={512}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="truncate">{file.name}</span>
                    <div className="flex flex-row gap-4 justify-start">
                      <span className="text-[12px]">
                        TYPE: {file.type.split("/")[1]}
                      </span>
                      <span className="text-[12px]">
                        SIZE: {Math.ceil(file.size / 1024)}kb
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    removeImage()
                  }}
                  className="h-6 w-6 bg-red-400 z-20 flex items-center cursor-pointer justify-center rounded-full hover:bg-red-600"
                >
                  x
                </div>
              </div>
            )}
            {!file && doc?.file_name && (
              <div className="text-white w-full h-16 flex items-center justify-between rounded p-3">
                <div className="flex flex-row items-start gap-2">
                  <div className="h-12 w-12 ">
                    {
                      <Image
                        src={`/assets/icons/files-icons/doc.png`}
                        width={512}
                        height={512}
                        alt=""
                      />
                    }
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="truncate">{doc?.file_name}</span>
                    <div className="flex flex-row gap-4 justify-start">
                      <span className="text-[12px]">
                        TYPE: {doc?.file_type}
                      </span>
                      <span className="text-[12px]">
                        SIZE: {Math.ceil(doc?.file_size / 1024)}kb
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    removeImage()
                  }}
                  className="h-6 w-6 bg-red-400 z-20 flex items-center cursor-pointer justify-center rounded-full hover:bg-red-600"
                >
                  x
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {errors && <FormErrors error={errors[id]} />}
      {message && <div className="text-sm text-red-600 mt-2">{message}</div>}
    </div>
  )
}

export default FileInput
