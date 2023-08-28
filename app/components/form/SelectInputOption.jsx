function SelectInputOption({ className, label, value}) {
  return (
    <option
      className={
        className ??
        "bg-white text-black focus:bg-[#383838] focus:text-white p-md"
      }
      value={value}
    >
      {label}
    </option>
  );
}

export default SelectInputOption;
