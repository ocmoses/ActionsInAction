import useFileViewer from "@/hooks/useFileViewer";
import { useEffect } from "react";

export default function FileViewer({id, link, closeAction}){

  const {previewFile}  = useFileViewer();

  useEffect(() => {
    previewFile(link)
      .then(resp => {document.querySelector('#' + id + '_frame').src = URL.createObjectURL(resp.data); })
      .catch(error => console.log("PREVIEW ERROR: ", error));
  }, []);

    return (
        <div id={id} className="w-screen flex justify-center items-center h-screen fixed z-[1111111] top-0 left-0 bg-black/80" 
            onClick={ (e) => {if(e.target.id && e.target.id == id) {closeAction();}} }>
         
          <iframe id={id + '_frame'} 
            // src={link} 
            title="Whatever" className="flex w-[1000px] h-screen " ></iframe>

        </div> 
    );

}