"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import FileInputWrapper from "@/app/components/form/FileInputWrapper";
import { getFileSizeText } from "@/app/modules/utilities";
import {
  FileUploadIcon,
  FileUploadActiveIcon,
  InfoIcon,
} from "@/app/components/Icons";

export default function BrdUpdates({ closePopUp, submitBrd }) {
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState(null);
  const [errorMessage, seteErrorMessage] = useState("");

  useEffect(() => {
    setFile(null);
    setDoc(null);
  }, []);

  const handleFile = (e) => {
    const validImageTypes = ["application/pdf"];
    let file = e.target.files[0];
    const fileType = file["type"];
    const filesize = file["size"];

    if (validImageTypes.includes(fileType)) {
      setDoc({
        file_name: file.name,
        file_size: file.size,
      });
      setFile(file);
      seteErrorMessage("");
    } else {
      setDoc({
        file_name: null,
        file_size: null,
      });
      setFile(null);
      seteErrorMessage("Only PDF files are allowed");
    }
  };

  return (
    <section id="brd_updates">
      <h2 className="text-white font-mtn-bold text-2xl mb-4">
        Upload Document
      </h2>
      <FileInputWrapper>
        <div className="p-[8px] w-full rounded-[10px]">
          <label>
            <div className="border-1 border-dashed  border-[#333333] w-full rounded-[11px] bg-[#030303] py-[24px] px-[16px]">
              <input
                type="file"
                onChange={handleFile}
                className="hidden"
                name="files"
                accept=".pdf,.PDF"
              />

              {!doc?.file_name && (
                <div
                  className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                >
                  <div className="flex flex-row gap-3">
                    <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                      <FileUploadIcon />
                    </div>

                    <div className="text-[#999999]">
                      <p>
                        Upload <br />
                        <span className="text-white font-mtn-bold">
                          Company Board Resolution
                        </span>
                        <br />
                        Drag and drop here or
                      </p>
                      {errorMessage && (
                        <p className="text-red-500 text-sm font-italic">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 justify-between items-end">
                    <InfoIcon width={16} height={16} iconClass="" />
                    <div className="rounded-full border-1 whitespace-nowrap border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-3 text-[11px] text-white">
                      Choose file
                    </div>
                  </div>
                </div>
              )}
              {doc?.file_name && (
                <div
                  className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                >
                  <div className="flex flex-row gap-3">
                    <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                      <FileUploadActiveIcon />
                    </div>

                    <div className="flex text-[#999999]">
                      <p>
                        Upload <br />
                        <span className="text-white font-mtn-bold">
                          {doc?.file_name}
                        </span>
                        <br />
                        {doc ? getFileSizeText(doc.file_size) : "0"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 justify-between items-end">
                    <InfoIcon width={16} height={16} iconClass="" />
                    <div className="rounded-full border-1 whitespace-nowrap border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-3 text-[11px] text-white">
                      Choose file
                    </div>
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
      </FileInputWrapper>

      <div className="flex gap-2 justify-end mt-4">
        <button
          className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Back
        </button>
        <button className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
        onClick={submitBrd}>
          Add
        </button>
      </div>
    </section>
  );
}
