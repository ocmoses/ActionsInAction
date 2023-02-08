import { useState } from "react"

import { FileUploadIcon, InfoIcon } from "../Icons"
import FormErrors from "@/app/components/FormErrors"
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

  useEffect(() => {
    setMessage(null)
    setFile(null)
    setDoc(null)
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
  const handleFile = (e) => {
    setMessage(null)
    let file = e.target.files[0]
    const fileType = file["type"]
    const validImageTypes = allowedtypes ?? ["application/pdf"]
    if (validImageTypes.includes(fileType)) {
      setFile(file)
    } else {
      setMessage("Only PDF accepted")
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
    setMessage(null)
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

            {/* {file && (
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
            )} */}
            {doc?.file_name && (
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
                        SIZE: {doc?.file_size}kb
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
      {errors && (
        <div className="pl-4 pb-2">
          <FormErrors error={errors[id]} />
        </div>
      )}
      {message && (
        <div className="pl-4 pb-2 flex justify-start items-center gap-4 text-sm text-red-600">
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <div>{message}</div>
        </div>
      )}
    </div>
  )
}

export default FileInput
