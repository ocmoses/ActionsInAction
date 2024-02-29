import useUsers from "@/hooks/useUsers";

export default function AnnexureH({dynamicData, name, value, action}){

    const {user} = useUsers();

    return (  
        
        <>        
        {
            dynamicData?.dynamic_details?.annexures && 
            dynamicData?.dynamic_details?.annexures &&
            dynamicData?.dynamic_details?.annexures[name] && 
            dynamicData?.dynamic_details?.annexures[name] == value ? 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>:
                user.role == "witness" ? <div></div> :
                dynamicData?.dynamic_details?.annexures && dynamicData?.dynamic_details?.annexures[name] != "" && dynamicData?.dynamic_details?.annexures[name] != null && dynamicData?.dynamic_details?.annexures[name] != undefined ? <div></div> :
                <input onChange={(e) => action(e, name)} name={name} type="radio" value={value} className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" />
        }   
        </>        
    );
}