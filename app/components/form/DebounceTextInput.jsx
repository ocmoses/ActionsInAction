"use client";
import { useState } from "react";
import { EyeOpenIcon, EyeCloseIcon } from "../Icons";
import { DebounceInput } from "react-debounce-input";
import FormErrors from "@/app/components/FormErrors";
export default function TextInput({
  id,
  label,
  value,
  onChange,
  onKeyUp,
  onBlur,
  type,
  border,
  bg,
  margin,
  errors,
}) {
  const [Type, setType] = useState(type ?? "text");

  const TogglePassword = () => {
    setType((oldState) => (oldState === "text" ? "password" : "text"));
  };
  return (
    <div className={margin ? margin + " " : "mb-6 "}>
      <div
        className={
          (border ? border + " " : "border-1 ") +
          (bg ? bg + " " : "bg-[#212121] ") +
          "relative px-3 py-3 pb-2 z-0  w-full group  border-[#333333] rounded-[10px]"
        }
      >
        <DebounceInput
          minLength={10}
          debounceTimeout={2000}
          type={Type}
          id={id}
          name={id}
          value={value}
          className="block px-3 py-3 pb-2 w-full text-xl text-gray-200 bg-transparent autofill:!bg-inherit active:!bg-transparent placeholder-transparent rounded-lg border-0 focus:outline-none focus:ring-0  peer"
          placeholder={label}
          autoComplete="new-password"
          onChange={onChange}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          style={{
            fontStyle: "normal",
            fontWeight: 400,
          }}
        />
        <label
          htmlFor={id}
          className="absolute text-lg top-0 left-6 peer-focus:top-0 text-gray-600 duration-300 transform peer-placeholder-shown:top-5"
        >
          {label}
        </label>
        {type && type.toLowerCase() === "password" && (
          <div
            onClick={TogglePassword}
            className="flex justify-center items-center cursor-pointer absolute top-0 right-0 bottom-0 text-white/50 mr-4"
          >
            {Type === "password" ? (
              <EyeCloseIcon iconClass="w-[24px] h-[20px]" />
            ) : (
              <EyeOpenIcon iconClass="w-[24px] h-[20px]" />
            )}
          </div>
        )}
      </div>
      {errors && <FormErrors error={errors[id]} />}
    </div>
  );
}
