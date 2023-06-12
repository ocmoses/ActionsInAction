"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
const useRoles = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  const isSuperadmin = () => false;
  return { ...states, ...actions, isSuperadmin };
};

export default useRoles;
