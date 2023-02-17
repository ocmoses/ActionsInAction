import { useStoreActions, useStoreState } from "easy-peasy"

const useServices = () => {
  const states = useStoreState((state) => state.services)
  const actions = useStoreActions((action) => action.services)

  return {
    ...states,
    ...actions,
  }
}
export default useServices
