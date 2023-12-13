

function ApprovalActions(actionProps){
    return  props.declining != props.request  ?
        (
            <>
                <span 
                    onClick={() => approve()} 
                    className="flex space-x-2 px-2 py-1 rounded-full cursor-pointer hover:bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span className="text-white">Approve</span>
                </span>
                <span 
                    onClick={() => setDeclining(request)}  
                    className="flex space-x-2 px-2 py-1 rounded-full cursor-pointer hover:bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span className="text-white">Reject</span>
                </span>
            </>
        ) : (
            <>

                <div className="border-1 border-white/20 rounded-xl flex flex-col relative w-full">
                    
                    <div className="m-2 -mb-4">
                        <SelectInput
                            id="service"
                            label="Select reason"
                            value={data.reasons_for_rejection}
                            onChange={(e) => {
                                setData({...data, reasons_for_rejection: e.target.value});
                                setSelectField("reason");
                            }}
                            errors={errors}
                            disabled={false}
                            >
                            {reasons.map((r) => (
                                <SelectInputOption key={r} value={r} label={r} />
                            ))}
                        </SelectInput>   
                    </div>
                                                                    
                    <textarea
                        onKeyUp={(e) => handleChange(e)}
                        onBlur={(e) => handleChange(e)}
                        className="rounded p-4 mb-4 border-1 border-white/20 bg-white/10 text-white m-4"
                        rows="6"
                    ></textarea>

                    <div className="border-t border-white/40 py-2 px-4 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="orange"
                            className="w-6 h-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                            />
                        </svg>

                        <span className="text-sm text-white/80 ml-2">
                            Partner will be notified
                        </span>

                        <div className=" ml-auto">
                            {!approving && (
                            <>
                                <span
                                    onClick={() => {
                                        setDeclining(false);
                                        setTypedReason("");
                                    }}
                                    className="border-1 border-white/20 p-2 px-4 rounded-full text-white text-sm hover:bg-white/20 cursor-pointer"
                                >
                                    Cancel
                                </span>

                                <span
                                    onClick={() => reject()}
                                    className="border-1 border-red-200 p-2 px-4 rounded-full text-white text-sm hover:bg-white/20 cursor-pointer ml-2"
                                >
                                    Decline
                                </span>
                            </>
                            )}
                            {approving && (
                                <TailSpinPreloader width={40} height={40} fill="#efb703" />
                            )}
                        </div>
                    </div>
                </div>

            </>
        );
    
}