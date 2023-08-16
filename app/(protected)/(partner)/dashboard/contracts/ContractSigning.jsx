"use client"

import {useState, useRef, useEffect, useCallback} from "react";
import TextInput from "@/app/components/form/TextInput";
import useErrors from "@/hooks/useErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useRouter } from "next/navigation";
import usePartners from "@/hooks/usePartners";

import FormErrors from "@/app/components/FormErrors";



export default function ContractSigning(){

    const {
        partner,
        signBilateralContract
      } = usePartners();
    const [{ errors, setError, clearErrors }] = useErrors(null);
    const router = useRouter();
    const [submitingContractSignatures, setSubmitingContractSignatures] = useState(false);
    const [signingModal, setSigningModal] = useState(false);
    const [signing, setSigning] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [activeSigningTab, setActiveSigningTab] = useState({selectStyle: true, upload:false});
    const [disableActiveButton, setDisableActiveButton] = useState(true);
    const [data, setData] = useState({partner_uuid: partner.uuid, contract_type: "Bilateral VAS", 
                                        company_name: partner.company_name, click_wrap: "yes", signatory: "", signature: ""});
  
    const [clearCanvas, setClearCanvas] = useState(false);

    const canvas = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [position, setPosition] = useState(null);
    const [canvasWidth, canvasHeight] = [300, 100];

    

    const onDown = useCallback((event) => {
        
        const coordinates = getCoordinates(event)
        if (coordinates) {
          setPosition(coordinates)
          setDrawing(true)
        }
      }, [])
    
      const onUp = useCallback(() => {
        setDrawing(false)
        setPosition(null)
      }, [])
    
      const getCoordinates = (event) => {
        if (!canvas.current) {
          return null
        }
    
        const x = event.pageX || event.touches[0].pageX
        const y = event.pageY || event.touches[0].pageY
    
        return {
          x: x - canvas.current.offsetLeft,
          y: y - canvas.current.offsetTop
        }
      }
    
      const onMove = useCallback(
        (event) => {
          if (drawing) {
            const newPosition = getCoordinates(event)
            if (position && newPosition) {
              drawLine(position, newPosition)
              setPosition(newPosition)
            }
          }
        },
        [drawing, position]
      )
    
      const drawLine = (originalPosition, newPosition) => {
        if (!canvas.current) {
          return null
        }
    
        const context = canvas.current.getContext('2d')
    
        if (context) {
          context.strokeStyle = 'white'
          context.lineJoin = 'round'
          context.lineWidth = 3
    
          context.beginPath()
          context.moveTo(originalPosition.x, originalPosition.y)
          context.lineTo(newPosition.x, newPosition.y)
          context.closePath()
    
          context.stroke()
        //   handleDraw(context.getImageData(0, 0, width, height))
        }
      }
    
    const imageBase64 = ()  => {
      const newCanvas = canvas.current;//.getElementById('signature_canvas');
      return newCanvas.toDataURL("image/png");
    }

      const clear = (context) => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
      }

    let sign_bilateral_contract_response = null;

    

    const signContract = () => {
        //
        if(activeSigningTab.selectStyle){
            //convert canvas content to base64            
            setData({...data, signature:imageBase64()});
        }

        console.log('data', data);

        sign_bilateral_contract(data);

        //sign contract

    }

    const sign_bilateral_contract = async (data) => {
        if (signing) return;
        setSigning(true);
        sign_bilateral_contract_response = await signBilateralContract(data);
        setSigning(false);
        // console.log('sign_bilateral_contract_response', sign_bilateral_contract_response);
        if (sign_bilateral_contract_response.error) setError({ error: sign_bilateral_contract_response.error })
        else {
            // console.log('partner_select_service_response', partner_select_service_response);
            // setContractModal(false); 
            setSigningModal(false);
            //Do some stuff
    
        }
    };

    const convertFile = (e) => {
        // Get a reference to the file
        const file = e.target.files[0];

        // Encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = () => {
            // Use a regex to remove data url part
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');

            // console.log('base64String', base64String);
            setData({...data, signature:base64String});
            // Logs wL2dvYWwgbW9yZ...
        };
        reader.readAsDataURL(file);
    };

    const showDirectorSigning = () => {
        setData({...data, "signatory": "director"}); 
        setSigningModal(true), 
        window.scrollTo({top:0, behavior: "smooth"});
    }

    useEffect(() => {
        if (canvas.current) {
            const context = canvas.current.getContext('2d');

            clear(context);

            // context.fillStyle = 'pink';
            // context.fillRect(0,0, 20, 30);
            
          }
        //
    }, [signingModal, clearCanvas]);
    

    return <>
                <div className="flex flex-col justify-center items-center pt-8">
                    
                    <div className="p-8 max-w-4xl border-1 border-gray-500 rounded-xl shadow-xl text-gray-300 text-xl mb-8">
                        <p>
                            Rights of parties to a contract are the rights that are guaranteed through a legally valid contract to the parties that have made the agreement. Such rights can be written; for example, the exclusive rights to copyrighted content. Rights can also be implied; for example, each party has a right to a fair and transparent disclosure of the contract material itself.
                        </p>
                        <p>
                            Contract rights exist on each side of the contract, but will most likely look different depending on the content of the contract. Each agreement will naturally involve a different set of rights than another agreement. One party might have the right to purchase a service, while the other party might have the right to provide a service to that party. Contract rights are related to (but different than) contract duties, which are the obligations to perform that each party has under the terms of the agreement.
                        </p>
                        <p>
                            Rights of parties to a contract are the rights that are guaranteed through a legally valid contract to the parties that have made the agreement. Such rights can be written; for example, the exclusive rights to copyrighted content. Rights can also be implied; for example, each party has a right to a fair and transparent disclosure of the contract material itself.
                        </p>
                        <p>
                            Contract rights exist on each side of the contract, but will most likely look different depending on the content of the contract. Each agreement will naturally involve a different set of rights than another agreement. One party might have the right to purchase a service, while the other party might have the right to provide a service to that party. Contract rights are related to (but different than) contract duties, which are the obligations to perform that each party has under the terms of the agreement.
                        </p>
                    </div>

                    <div className="p-8 max-w-4xl border-1 border-gray-500 rounded-xl shadow-xl text-gray-300 text-xl mb-8">
                        <p>
                            Rights of parties to a contract are the rights that are guaranteed through a legally valid contract to the parties that have made the agreement. Such rights can be written; for example, the exclusive rights to copyrighted content. Rights can also be implied; for example, each party has a right to a fair and transparent disclosure of the contract material itself.
                        </p>
                        <p>
                            Contract rights exist on each side of the contract, but will most likely look different depending on the content of the contract. Each agreement will naturally involve a different set of rights than another agreement. One party might have the right to purchase a service, while the other party might have the right to provide a service to that party. Contract rights are related to (but different than) contract duties, which are the obligations to perform that each party has under the terms of the agreement.
                        </p>
                        <p>
                            Rights of parties to a contract are the rights that are guaranteed through a legally valid contract to the parties that have made the agreement. Such rights can be written; for example, the exclusive rights to copyrighted content. Rights can also be implied; for example, each party has a right to a fair and transparent disclosure of the contract material itself.
                        </p>
                        <p>
                            Contract rights exist on each side of the contract, but will most likely look different depending on the content of the contract. Each agreement will naturally involve a different set of rights than another agreement. One party might have the right to purchase a service, while the other party might have the right to provide a service to that party. Contract rights are related to (but different than) contract duties, which are the obligations to perform that each party has under the terms of the agreement.
                        </p>
                    </div>

                    <div className="max-w-4xl px-0 my-4">
                        <h1 className="text-white text-2xl font-bold mb-4">Signatures</h1>
                        <div className="flex ">
                            <div className="w-10 flex mr-4">
                                <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" />
                            </div>
                            <div>
                                <p className="text-gray-300">By selecting this checkbox, I agree to MTN's <strong>Electronic Record and Signature Disclosure.</strong></p>
                            </div>
                        </div>

                        <div className="flex space-x-4 my-8">

                            <div className="p-4 w-1/2 h-80 bg-white/10 hover:bg-white/20  rounded-xl border-1 border-gray-500 flex flex-col">
                                <h1 className="text-white text-center text-xl font-bold">Director's signature</h1>

                                <div className="border-4 text-yellow-500 mouseover:flex border-yellow-500 w-full h-32 mt-8 flex justify-center items-center cursor-pointer" 
                                        onClick={() => showDirectorSigning()}>
                                    Click to Sign here
                                </div>
                            </div>

                            <div className="w-1/2 h-80 bg-white/10 rounded-xl border-1 border-dashed hover:bg-white/20 border-gray-500 flex flex-col space-y-4 items-center justify-center">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-16 h-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                <h1 className="text-white text-center text-xl font-bold p-4">Witness's Signature</h1>
                                <p className="text-gray-300 text-center">Once a witness signs, their signature will appear here. The witness will be able to sign once the director has signed</p>

                            </div>

                        </div>

                        <div className="flex space-x-4 my-8">

                            <div className="w-1/2 h-80 bg-white/10 rounded-xl border-1 border-dashed hover:bg-white/20 border-gray-500 flex flex-col space-y-4 items-center justify-center">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-16 h-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                <h1 className="text-white text-center text-xl font-bold p-4">MTN's Signature</h1>
                                <p className="text-gray-300 text-center">Once every party has signed, the signed contract from MTN will appear here</p>

                            </div>

                            <div className="w-1/2 h-80 bg-white/10 rounded-xl border-1 border-dashed hover:bg-white/20 border-gray-500 flex flex-col space-y-4 items-center justify-center">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-16 h-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                <h1 className="text-white text-center text-xl font-bold p-4">MTN's Signature</h1>
                                <p className="text-gray-300 text-center">Once every party has signed, the signed contract from MTN will appear here</p>

                            </div>

                        </div>

                    </div>     

                    {!submitingContractSignatures &&
                        <div className="flex py-4 px-2 space-x-4 justify-end max-w-4xl">
                            <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {}}>Back</button>
                            <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => {router.back()}}>Finish</button>
                        </div>
                    }
                    {submitingContractSignatures &&
                        <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                        </div>
                    }  

                    {signingModal && 
                        <div id="signing_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "signing_modal") {setSigningModal(false);}}}>
                            <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[550px] pb-4">
                                <div className="flex pt-8 pb-4">
                                    <div className="text-white text-2xl mb-4 flex-1">Adopt a Signature</div>                                
                                </div>

                                {errors && errors["error"] && (
                                    <div className="mb-6">
                                        <FormErrors error={errors["error"]} />
                                    </div>
                                )}

                                <TextInput
                                    id="fullname"
                                    label="Full name"
                                    // value={data.role_name}
                                    onChange={(e) => {}
                                    }
                                    errors={errors}
                                />
                                
                                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                        <li className="mr-2" role="presentation" onClick={() => {if(!activeSigningTab.selectStyle) setActiveSigningTab({upload: false, selectStyle: true})}}>
                                            <button className={`inline-block p-4 border-b-2 ${activeSigningTab.selectStyle ? 'border-yellow-600' : 'border-transparent'} rounded-t-lg hover:text-yellow-600 hover:border-text-600 dark:hover:text-yellow-600 ${activeSigningTab.selectStyle ? 'text-yellow-500' : 'text-white'}`} id="style-tab" data-tabs-target="#style" type="button" role="tab" aria-controls="style" aria-selected="false">Select style</button>
                                        </li>
                                        <li className="mr-2" role="presentation" onClick={() => {if(!activeSigningTab.upload) setActiveSigningTab({upload: true, selectStyle: false})}}>
                                            <button className={`inline-block p-4 border-b-2 ${activeSigningTab.upload ? 'border-yellow-600' : 'border-transparent'} rounded-t-lg hover:text-yellow-600 hover:border-text-600 dark:hover:text-yellow-600 ${activeSigningTab.upload ? 'text-yellow-500' : 'text-white'}`} id="upload-tab" data-tabs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="false">Upload</button>
                                        </li>
                                    </ul>
                                </div>


                                <div id="myTabContent">
                                    {/* First tab */}
                                    <div className={`${activeSigningTab.selectStyle ? 'block' : 'hidden'} p-4 rounded-xl  dark:bg-gray-800`} id="style" role="tabpanel" aria-labelledby="style-tab">
                                        <div className="mb-4 rounded-xl bg-white/20 flex flex-col p-4 space-y-4">    

                                            <div className="flex justify-between">

                                                <span className="text-gray-200">Preview</span>

                                                <span className="cursor-pointer text-yellow-500" onClick={() => setClearCanvas(!clearCanvas)}>Clear</span>

                                            </div>          

                                            <div className="rounded-xl bg-black border-1 border-dashed border-gray-200 flex p-2 w-full space-x-4 items-center justify-center">

                                                <canvas
                                                    ref={canvas}
                                                    onMouseDown={onDown}
                                                    onTouchStart={onDown}
                                                    onMouseUp={onUp}
                                                    onTouchEnd={onUp}
                                                    onMouseLeave={onUp}
                                                    onMouseMove={onMove}
                                                    onTouchMove={onMove}
                                                    width={canvasWidth}
                                                    height={canvasHeight}
                                                    id="signature_canvas"
                                                    className="border-1 border-gray-500"
                                                />
                                                
                                            </div>    
                                                                                 

                                        </div>
                                        <div className="flex m-4">
                                            <div className="w-12 flex justify-end mr-4">
                                                <input onChange={(e) => e.target.checked ? setDisableActiveButton(false) : setDisableActiveButton(true)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />
                                            </div>
                                            <div>
                                                <p className="text-gray-500">By selecting Adopt and sign, I agree that the signature and initials will be the electronic representation of my signature and initials for all purposes when I (or my agent) use them on documents, including legallyy binding contracts - just same as pen-and-paper signature or initial</p>
                                            </div>
                                        </div> 
                                        <div className="">
                                            {!signing &&
                                                <div className="flex py-4 px-2 space-x-4 justify-end">
                                                    <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setDisableActiveButton(true); setSigningModal(false);}}>Cancel</button>
                                                    <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full font-bold" disabled={disableActiveButton} onClick={() => {signContract()}}>Adopt Sign</button>
                                                </div>
                                            }
                                            {signing &&
                                                <div className="flex px-4">
                                                <TailSpinPreloader width={40} height={40} fill="#efb703" />
                                                </div>
                                            }
                                        </div> 
                                    </div>

                                    {/* Second tab */}
                                    <div className={`${activeSigningTab.upload ? 'block' : 'hidden'} p-4 rounded-xl  dark:bg-gray-800`} id="upload" role="tabpanel" aria-labelledby="upload-tab">
                                        
                                        <div className="mb-4 rounded-lg bg-white/20 flex p-2">              

                                            <div className="rounded-lg bg-black border-1 border-dashed border-gray-200 flex p-4 w-full space-x-4 items-center">

                                                <div className="w-16 h-16 bg-white/20 flex items-center justify-center rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                                                    <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                                                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                                                </svg>

                                                </div>

                                                <div className="flex flex-col flex-1 space-y-1 justify-center">                
                                                    <p className="text-gray-500 text-sm">Upload</p>
                                                    <p className="text-white text-md">Your signature</p>
                                                    <p className="text-gray-500 text-sm">Drag and drop here or</p>
                                                </div>

                                                <div className="flex flex-col justify-end space-between items-end space-y-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 justify-end">
                                                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                                    </svg>
                                                    <button className="border-1 border-white rounded-full py-1 px-4 text-white" onClick={() => document.querySelector("#uploaded_signature").click()}>Choose file</button>
                                                    <input type="file" className="opacity-0 w-1 h-1" id="uploaded_signature" accept=".png" onChange={(e) => {convertFile(e)}}/>                   
                                                </div>

                                            </div>          
                                            
                                        </div>

                                        <div className="flex m-4">
                                            <div className="w-12 flex justify-end mr-4">
                                                <input onChange={(e) => e.target.checked ? setDisableActiveButton(false) : setDisableActiveButton(true)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />                                            
                                            </div>
                                            <div>
                                                <p className="text-gray-500">By clicking this checkbox I agree that the user I've entered is a delegate of the Company and is authorized to sign this contract on behalf of the company</p>
                                            </div>
                                        </div>

                                        <div className="">
                                            {!signing &&
                                                <div className="flex py-4 px-2 space-x-4 justify-end">
                                                    <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setDisableActiveButton(true); setSigningModal(false);}}>Cancel</button>
                                                    <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full font-bold" disabled={disableActiveButton} onClick={() => {signContract()}}>Adopt Sign</button>
                                                </div>
                                            }
                                            {signing &&
                                                <div className="flex px-4">
                                                <TailSpinPreloader width={40} height={40} fill="#efb703" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    }  

                    {      
                        successModal && 
                        <div id="success_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "success_modal") {setSuccessModal(false);}}}>
                            <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[450px] pb-4">
                                
                                <div className="flex pt-8 pb-4 justify-center items-center">
                                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                    </svg>  
                                </div>              
                                </div>
                                
                                <div className="flex pt-8 pb-4 flex-col space-y-4">
                                    <p className="text-white text-2xl mb-4 flex-1 text-center">You've finished signing</p>  
                                    <p className="text-gray-500 text-md mb-4 flex-1 text-center">You'll receive an email copy once everyone has signed</p>              
                                </div>

                                <div className="">              
                                    <div className="flex py-4 px-2 space-x-4 justify-center">
                                        <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => {setSuccessModal(false); router.back()}}>Continue</button>
                                    </div>              
                                </div>

                            </div>
                        </div>        
                    }          

                </div>


                
           </>
}

