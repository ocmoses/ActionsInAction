import FormErrors from '@/app/components/FormErrors'
function SelectInput({
  id,
  label,
  value,
  children,
  onChange,
  type,
  border,
  bg,
  margin,
  errors
}) {
  return (
    <div className={margin ? margin + ' ' : 'mb-6 '}>
      <div
        className={
          (border ? border + ' ' : 'border-1 ') +
          (bg ? bg + ' ' : 'bg-[#212121] ') +
          'relative px-3 py-3 pb-2 z-0  w-full group  border-[#333333] rounded-[10px]'
        }
      >
        <select
          type={type ? type : 'text'}
          id={id}
          name={id}
          className="block px-3 form-select scrollbar scrollbar-thumb-[#212121] scrollbar-track-[#383838] py-3 pb-2 w-full text-xl text-gray-200 bg-transparent placeholder-transparent rounded-lg border-0 focus:outline-none focus:ring-0  peer"
          placeholder={label}
          onChange={onChange}
          style={{
            fontStyle: 'normal',
            fontWeight: 400
          }}
          aria-label=".form-select-lg"
          value={value}
        >
          {children}
        </select>
        <label
          htmlFor={id}
          className="absolute z-10 text-lg top-0 left-6 peer-focus:top-0 text-gray-600 duration-300 transform peer-placeholder-shown:top-5"
        >
          {label} {value}
        </label>
      </div>
      {errors && <FormErrors error={errors[id]} />}
    </div>
  )
}

export default SelectInput
