import { useState, useEffect } from "react";

import { getFileSizeText } from "@/app/modules/utilities";

import { FileUploadIcon, FileUploadActiveIcon, InfoIcon } from "../Icons";
import useErrors from "@/hooks/useErrors";
export default function FileInputAsync({
  id,
  doc_id,
  label,
  onChange,
  allowedtypes,
  maxSize,
  maxSize,
  value,
  bg,
  margin,
  errors,
  disabled,
  disabled,
}) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [doc, setDoc] = useState(null);

  const [{ setError, removeError }] = useErrors(null);
  const resetdata = () => {
    setFile(null);
    setDoc(null);
  };
  useEffect(() => {
    setMessage(null);
    setFile(null);
    setDoc(null);
    removeError(id);
    return () => resetdata();
  }, []);
  useEffect(() => {
    if (file) {
      setDoc({
        file_name: file.name,
        file_path: null,
        file_size: file.size,
        file_size: file.size,
        file_type: file.type.split("/")[1],
      });
      onChange({ target: { id, value: file } });
    } else if (value) {
      setDoc({
        file_name: value.file_name,
        file_path: value.file_path,
        file_size: value.file_size,
        file_type: value.file_type,
      });
    } else {
      setDoc({
        file_name: null,
        file_path: null,
        file_size: null,
        file_type: null,
      });
    }
  }, [value, file]);
  const handleFile = (e) => {
    const validImageTypes = allowedtypes ?? ["application/pdf"];
    const maxFileSize = maxSize ?? 5 * 1024 * 1024;
    removeError(id);
    let file = e.target.files[0];
    const fileType = file["type"];
    const filesize = file["size"];
    const fsize = filesize / 1024 / 1024;
    const max = maxFileSize / 1024 / 1024;

    if (validImageTypes.includes(fileType)) {
      if (filesize > maxFileSize) {
        setError({
          [id]: `File size exceeds limit. Please ensure uploaded files are ${getFileSizeText(
            maxFileSize
          )} or less.`,
        });
        file = null;
      } else {
        setFile(file);
      }
    } else {
      setError({ [id]: "Only PDF files are allowed" });
      file = null;
    }
  };
  const removeImage = () => {
    if (file) {
      setFile(null);
      onChange({ target: { id, value: null } });
    } else if (doc) {
      setDoc(null);
      onChange({ target: { id: doc_id, value: null } });
    }
    removeError(id);
  };

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
            className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
          >
            <input
              type="file"
              onChange={handleFile}
              className="h-full w-full opacity-0 z-10 absolute"
              name="files"
              disabled={disabled}
              disabled={disabled}
            />
            {!doc?.file_name && (
              <>
                <div className="flex flex-start gap-3">
                  <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                    <FileUploadIcon />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-mtn-bold">{label}</p>
                    {!errors[id] && (
                      <>
                        <p className="text-[#999999]">
                          Drag and drop or choose file
                        </p>
                        <p className="text-[#999999]">PDF file (5mb max)</p>
                      </>
                    )}
                    {errors[id] && (
                      <div className="flex flex-col items-start">
                        <span className="whitespace-normal text-red-600 text-[13px]">
                          {errors ? errors[id] : message ? message : ""}
                        </span>
                      </div>
                    )}
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
            {doc?.file_name && (
              <>
                <div className="flex flex-start items-center gap-3">
                  <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                    <FileUploadActiveIcon />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-mtn-bold">{label}</p>
                    {!errors[id] && (
                      <>
                        <p className="text-[#999999] mb-0">{doc?.file_name}</p>
                        <p className="text-[#999999] mt-0">
                          {doc ? getFileSizeText(doc.file_size) : "0"}
                        </p>
                      </>
                      <>
                        <p className="text-[#999999] mb-0">{doc?.file_name}</p>
                        <p className="text-[#999999] mt-0">
                          {doc ? getFileSizeText(doc.file_size) : "0"}
                        </p>
                      </>
                    )}
                    {errors[id] && (
                      <div className="flex flex-col items-start">
                        <span className="whitespace-normal text-red-600 text-[13px]">
                          {errors ? errors[id] : message ? message : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {!errors[id]
                  ? !disabled && (
                      <div
                        onClick={() => {
                          removeImage();
                        }}
                        className="z-20 flex items-center cursor-pointer justify-center"
                      >
                        <svg
                          width="16"
                          height="21"
                          viewBox="0 0 16 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7562 3.11718H11.1731V2.4416C11.1731 1.45554 10.3709 0.65332 9.38483 0.65332H6.20566C5.2196 0.65332 4.41738 1.45554 4.41738 2.4416V3.11718H1.8343C0.846654 3.11718 0.0460205 3.91781 0.0460205 4.90546V5.50155C0.0460205 5.83076 0.312912 6.09765 0.642115 6.09765H14.9484C15.2776 6.09765 15.5445 5.83076 15.5445 5.50155V4.90546C15.5445 3.91781 14.7438 3.11718 13.7562 3.11718ZM5.60957 2.4416C5.60957 2.11292 5.87697 1.84551 6.20566 1.84551H9.38483C9.71352 1.84551 9.98092 2.11292 9.98092 2.4416V3.11718H5.60957V2.4416Z"
                            fill="#666666"
                          />
                          <path
                            d="M1.91311 18.996C1.95877 19.5439 2.20671 20.0507 2.6113 20.4229C3.01588 20.7952 3.54148 21.0002 4.09124 21.0002H11.4983C12.0481 21.0002 12.5737 20.7952 12.9782 20.4229C13.3828 20.0507 13.6308 19.5439 13.6764 18.9961L14.6519 7.29004H0.937622L1.91311 18.996ZM10.3795 17.7764L10.9756 9.82853C11.0002 9.50024 11.2863 9.25405 11.6146 9.27869C11.9429 9.30333 12.1891 9.58941 12.1645 9.9177L11.5684 17.8656C11.5437 18.1939 11.2576 18.4401 10.9294 18.4155C10.6011 18.3908 10.3549 18.1047 10.3795 17.7764ZM7.19868 9.87311C7.19868 9.54391 7.46557 9.27702 7.79477 9.27702C8.12398 9.27702 8.39087 9.54391 8.39087 9.87311V17.821C8.39087 18.1502 8.12398 18.4171 7.79477 18.4171C7.46557 18.4171 7.19868 18.1502 7.19868 17.821V9.87311ZM3.97492 9.27869C4.30321 9.25405 4.5893 9.50024 4.61393 9.82853L5.21003 17.7764C5.23467 18.1047 4.98848 18.3908 4.66019 18.4155C4.3319 18.4401 4.04582 18.1939 4.02118 17.8656L3.42508 9.9177C3.40049 9.58941 3.64663 9.30333 3.97492 9.27869Z"
                            fill="#666666"
                          />
                        </svg>
                      </div>
                    )
                  : !disabled && (
                      <div
                        onClick={() => {
                          removeError(id);
                        }}
                        className="z-20 flex items-center cursor-pointer justify-center"
                      >
                        <svg
                          width="16"
                          height="21"
                          viewBox="0 0 16 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7562 3.11718H11.1731V2.4416C11.1731 1.45554 10.3709 0.65332 9.38483 0.65332H6.20566C5.2196 0.65332 4.41738 1.45554 4.41738 2.4416V3.11718H1.8343C0.846654 3.11718 0.0460205 3.91781 0.0460205 4.90546V5.50155C0.0460205 5.83076 0.312912 6.09765 0.642115 6.09765H14.9484C15.2776 6.09765 15.5445 5.83076 15.5445 5.50155V4.90546C15.5445 3.91781 14.7438 3.11718 13.7562 3.11718ZM5.60957 2.4416C5.60957 2.11292 5.87697 1.84551 6.20566 1.84551H9.38483C9.71352 1.84551 9.98092 2.11292 9.98092 2.4416V3.11718H5.60957V2.4416Z"
                            fill="#666666"
                          />
                          <path
                            d="M1.91311 18.996C1.95877 19.5439 2.20671 20.0507 2.6113 20.4229C3.01588 20.7952 3.54148 21.0002 4.09124 21.0002H11.4983C12.0481 21.0002 12.5737 20.7952 12.9782 20.4229C13.3828 20.0507 13.6308 19.5439 13.6764 18.9961L14.6519 7.29004H0.937622L1.91311 18.996ZM10.3795 17.7764L10.9756 9.82853C11.0002 9.50024 11.2863 9.25405 11.6146 9.27869C11.9429 9.30333 12.1891 9.58941 12.1645 9.9177L11.5684 17.8656C11.5437 18.1939 11.2576 18.4401 10.9294 18.4155C10.6011 18.3908 10.3549 18.1047 10.3795 17.7764ZM7.19868 9.87311C7.19868 9.54391 7.46557 9.27702 7.79477 9.27702C8.12398 9.27702 8.39087 9.54391 8.39087 9.87311V17.821C8.39087 18.1502 8.12398 18.4171 7.79477 18.4171C7.46557 18.4171 7.19868 18.1502 7.19868 17.821V9.87311ZM3.97492 9.27869C4.30321 9.25405 4.5893 9.50024 4.61393 9.82853L5.21003 17.7764C5.23467 18.1047 4.98848 18.3908 4.66019 18.4155C4.3319 18.4401 4.04582 18.1939 4.02118 17.8656L3.42508 9.9177C3.40049 9.58941 3.64663 9.30333 3.97492 9.27869Z"
                            fill="#666666"
                          />
                        </svg>
                      </div>
                    )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
