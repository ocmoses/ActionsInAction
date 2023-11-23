
export default function FileViewer({id, link, closeAction}){

    return (
        <div id={id} className="w-screen flex justify-center items-center h-screen fixed z-[999] top-0 left-0 bg-black/80" onClick={ (e) => {if(e.target.id && e.target.id == id) {closeAction();}} }>
         
          <iframe src={link} title="W3Schools Free Online Web Tutorials" width="1200px" height="800px" ></iframe>

        </div> 
    );

}