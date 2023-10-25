export default function EmptyTable({list}){
    return (
        <div className="w-full p-4 flex justify-center">
            <p className="text-md text-white/80"><i>No {list} Found </i></p>
        </div>);
}