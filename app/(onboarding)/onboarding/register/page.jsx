'use client'
import RegisterStepOne from './RegisterStepOne'
import RegisterStepTwo from './RegisterStepTwo'
import { useOnboardingContext } from '../../../../hooks/useOnboardingContext'
import { ExclamationCircle } from '../../../components/HeroIcons'

function Register() {
  const { form, forms, requestError, processing } = useOnboardingContext()
  return (
    <>
      <div className="relative mx-auto w3-animate-opacity">
        {processing && (
          <div className="absolute z-50 top-0 right-0 bottom-0 left-0 bg-transparent"></div>
        )}
        {form === 'userinfo' && <RegisterStepOne {...forms.userinfo} />}
        {form === 'companyinfo' && <RegisterStepTwo {...forms.companyinfo} />}
      </div>

      {requestError.length > 0 && (
        <div className=" toast toast-end z-50 w3-animate-right">
          {requestError.map((error) => (
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

export default Register
