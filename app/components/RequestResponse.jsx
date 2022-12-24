import { CheckedCircle, ExclamationCircle } from './HeroIcons'
import { motion } from 'framer-motion'

const toastVariants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      yoyo: 6
    }
  }
}
{
  /* <div className="toast toast-end">
  <div className="alert alert-info">
    <div>
      <span>New mail arrived.</span>
    </div>
  </div>
</div> */
}
export function RequestError({ errors }) {
  return (
    <>
      {errors.length > 0 && (
        <div className="toast toast-end z-20 absolute">
          {/* <div className="h-fit absolute bottom-1 right-1 z-20"> */}
          {errors.map((error) => (
            <motion.div
              key={error.key}
              className="alert rounded-md py-2 pl-3 pr-5 text-white text-md bg-red-500"
              // className="max-w-sm h-fit rounded-md py-2 pl-3 pr-5 text-white text-md bg-red-500"
              variants={toastVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex gap-3 items-center">
                <ExclamationCircle iconClass="w-12 h-12 text-white" />
                <span>{error.message}</span>
              </div>
            </motion.div>
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
        <div className="h-fit absolute bottom-1 right-1 z-50">
          <motion.div
            className="rounded-md max-w-sm h-fit py-2 pl-3 pr-5 text-white text-md bg-green-700"
            variants={toastVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex gap-3 items-center">
              <CheckedCircle iconClass="w-12 h-12 text-white" />
              <span>{success}</span>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
