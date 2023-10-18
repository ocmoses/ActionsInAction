import Image from "next/image";
import useProcessing from "@/hooks/useProcessing";
import useErrors from "@/hooks/useErrors";
import usePartners from "@/hooks/usePartners";
import {useState} from "react";
import  ListIcon from "../icons/ListIcon";
import FileInputWrapper from "../form/FileInputWrapper";
import FileInput from "../form/FileInput";

export default function CategoryCard({
  category,
  setIsOpen,
  setTmpCat,
  disabled,
  pendingQuestionare=true
}) {

  const [showQuestionare, setShowQuestionare] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({questionairre_doc: null});
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data);

  const handleFormChange = () => {

  }

  const handleSubmission = () => {

  }

  const selectCategory = (category) => {
    clearErrors();
    setTmpCat(category);
    setIsOpen(true);
  };
  return (
    <>
      <div
        onClick={() => (!disabled ? (pendingQuestionare ? setShowQuestionare(true) : selectCategory(category)) : {})}
        className={`flex gap-6 justify-center md:justify-start w-full max-w-[406.5px] min-h-[140px] px-6 py-4 block ${
          disabled
            ? "cursor-not-allowed bg-white/10 text-white/70"
            : "cursor-pointer text-white bg-[#111111] hover:bg-white/10 hover:shadow-2xl "
        } rounded-lg`}
      >
        <div>
          <div className="flex justify-center items-center w-[56px] h-[56px] text-[#FFCB03] rounded-full bg-white/10">
            {category.icon && (
              <Image src={category.icon} alt="" width={24} height={24} />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center md:justify-start gap-3 px-2 py-3">
          <p className="font-bold my-0">{category.category_name}</p>
          <p className="text-[#999999] my-0 text-sm">
            {category.short_description}
          </p>
        </div>
      </div>

      {      
        showQuestionare && 
        <div id="questionare_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "questionare_modal") {setShowQuestionare(false);}}}>
          <div id="actualModal" className=" pb-12 relative px-10 rounded-xl shadow-xl bg-[#131313] inline-flex flex-col w-[600px]">
            <div className="flex pt-8 pb-4 justify-center w-full">
              <ListIcon />                            
            </div>

            <div className="w-full flex flex-col justify-center items-center">
            
              <h2 className="text-2xl mb-4 text-gray-300">MTN Supplier Qualification</h2>

              <p className="text-gray-400 text-md mt-4 text-center">
                In order to confirm your readiness to join the MTN supplier program, please download and complete the MTN supplier pre-qualification questionairre
              </p>

            </div>

            <div className="flex space-x-4 mt-16 w-[500px] justify-center">
              {!uploading && 
                (<>
                  <div className="border-1 border-gray-500 rounded-xl p-4 flex flex-col items-center space-y-6">
                    <p className="text-gray-400 mt-4">Download</p>
                    <a href="#" className="font-mtn text-lg text-yellow-500 text-center underline">Download Supplier Questionairre</a>
                  </div>
                  <div className="border-1 border-gray-500 rounded-xl p-4 flex flex-col items-center space-y-6">
                    <p className="text-gray-400 mt-4">Upload</p>
                    <span onClick={() => setUploading(true)} className="font-mtn text-lg text-yellow-500 text-center underline cursor-pointer">Upload Supplier Questionairre</span>
                  </div>
                </>)
              }
              {uploading &&               
                (<>
                  <div className="w-full relative">
                    <FileInput
                      id="questionairre"
                      doc_id="questionairre_doc"
                      label="Supplier Questionairre"
                      value={data.questionairre_doc}
                      onChange={handleFormChange}
                      errors={errors}
                      disabled={false}
                    />
                    <span className="absolute -top-2 -right-2 p-1 bg-white/40 shadow rounded-full cursor-pointer" onClick={() => setUploading(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </div>
                </>)
              }
              
            </div>

            <div className="w-full justify-center">
            
              <p className="text-gray-400 text-sm mt-4 text-center">
                By clicking "Submit and continue", I agree that I have read and understood<br />
                <a href="#" className="text-white underline">MTN Supplier Code of Conduct.</a> and agree to it
              </p>

            </div>

            <div className="w-full p-4 flex justify-center">
                {
                  !uploading && 
                  <button className="bg-black rounded-full py-4 px-12" disabled>Submit and Continue</button>
                }
                {
                  uploading && 
                  <button className="bg-mtn rounded-full py-4 px-12 font-bold" onClick={() => handleSubmission()}>Submit and Continue</button>
                }
                
            </div>

          </div>
        </div>  
      }
    </>
    
  );
}
