export const getCategories = async () => {
  const response = await fetch(
    'https://amazonpartner.com.ng/amazon/public/api/v1/categories',
    {
      method: 'GET',
      headers: {
        apikey: 't7286gyfe987ffey87*Zzzht45334DSWTU'
      },
      redirect: 'follow'
    }
  ).catch((error) => console.log('error', error))
  const categories = await response.json()
  console.log(categories)
  return categories
}
