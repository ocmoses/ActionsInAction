import { ExclamationCircle } from './HeroIcons'

export function RequestError({ errors }) {
  return (
    <>
      {errors.length > 0 && (
        <div className=" toast toast-end z-50 absolute w3-animate-right">
          {errors.map((error) => (
            <div
              key={error}
              className="alert alert-error rounded-md py-2 px-4 text-white text-md bg-red-500"
            >
              <div className="flex gap-3 items-center">
                <ExclamationCircle iconClass="w-6 h-6 text-white" />
                <span>{error}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export function RequestSuccess({ success }) {
  return (
    <>
      {success !== '' && (
        <div className=" toast toast-end z-50 absolute w3-animate-right">
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
