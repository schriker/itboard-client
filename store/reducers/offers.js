import * as actionTypes from '../actions/actionTypes'

const initialState = {
  offers: [],
  filters: {
    technology: [],
    location: [],
    experience_level: [],
    remote: [],
    salary: []
  },
  newOffer: {
    company_name: 'ProData',
    company_website: 'https://www.wykop.pl/',
    company_size: '6',
    // company_logo: {},
    technology: 'Security',
    position_name: 'Junior testert',
    experience_level: 'Junior',
    salary_from: '1000',
    salary_to: '2000',
    salary_currency: 'PLN',
    contract_type: 'B2B',
    city: 'Mielec',
    location: 'Mielec, Poland',
    address_components: [
      {
        long_name: 'Mielec',
        short_name: 'Mielec',
        types: [
          'locality',
          'political'
        ]
      },
      {
        long_name: 'Mielec County',
        short_name: 'Mielec County',
        types: [
          'administrative_area_level_2',
          'political'
        ]
      },
      {
        long_name: 'Podkarpackie Voivodeship',
        short_name: 'Podkarpackie Voivodeship',
        types: [
          'administrative_area_level_1',
          'political'
        ]
      },
      {
        long_name: 'Poland',
        short_name: 'PL',
        types: [
          'country',
          'political'
        ]
      },
      {
        long_name: '39',
        short_name: '39',
        types: [
          'postal_code_prefix',
          'postal_code'
        ]
      }
    ],
    lat: 50.287063,
    lng: 21.4238101,
    agreements: 'Informujemy, że administratorem danych jest ______sssss_ z siedzibą w _______, ul. _______(dalej jako "administrator"). Masz prawo do żądania dostępu do swoich danych osobowych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do wniesienia sprzeciwu wobec przetwarzania, a także prawo do przenoszenia danych oraz wniesienia skargi do organu nadzorczego. Dane osobowe przetwarzane będą w celu realizacji procesu rekrutacji. Podanie danych w zakresie wynikającym z ustawy z dnia 26 czerwca 1974 r. Kodeks pracy jest obowiązkowe. W pozostałym zakresie podanie danych jest dobrowolne. Odmowa podania danych obowiązkowych może skutkować brakiem możliwości przeprowadzenia procesu rekrutacji. Administrator przetwarza dane obowiązkowe na podstawie ciążącego na nim obowiązku prawnego, zaś w zakresie danych dodatkowych podstawą przetwarzania jest zgoda. Dane osobowe będą przetwarzane do czasu zakończenia postępowania rekrutacyjnego i przez okres możliwości dochodzenia ewentualnych roszczeń, a w przypadku wyrażenia zgody na udział w przyszłych postępowaniach rekrutacyjnych - do czasu wycofania tej zgody. Zgoda na przetwarzanie danych osobowych może zostać wycofana w dowolnym momencie. Odbiorcą danych jest serwis IT Board oraz inne podmioty, którym powierzyliśmy przetwarzanie danych w związku z rekrutacją.',
    apply_link: 'https://www.wykop.pl/',
    remote: false,
    content: '<p>Jak wytłumaczono tę decyzję? <strong>Paradoksalnie „apolitycznością i niezależnością” prokuratury.</strong></p>\n<p>–<em> Prokuratura jako instytucja &nbsp;powołana do ścigania przestępstw i stania na straży praworządności nie &nbsp;bierze udziału w życiu politycznym. Prokuratorzy muszą być apolityczni i &nbsp;niezależni (…) Te fundamentalne dla niezależnej prokuratury zasady pani &nbsp;prokurator Ewa Wrzosek narusza w sposób rażący</em> – można przeczytać w uzasadnieniu.</p>\n<h4>Prokuratorzy w obronie Wrzosek</h4>\n<p><strong>Z taką interpretacją sytuacji nie zgadza się Stowarzyszenie Prokuratorów „Lex Super Omnia”.</strong> &nbsp;Zarząd stowarzyszenia podjął w niedzielę uchwałę w obronie &nbsp;niezależności prokuratorskiej. Stowarzyszenie domaga się wyjaśnienia &nbsp;sprawy i dymisji Ewy Dudzińskej, która podjęła decyzję o umorzeniu &nbsp;śledztwa.</p>'
  },
  isSending: false,
  saved: false,
  err: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGES: {
      return {
        ...state,
        filters: {
          ...state.filters,
          technology: action.payload
        }
      }
    }
    case actionTypes.SET_FILTERS: {
      if (action.payload.value === 'all') {
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.filter]: []
          }
        }
      } else {
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.filter]: [action.payload.value]
          }
        }
      }
    }
    case actionTypes.CLEAR_FILTERS: {
      return { 
        ...state,
        filters: {
          ...initialState.filters 
        }
      }
    }
    case actionTypes.NEW_OFFER_DETAILS: {
      return {
        ...state,
        newOffer: {
          ...state.newOffer,
          ...action.payload
        }
      }
    }
    case actionTypes.NEW_OFFER_CONTENT: {
      return {
        ...state,
        newOffer: {
          ...state.newOffer,
          content: action.payload,
          raw: action.raw
        }
      }
    }
    case actionTypes.OFFER_SAVE_START: {
      return {
        ...state,
        isSending: true,
        saved: false,
        err: null
      }
    }
    case actionTypes.OFFER_SAVE_SUCCESS: {
      return {
        ...state,
        isSending: false,
        saved: true,
        err: null
      }
    }
    case actionTypes.OFFER_SAVE_FAILED: {
      return {
        ...state,
        isSending: false,
        saved: false,
        err: action.err
      }
    }
    case actionTypes.OFFER_SAVE_CLEAR_ERROR: {
      return {
        ...state,
        err: null
      }
    }
    case actionTypes.OFFER_SAVE_RESET: {
      return {
        ...state,
        newOffer: {},
        isSending: false,
        saved: false,
        err: null
      }
    }
    case actionTypes.FETCH_OFFERS_SUCCESS: {
      return {
        ...state,
        offers: action.offers
      }
    }
    case actionTypes.FETCH_OFFERS_FAILED: {
      return {
        ...state,
        err: 'Failed to fetch offers from server.'
      }
    }
    default: return state
  }
}

export default reducer