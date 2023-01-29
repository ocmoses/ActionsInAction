import { action, computed, thunk } from "easy-peasy"
const services = {
  category: null,
  categories: [],
  setCategory: action((state, category) => {
    state.category = category
  }),
  setCategories: action((state, categories) => {
    state.categories = categories
  }),
  updateCategory: action((state, category) => {
    state.category = { ...state.category, ...category }
    const Categories = state.categories.filter((p) => {
      p.uuid !== category.uuid
    })
    state.categories = [...Categories, category]
  }),
}
export default services
