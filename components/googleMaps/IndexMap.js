import { useEffect, useRef, useState } from 'react'
import InfoWindowContent from './InfoWindowContent'

const IndexMap = ({ offers }) => {

  const mapRef = useRef()
  const infoWindow = useRef()
  const [infoWindowContent, setInfoWindowContent] = useState(null)

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

    const markersArray = []
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
      zoom: 8,
      mapTypeControl: false
    })

    const placeMarker = (offer) => {

      let position = new google.maps.LatLng(offer.lat, offer.lng)

      let placesCounter = 1

      markersArray.forEach((arrMarker) => {
        if (arrMarker.getPosition().equals(position)) {
          placesCounter ++
        }
      })

      const label = {
        fontSize: '16px',
        fontWeight: '500',
        color: '#f0f1f6',
        text: `${placesCounter}`
      }

      var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: placesCounter > 1 ? `/static/badges/multiple.png` : `/static/badges/${offer.technology.toLowerCase()}.png`,
        label: placesCounter > 1 ? label : null,
        content: offer,
        zIndex: placesCounter
      })

      window.google.maps.event.addListener(marker, 'click', () => {

        let placesArray = []

        markersArray.forEach((arrMarker) => {
          if (arrMarker.getPosition().equals(marker.getPosition())) {
            placesArray.push(arrMarker.content)
          }
        })

        setInfoWindowContent(placesArray)

        infowindow.close()
        infowindow.setContent(infoWindow.current)
        infowindow.open(map, marker)
      })
      window.google.maps.event.addListener(map, 'click', () => {
        infowindow.close()
      })
      markersArray.push(marker)
    }
    
    offers.forEach(placeMarker)
  }


  return (
    <div className='map-wrapper'>
      <div className='map' ref={mapRef}></div>
      {infoWindowContent && <div className="info-widnow__wrapper" ref={infoWindow}>
        <div className="info-widnow__content">
          {infoWindowContent.map((place) => <InfoWindowContent key={place._id} offer={place} />)}
        </div>
        <div className="info-widnow__arrow">
          <div></div>
        </div>
      </div>}
      <style jsx>{`
        .map-wrapper {
          width: 100%;
          height: 400px;
        }
        .map {
          height: 100%;
        }
        .info-widnow__wrapper {
          width: 100%;
          height: 100%;
        }
        .info-widnow__content {
          border-radius: 8px;
          overflow: hidden;
        }
        .info-widnow__arrow {
          width: 40px;
          height: 20px;
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          overflow: hidden;
          pointer-events: none;
          margin-top: -1px;
        }
        .info-widnow__arrow div {
          background: white;
          box-shadow: 0 3px 14px rgba(0,0,0,0.4);
          width: 17px;
          height: 17px;
          padding: 1px;
          margin: -12px auto 0;
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  )
}

export default IndexMap