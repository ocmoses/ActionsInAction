import { useEffect } from "react"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { inputDate } from "@/app/modules/utilities"
import FormErrors from "@/app/components/FormErrors"

function FileInput({
  id,
  label,
  value,
  onChange,
  border,
  bg,
  margin,
  errors,
  min,
  max,
}) {
  const [startDate, setStartDate] = useState()

  useEffect(() => {
    setStartDate(value ? new Date(value) : "")
  }, [value])

  const handleDateChange = (date) => {
    setStartDate(date)
    onChange({ target: { id, value: inputDate(date) } })
  }
  return (
    <div className={margin ? margin + " " : "mb-6 "}>
      <div
        className={
          (border ? border + " " : "border-1 ") +
          (bg ? bg + " " : "bg-[#212121] ") +
          "relative w-full group  border-[#333333] rounded-[10px]"
        }
      >
        <DatePicker
          showIcon
          selected={startDate}
          onChange={(date) => handleDateChange(date)}
          maxDate={max}
          minDate={min}
          className="block pl-5 pr-4 pt-6 pb-3 w-full text-xl text-gray-200 bg-transparent placeholder-transparent rounded-lg border-0 focus:outline-none focus:ring-mtn peer z-50"
          placeholderText={label}
          dateFormat="dd/MM/yyyy"
          peekNextMonth
          showYearDropdown
          showMonthDropdown
          // dropdownMode="select"
          dateFormatCalendar="MMMM"
          yearDropdownItemNumber={10}
          scrollableYearDropdown
          tabIndex={9999999}
          fixedHeight
        />
        <label
          htmlFor={id}
          className="absolute text-lg top-0 left-5 peer-focus:top-0 text-gray-600 duration-300 transform peer-placeholder-shown:top-5"
        >
          {label}
        </label>
        <div className="flex justify-center items-center absolute top-0 right-0 bottom-0 text-white/50 mr-4 z-10">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </div>
      </div>
      {errors && <FormErrors error={errors[id]} />}
    </div>
  )
}

export default FileInput
