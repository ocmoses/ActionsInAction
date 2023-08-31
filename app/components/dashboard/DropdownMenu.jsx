import { useEffect, useState } from "react";

export default function DropdownMenu({
  options,
  defaultvalue,
  onselect,
  align,
  optionwidth,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState({});
  const [optionWidth, setOptionWidth] = useState(null);
  const handleSelection = (option) => {
    setSelected(option);
    onselect(option);
    setShowMenu(false);
  };

  useEffect(() => {
    setOptionWidth(optionwidth ?? "150");
    setSelected(defaultvalue);
  }, []);
  let timeout;
  useEffect(() => {
    if (showMenu) {
      timeout = setTimeout(() => setShowMenu(false), 800);
    } else {
      timeout = clearTimeout(timeout);
    }
  }, [showMenu]);
  return (
    <div
      className={`flex flex-col  relative !overflow-x-visible w-full ${
        align === "right" ? "items-end" : "items-center"
      }`}
    >
      <div
        onClick={() => setShowMenu(true)}
        className="flex justify-between items-center w-full gap-3 text-[14px] leading-[85%] rounded-full border border-white/20 pl-4 pr-3 py-2 bg-white/90 text-black cursor-pointer"
      >
        <span>{selected?.label ?? "Select an option"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-2 h-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div
        style={{
          display: showMenu ? "block" : "none",
          width: `${optionWidth}px`,
        }}
        onMouseOver={() => clearTimeout(timeout)}
        onMouseLeave={() => setShowMenu(false)}
        className={`absolute z-50 top-0 bg-[#212121] flex flex-col border border-white/20 rounded-md max-h-[300px] grow overflow-y-auto w-full`}
      >
        {options?.length > 0 &&
          options.map((option) => (
            <span
              key={option.value}
              onClick={() => handleSelection(option)}
              className={`flex px-3 py-2 cursor-pointer ${
                selected?.value === option?.value
                  ? "text-black bg-white/70"
                  : "text-white/70 hover:text-white/80 hover:bg-white/10"
              }  text-[14px]`}
            >
              {option.label}
            </span>
          ))}
      </div>
    </div>
  );
};













export const DropdownMenu2= ({ 
  options,
  defaultvalue,
  onselect,
  align,
  optionwidth,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState({});
  const [optionWidth, setOptionWidth] = useState(null);
  const handleSelection = (option) => {
    setSelected(option);
    onselect(option);
    setShowMenu(false);
  };

  useEffect(() => {
    setOptionWidth(optionwidth ?? "150");
    setSelected(defaultvalue);
  }, []);
  let timeout;
  useEffect(() => {
    if (showMenu) {
      timeout = setTimeout(() => setShowMenu(false), 800);
    } else {
      timeout = clearTimeout(timeout);
    }
  }, [showMenu]);
  return (
    <div
      className={`flex flex-col  relative !overflow-x-visible w-full ${
        align === "right" ? "items-end" : "items-center"
      }`}
    >
      <div
        onClick={() => setShowMenu(true)}
        className="flex justify-between items-center w-[200px] gap-3 text-[14px] leading-[85%] rounded-[5px] border border-white/20 pl-4 pr-3 py-2 bg-white/20 text-white cursor-pointer"
      >
        <span>{selected?.label ?? "Select an option"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-2 h-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div
        style={{
          display: showMenu ? "block" : "none",
          width: `${optionWidth}px`,
        }}
        onMouseOver={() => clearTimeout(timeout)}
        onMouseLeave={() => setShowMenu(false)}
        className={`absolute z-50 top-0 bg-[#212121] flex flex-col border border-white/20 rounded-md max-h-[300px] grow overflow-y-auto w-full`}
      >
        {options?.length > 0 &&
          options.map((option) => (
            <span
              key={option.value}
              onClick={() => handleSelection(option)}
              className={`flex px-3 py-2 cursor-pointer ${
                selected?.value === option?.value
                  ? "text-black bg-white/70"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }  text-[14px]`}
            >
              {option.label}
            </span>
          ))}
      </div>
    </div>
  );
}