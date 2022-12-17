import { ArrowRightCircle } from '../../../components/HeroIcons'

function Register() {
  return (
    <form>
      <div className="w-full  max-w-[450px] min-w-[420px] mx-auto">
        <h1 className=" font-mtn-extrabold-italic  text-white text-4xl">
          Y’ello
        </h1>
        <p className="font-hairline font-mtn text-[18px] mb-16 text-neutral-300">
          Welcome back! please enter your great details
        </p>
        <div class="relative z-0 mb-6 w-full group p-2 bg-gray-700 rounded-md">
          <input
            type="text"
            id="partnerID"
            class="block px-4 pb-2.5 pt-4 w-full text-sm text-gray-200 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
            placeholder=" "
          />
          <label
            for="partnerID"
            class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-300 peer-focus:dark:text-gray-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Partner ID
          </label>
        </div>
        <div class="relative z-0 mb-6 w-full group p-2 bg-gray-700 rounded-md">
          <input
            type="text"
            id="password"
            class="block px-4 pb-2.5 pt-4 w-full text-sm text-gray-200 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
            placeholder=" "
          />
          <label
            for="password"
            class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-300 peer-focus:dark:text-gray-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Password
          </label>
        </div>

        <button className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2">
          Continue <ArrowRightCircle iconClass="w-12 h-12 ml-4" />
        </button>
      </div>
    </form>
  )
}

export default Register
