import { CheckedCircle, ExclamationCircle } from "./Icons";
import { motion } from "framer-motion";

const toastVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      yoyo: 6,
    },
  },
};

export function RequestError({ errors }) {
  return (
    <>
      {errors.length > 0 && (
        <div className="toast toast-end z-20 fixed">
          {errors.map((error) => (
            <motion.div
              key={error.key}
              className="min-w-[320px] rounded-md py-2 pl-3 pr-5 text-white text-md bg-red-500"
              variants={toastVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex gap-3 items-center">
                <ExclamationCircle iconClass="w-10 h-10 text-white" />
                <span>{error.message}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}

export function RequestSuccess({ success }) {
  return (
    <>
      {success !== "" && (
        <div className="toast toast-end z-20 fixed">
          <motion.div
            className="min-w-[320px] rounded-md py-2 pl-3 pr-5 text-white text-md bg-green-500"
            variants={toastVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex gap-3 items-center">
              <CheckedCircle iconClass="w-10 h-10 text-white" />
              <span>{success}</span>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
