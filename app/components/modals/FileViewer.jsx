
export default function FileViewer({id, link, closeAction}){

    return (
        <div id={id} className="w-screen flex justify-center items-center h-screen fixed z-[1111111] top-0 left-0 bg-black/80" onClick={ (e) => {if(e.target.id && e.target.id == id) {closeAction();}} }>
         
          <iframe src={link} title="W3Schools Free Online Web Tutorials" className="flex w-[1000px] h-screen " ></iframe>

        </div> 
    );

}