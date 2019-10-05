export const filter = (filters, offers) => {
  for (let type in filters) {
    if (filters[type].length > 0) {
      if (type === 'remote') {
        offers = offers.filter(offer => {
          return offer.remote === filters[type][0]
        })
      }
      else {
        offers = offers.filter((offer) => {
          return filters[type].includes(offer[type].toLowerCase())
        })
      }
    }
  }
  return offers
}