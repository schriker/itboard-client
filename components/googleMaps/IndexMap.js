import { useEffect, useRef } from 'react'

const IndexMap = ({ offers }) => {

  const mapRef = useRef()

  useEffect(() => {
      if (window.google) {
        if ('geolocation' in window.navigator) {
          window.navigator.geolocation.getCurrentPosition((position) => {
            initMap(position.coords)
          })
        }
      initMap()
    }
  }, [])

  const initMap = (cords) => {

    let initailPosition = {
      lat: 52.22977, 
      lng: 21.01178
    }

    if (cords) {
      initailPosition = {
        lat: cords.latitude,
        lng: cords.longitude
      }
    }

    const infowindow = new window.google.maps.InfoWindow()
    const map = new window.google.maps.Map(mapRef.current, {
      center: initailPosition,
      zoom: 9,
      mapTypeControl: false
    })

    const placeMarker = (offer) => {
      var position = new google.maps.LatLng(offer.lat, offer.lng)
      var marker = new google.maps.Marker({
        position: position,
        map: map
      })
      window.google.maps.event.addListener(marker, 'mouseover', () => {
        const thumbURL = process.env.NODE_ENV === 'development' ? `http://localhost:8080/images/companies_logos/thumb/${offer.company_logo_thumb}` : `http://itboardapi.janusmarcin.pl/images/companies_logos/thumb/${offer.company_logo_thumb}`

        const infoWindowContent = `
          <div id="infowindow" class="map-info-window">
            <img src=${thumbURL} alt=${offer.company_name} />
            <div>
              ${offer.position_name}
              <span>${offer.salary_from} - ${offer.salary_to} ${offer.salary_currency}</span>
              ${offer.company_name}
            </div>
          </div>
        `

        infowindow.close()
        infowindow.setContent(infoWindowContent)
        infowindow.open(map, marker)
      })
      window.google.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close()
      })
      window.google.maps.event.addListener(marker, 'click', () => {
        console.log('Clicked!')
      })
    }
    
    offers.forEach(placeMarker)
  }

  return (
    <div className='map-wrapper'>
      <div className='map' ref={mapRef}></div>
      <style jsx>{`
        .map-wrapper {
          width: 100%;
          height: 350px;
        }
        .map {
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default IndexMap