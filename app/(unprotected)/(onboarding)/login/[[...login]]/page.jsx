import LoginPage from './LoginPage'
export default function Login({ params: { login } }) {
  console.log({ login })
  return <LoginPage params={login} />
}
