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

export default function PopUp({ closePopUp, submitForm, partnerName, partnerEmail, token }) {
  ////////////////////////////////////fetch subject to the select field//////////////////////////////
  const [getSubjects, setGetSubjects] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sendAction, setSendAction] = useState(false);

  const [formData, setFormData] = useState({
    contact_type: "logged_in_partner",
    name: partnerName,
    email: partnerEmail,
    subject: "I want to request a feature",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setFetching(true);
        const response = await axios.get(
          RemoteEndpoints.PORTAL_PARTNER_CONTACT_SUBJECTS,
          {
            headers: {
              apikey: apikey,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log("this is my response", response);
        setGetSubjects(response.data.data);
        setFetching(false);
      } catch (error) {
        setFetching(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subject = formData.subject;
    const message = formData.message;
    try {
      clearError();
      if (subject === "") {
        setErrorMessage("Subject Error: Check the field to continue");
      } else if (message === "") {
        setErrorMessage("Message Error: Check the field to continue");
      } else {
        setSendAction(true);
        const response = await axios.post(
          RemoteEndpoints.PARTNER_PORTAL_CONTACT_MAIL,
          formData,
          {
            headers: {
              apikey: apikey,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        submitForm();
        console.log(response);
      }
    } catch (err) {
      setSendAction(false);
      setErrorMessage("There is an error on the try");
      console.log(setErrorMessage, err);
    }
  };
  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <section id="contact_form">
      <button
        className="h-30 w-30 rounded-full bg-white/10 py-3 px-5 float-right mt-[-10px] hover:bg-white/20"
        title="Close"
        onClick={closePopUp}
      >
        X
      </button>

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
        
        <SelectInput
          id="subject"
          label="Choose A Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        >
          {fetching && (
            <SelectInputOption value="" label="Fetching Subjects..." />
          )}
          {!fetching &&
            getSubjects?.length > 0 &&
            getSubjects.map((eachSubject) => (
              <SelectInputOption
                key={eachSubject.subject}
                value={eachSubject.subject}
                label={eachSubject.subject}
              />
            ))}
        </SelectInput>

        <p className="text-white pb-3">What problems are you facing?</p>
        <TextAreaInput
          id="message"
          label="Help me with..."
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm font-italic">{errorMessage}</p>
        )}
        <div className="flex gap-2 justify-end">
          <button
            className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
            onClick={closePopUp}
          >
            Cancel
          </button>

          {sendAction ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            <button
              className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
