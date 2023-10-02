"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PageRoutes } from "@/app/modules/menu";
import TextInput from "@/app/components/form/TextInput";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";
import TextAreaInput from "@/app/components/form/TextAreaInput";
import RemoteEndpoints from "@/app/modules/endpoints";
import { apikey } from "@/app/modules/constants";
import axios from "axios";
import { TailSpinPreloader } from "@/app/components/Icons";

import FileInput from "@/app/components/form/FileInput";
import FileInputWrapper from "@/app/components/form/FileInputWrapper";
import {
  FileUploadIcon,
  FileUploadActiveIcon,
  InfoIcon,
} from "@/app/components/Icons";

export default function BrdUpdates({ closePopUp }) {
  return (
    <section id="brd_updates">
      <h2 className="text-white font-mtn-bold text-2xl mb-4">
        Upload Document
      </h2>
      <FileInputWrapper>
        <div className="p-[8px] w-full rounded-[10px]">
          <div className="border-1 border-dashed  border-[#333333] w-full rounded-[11px] bg-[#030303] py-[24px] px-[16px]">
            <div
              className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
            >
              <div className="flex flex-row gap-3">
                <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                  <FileUploadIcon />
                </div>

                <div className="flex text-[#999999]">
                <p>
                  Upload <br />
                  <span className="text-white font-mtn-bold">Company Board Resolution</span><br />
                  Drag and drop here or
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
          </div>
        </div>
      </FileInputWrapper>

      <div className="flex gap-2 justify-end mt-4">
          <button
            className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
            onClick={closePopUp}
          >
            Back
          </button>

       
            <button className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full" >
              Add
            </button>
        
        </div>
    </section>
  );
}
