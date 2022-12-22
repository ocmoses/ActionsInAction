'use client'
import RegisterStepOne from './RegisterStepOne'
import RegisterStepTwo from './RegisterStepTwo'
import { useOnboardingContext } from '../../../../hooks/useOnboardingContext'
import RequestSuccess from '../../../components/RequestSuccess'
import RequestError from '../../../components/RequestError'
function Register() {
  const { form, forms, requestError, requestSuccess, processing } =
    useOnboardingContext()
  return (
    <>
      <div className="relative mx-auto w3-animate-opacity">
        {processing && (
          <div className="absolute z-50 top-0 right-0 bottom-0 left-0 bg-transparent"></div>
        )}
        {form === 'userinfo' && <RegisterStepOne {...forms.userinfo} />}
        {form === 'companyinfo' && <RegisterStepTwo {...forms.companyinfo} />}
      </div>
      <RequestSuccess success={requestSuccess} />
      <RequestError errors={requestError} />
    </>
  )
}

export default Register
