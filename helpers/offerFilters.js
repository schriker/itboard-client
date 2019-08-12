export const filter = (filters, offers) => {
  for (let type in filters) {
    if (filters[type].length > 0) {
      offers = offers.filter((offer) => {
        return filters[type].includes(offer[type].toLowerCase())
      })
    }
  }
  return offers
}