"use client";
import Link from "next/link";
import { useState } from "react";
import { PageRoutes } from "@/app/modules/menu";
import TextInput from "@/app/components/form/TextInput";
import SelectInput from "@/app/components/form/SelectInput";
import TextAreaInput from "@/app/components/form/TextAreaInput";

export default function PopUp({ closePopUp, children }) {
  return (
    <div
      id="modal_flyout"
      className="w-screen flex justify-center items-center h-screen fixed z-50 top-0 left-0 bg-black/80"
      onClick={(e) => {
        e.target.id == "modal_flyout" && closePopUp();
      }}
    >
      <div
        id="actualModal"
        className="border-2 border-gray-500 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[550px]"
      >
        <div className="py-8 px-8">
          <button
            className="h-30 w-30 rounded-full bg-white/10 py-3 px-5 float-right mt-[-10px] hover:bg-white/20"
            title="Close"
            onClick={closePopUp}
          >
            X
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}

export const ContactUsForm = ({ closePopUp }) => {
  return (
    <section id="contact_form">
      <h2 className="text-white font-mtn-bold text-2xl mb-4">Contact Us</h2>
      <p>
        Let us know what problem you are facing. If you have general questions ,
        check out our &nbsp;
        <Link
          href={PageRoutes.faq}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mtn-300 underline"
        >
          FAQs
        </Link>
        &nbsp; where you might find the answer you're after even quicker.
      </p>

      <div className="pt-5">
        <div className="flex space-x-2">
          <TextInput id="name" label="Name" type="text" />
          <TextInput id="email" label="Email" type="email" />
        </div>
        <SelectInput id="subjectid" label="Select Subject"></SelectInput>
        <TextAreaInput id="message" label="Message" type="text" />
        <div className="flex gap-2 justify-end">
          <button
            className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
            onClick={closePopUp}
          >
            Cancel
          </button>
          <button className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};
