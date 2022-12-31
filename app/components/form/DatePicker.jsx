import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function FileInput({ id, label, onChange, border, bg, margin, errors }) {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const [startDate, setStartDate] = useState()

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
    <div className={margin ? margin + ' ' : 'mb-6 '}>
      <div
        className={
          (border ? border + ' ' : 'border-1 ') +
          (bg ? bg + ' ' : 'bg-[#212121] ') +
          'relative px-3 py-3 pb-2 w-full group  border-[#333333] rounded-[10px]'
        }
      >
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="block px-3 py-3 pb-2 w-full text-xl text-gray-200 bg-transparent placeholder-transparent rounded-lg border-0 focus:outline-none focus:ring-0 peer z-50"
          placeholderText={label}
        />
        <label
          htmlFor={id}
          className="absolute text-lg top-0 left-6 peer-focus:top-0 text-gray-600 duration-300 transform peer-placeholder-shown:top-5"
        >
          {label}
        </label>
      </div>
      {errors && id && typeof errors[id] !== 'undefined' && (
        <div className="text-sm text-red-600 mt-2">{errors[id]}</div>
      )}
    </div>
  )
}

export default FileInput
