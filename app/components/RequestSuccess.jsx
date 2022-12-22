import { ExclamationCircle } from './HeroIcons'

function RequestSuccess({ success }) {
  return (
    <>
      {success !== '' && (
        <div className=" toast toast-end z-50 w3-animate-right">
          <div className="alert alert-success rounded-md py-2 px-4 text-white text-md bg-green-700">
            <div className="flex gap-3 items-center">
              <ExclamationCircle iconClass="w-6 h-6 text-white" />
              <span>{success}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RequestSuccess
