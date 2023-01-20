import { useState } from 'react'
import { FileUploadIcon } from '../Icons'
function MultiFileInput({ id, label, onChange, border, bg, margin, errors }) {
  const [files, setFile] = useState([])
  const [message, setMessage] = useState('')
  const handleFile = (e) => {
    setMessage('')
    let file = e.target.files

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type']
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]])
      } else {
        setMessage('only images accepted')
      }
    }
  }
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i))
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
          className={`(border ? border + ' ' : 'border-1 border-dashed ') flex gap-2 w-full  rounded-[11px] bg-[#030303] border-[#333333] py-[24px] px-[16px]`}
        >
          <input
            type="file"
            onChange={handleFile}
            className="h-full w-full opacity-0 z-10 absolute"
            multiple="multiple"
            name="files[]"
          />
          <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111]">
            <FileUploadIcon />
          </div>
          <div className="flex flex-col">
            <p className="text-white font-mtn-bold">{label}</p>
            <p className="text-[#999999]">Drag and drop or a choose file</p>
            <p className="text-[#999999]">PDF, JPG, PNG (5mb max)</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((file, key) => {
            return (
              <div
                key={key}
                className="w-full h-16 flex items-center justify-between rounded p-3 bg-white"
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
                    removeImage(file.name)
                  }}
                  className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
                >
                  <i className="mdi mdi-trash-can text-white text-[14px]"></i>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {errors && typeof errors[id] !== 'undefined' && (
        <div className="text-sm text-red-600 mt-2">{errors[id]}</div>
      )}
      {message && <div className="text-sm text-red-600 mt-2">{message}</div>}
    </div>
  )
}

export default MultiFileInput
