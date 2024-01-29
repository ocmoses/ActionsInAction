

export default function SkipButton({action}){
    return (
        <div className="px-4 py-2 rounded-full border-1 border-white/20
                         hover:bg-white/10 bg-white/5 text-white text-sm cursor-pointer"
                onClick={() => action()}>
            Skip
        </div>
    )
}