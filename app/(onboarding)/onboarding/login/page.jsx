import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightCircle } from '../../../components/HeroIcons'

function Login() {
  return (
    <form>
      <div className="mx-auto w3-animate-opacity">
        <h1 className="flex items-center gap-4 font-mtn-extrabold-italic  text-white text-4xl">
          <span>Y’ello</span>
          <Image
            src="/assets/icons/yello-hand.svg"
            alt="Yello"
            priority
            width={36}
            height={36}
            className="h-auto animate-bounce"
          />
        </h1>
        <p className="font-hairline flex-wrap mb-16 font-mtn-extralight text-white/70">
          Welcome back! please enter your great details
        </p>
        <div className="relative z-0 mb-6 w-full group p-2 bg-gray-900/80 border-1 border-gray-800 rounded-xl">
          <input
            type="text"
            id="partnerID"
            className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="partnerID"
            className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
          >
            Partner ID
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group p-2 bg-gray-900/80 border-1 border-gray-800 rounded-xl">
          <input
            type="text"
            id="password"
            className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
          >
            Password
          </label>
        </div>
        <Link
          href="#"
          className="inline-flex font-mtn-extralight  text-white hover:text-mtn-400 border-b-1 border-b-mtn text-start mb-12 px-0 pb-1"
        >
          Forgot your password?
        </Link>

        <button className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2">
          Continue <ArrowRightCircle iconClass="w-12 h-12 ml-4" />
        </button>
      </div>
    </form>
  )
}

export default Login
