'use client'
import RegisterStepOne from './RegisterStepOne'
import RegisterStepTwo from './RegisterStepTwo'
import { useOnboardingContext } from '../../../../hooks/useOnboardingContext'

function Register() {
  const { form, forms } = useOnboardingContext()
  return (
    <>
      {form === 'userinfo' && <RegisterStepOne {...forms.userinfo} />}
      {form === 'companyinfo' && <RegisterStepTwo {...forms.companyinfo} />}
    </>
  )
}

export default Register
