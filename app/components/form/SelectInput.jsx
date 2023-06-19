import FormErrors from "@/app/components/FormErrors";
function SelectInput({
  id,
  label,
  value,
  children,
  onChange,
  type,
  classes,
  fontsize,
  border,
  bg,
  margin,
  errors,
  disabled,
}) {
  return (
    <div className={margin ? margin + " " : "mb-6 "}>
      <div
        className={
          (border ? border + " " : "border-1 ") +
          (bg ? bg + " " : "bg-[#212121] ") +
          "relative z-0  w-full group  border-[#333333] rounded-[10px]"
        }
      >
        <select
          type={type ? type : "text"}
          id={id}
          name={id}
          disabled={disabled}
          className={`block pl-5 pr-4 pt-6 pb-3 form-select scrollbar scrollbar-thumb-[#212121] scrollbar-track-[#383838] w-full text-xl text-gray-200 bg-transparent placeholder-transparent rounded-lg border-0 focus:ring-mtn  peer ${
            classes ?? ""
          }]`}
          placeholder={label}
          onChange={onChange}
          style={{
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: fontsize,
          }}
          aria-label=".form-select-lg"
          value={value}
        >
          {children}
        </select>
        <label
          htmlFor={id}
          className="absolute z-10 text-lg top-0 left-5 peer-focus:top-0 text-gray-600 duration-300 transform peer-placeholder-shown:top-5"
        >
          {label}
        </label>
      </div>
      {errors && <FormErrors error={errors[id]} />}
    </div>
  );
}

export default SelectInput;
