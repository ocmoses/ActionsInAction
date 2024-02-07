import GenericModal from "./GenericModal.jsx";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import { ProfileContext } from "../../(protected)/(partner)/dashboard/settings/company/profile/ProfileProvider";

export default function AddShortcodeDialogue() {
  const {
    partner,
    addShortcodeDialogue,
    setAddShortcodeDialogue,
    setAddShortcodeModal,
  } = useContext(ProfileContext);

  const { user } = useUsers();

  const [{ errors, setError, clearErrors }] = useErrors(null);

  useEffect(() => {}, []);

  return (
    addShortcodeDialogue && (
      <GenericModal
        id="add_shortcode_dialog"
        width={500}
        height={510}
        closeAction={() => {}}
      >
        <>
          <div className="flex flex-col pt-8 pb-4 relative">
            <div className="text-white text-2xl mb-4 flex-1">
              Add new short code
            </div>
            <p className="text-gray-400 text-lg max-w-[450px]">
              When you add a new shortcode, we require you to sign and updated
              contract.
            </p>
            <div
              className="absolute top-4 -right-4 cursor-pointer"
              onClick={() => setAddShortcodeDialogue(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="gray"
                className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2"
              >
                <path
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div className="my-4 flex">
            <div className="border-r border-white/20 mr-2 space-y-[72px] w-4 flex flex-col mt-2 mb-16">
              <span className="relative -right-2 w-4 h-4 rounded-full bg-yellow-600 border-1 border-white/20"></span>
              <span className="relative -right-2 w-4 h-4 rounded-full bg-yellow-600 border-1 border-white/20"></span>
              <span className="relative -right-2 w-4 h-4 rounded-full bg-yellow-600 border-1 border-white/20"></span>
            </div>
            <div className="flex-1 ml-4">
              <div className="mb-10">
                <p className="text-white/80 text-xl">Add shortcode</p>
                <span className="text-white/40 text-lg">
                  Add a new shortcode
                </span>
              </div>
              <div className="mb-10">
                <p className="text-white/80 text-xl">
                  We will review your updates
                </p>
                <span className="text-white/40 text-lg">
                  We will review your updates
                </span>
              </div>
              <div className="mb-2">
                <p className="text-white/80 text-xl">
                  We’ll send a request to sign a new contract
                </p>
                <span className="text-white/40 text-lg">
                  We’ll send a request to sign a new contract
                </span>
              </div>
            </div>
          </div>

          <div className="flex py-4 px-2 space-x-4 justify-end">
            <button
              className="ml-auto border-1 border-white/20 inline-flex  cursor-pointer text-white/80 hover:bg-white/10 p-4 py-2 rounded-full"
              onClick={() => setAddShortcodeDialogue(false)}
            >
              Cancel
            </button>
            <button
              className="ml-4  inline-flex text-white cursor-pointer bg-yellow-600 hover:bg-yellow-700 p-4 py-2 rounded-full"
              onClick={() => {
                setAddShortcodeDialogue(false);
                setAddShortcodeModal(true);
              }}
            >
              Continue
            </button>
          </div>
        </>
      </GenericModal>
    )
  );
}
