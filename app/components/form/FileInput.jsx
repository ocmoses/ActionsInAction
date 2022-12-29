import { useState } from 'react'
import { FileUploadIcon } from '../HeroIcons'
function FileInput({ id, label, onChange, border, bg, margin, errors }) {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const handleFile = (e) => {
    setMessage('')
    let file = e.target.files[0]
    console.log(file)
    const fileType = file['type']
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
    if (validImageTypes.includes(fileType)) {
      setFile(file)
    } else {
      setMessage('Only images accepted')
    }
  }
  const removeImage = () => {
    setFile(null)
  }

  return (
    <div className={margin ? margin + ' ' : 'mb-0 '}>
      <div
        className={
          (bg ? bg + ' ' : 'bg-[#212121] ') +
          'relative p-[8px] z-0 w-full group rounded-[10px]'
        }
      >
        <div
          className={`(border ? border + ' ' : 'border-1 border-dashed ') py-[24px] px-[16px] w-full rounded-[11px] bg-[#030303] border-[#333333] py-[24px] px-[16px]`}
        >
          <div className={`flex gap-2 w-full relative`}>
            <input
              type="file"
              onChange={handleFile}
              className="h-full w-full opacity-0 z-10 absolute"
              multiple="multiple"
              name="files"
            />
            <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
              <FileUploadIcon />
            </div>
            <div className="flex flex-col">
              <p className="text-white font-mtn-bold">{label}</p>
              <p className="text-[#999999]">Drag and drop or a choose file</p>
              <p className="text-[#999999]">PDF, JPG, PNG (5mb max)</p>
            </div>
          </div>
        </div>
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
      {errors && typeof errors[id] !== 'undefined' && (
        <div className="text-sm text-red-600 mt-2">{errors[id]}</div>
      )}
      {message && <div className="text-sm text-red-600 mt-2">{message}</div>}
    </div>
  )
}

export default FileInput
