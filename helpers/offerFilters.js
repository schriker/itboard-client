export const filter = (filters, offers) => {
  let filteredOffers = [...offers]
  for (let type in filters) {
    if (filters[type].length > 0) {
      filteredOffers = offers.filter((offer) => {
        return filters[type].includes(offer[type].toLowerCase())
      })
    }
  }
  return filteredOffers
}