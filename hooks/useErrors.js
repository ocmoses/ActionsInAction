"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
const useErrors = () => {
  const { setError, removeError, clearErrors, setSuccess } = useStoreActions(
    (action) => action.app
  );
  const errors = useStoreState((state) => state.app.errors);
  const success = useStoreState((state) => state.app.success);

  return [{ errors, setError, removeError, clearErrors, success, setSuccess }];
};

export default useErrors;
