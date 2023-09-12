"use client"

export default function Modal({id, closeAction, negativeText, positiveAction, positiveText, processing, disableActiveButton, children}){
    return (
        <div id={id} className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => closeAction(e)}>
            <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[550px] pb-4">
                {children}
                <div className="">
                    {!processing &&
                        <div className="flex py-4 px-2 space-x-4 justify-end">
                            <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => closeAction()}>{negativeText ?? 'Back'}</button>
                            <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" disabled={disableActiveButton} onClick={() => positiveAction()}>{positiveText}</button>
                        </div>
                    }
                    {processing &&
                        <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}