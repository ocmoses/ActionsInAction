export default function FilterTag({message, action}){

    return (<div className="border-1 border-white/20 rounded-lg h-full flex items-center text-xs text-gray-400 mr-2 px-2">
                {message} &nbsp; <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} stroke="gray" className="w-4 h-4 hover:w-5 hover:h-5"
                                    onClick={() => action()}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                 </svg>

            </div>); 
}