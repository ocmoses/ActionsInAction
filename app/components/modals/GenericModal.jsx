
export default function GenericModal({id, width, height=null, closeAction, children}){

    return (
        <div id={id} className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={ (e) => {if(e.target.id && e.target.id == id) {closeAction();}} }>
          <div id="actualModal" className={`pb-12 relative px-10 border-2 border-gray-500 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[${width}px] ${height ? 'h-[' + height + 'px]' : ''}`}>
            {children}
          </div>
        </div> 
    );

}