export const filter = (filters, offers) => {
  for (let type in filters) {
    if (filters[type].length > 0) {
      if (type === 'salary') {
        const [min, max] = [...filters[type][0]]
        offers = offers.filter(offer => {
          return offer.salary_to >= min && offer.salary_from <= max
        })
      } else if (type === 'remote') {
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