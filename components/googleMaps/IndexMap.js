import { useEffect, useRef, useState } from 'react'
import InfoWindowContent from './InfoWindowContent'

const IndexMap = ({ offers, findOnMap }) => {

  let map = null
  let infoWindow = null
  const markersArray = []
  const mapRef = useRef()
  const infoWindowRef = useRef()
  const [infoWindowContent, setInfoWindowContent] = useState(null)
  const [isMap, setIsMap] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (window.google) {
    infoWindow = new window.google.maps.InfoWindow()
      if ('geolocation' in window.navigator) {
        window.navigator.geolocation.getCurrentPosition((position) => {
          initMap(position.coords)
        }, () => initMap())
      }
    }
  }, [])

  useEffect(() => {
    infoWindow = new window.google.maps.InfoWindow()
    markers.forEach(marker => marker.setMap(null))
    setMarkers([])
    if (isMap) {
      offers.forEach(placeMarker)
      setMarkers(markersArray)
    }
  }, [offers])

  useEffect(() => {
    if (findOnMap) {
      let marker = null
      isMap.setCenter(findOnMap)
      marker = markers.find(el => {
        return el.content.lat === findOnMap.lat && el.content.lng === findOnMap.lng
      })
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
      marker.setZIndex(999)
      return () => {
       marker.setAnimation(null)
       marker.setZIndex(1)
      }
    }
  }, [findOnMap])

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

    map = new window.google.maps.Map(mapRef.current, {
      center: initailPosition,
      zoom: cords ? 8 : 6,
      mapTypeControl: false
    })
    offers.forEach(placeMarker)
    setMarkers(markersArray)
    setIsMap(map)
  }

  const placeMarker = (offer) => {
    let position = new window.google.maps.LatLng(offer.lat, offer.lng)

    let placesCounter = 1

    markersArray.forEach((arrMarker) => {
      if (arrMarker.getPosition().equals(position)) {
        placesCounter ++
      }
    })

    const label = {
      fontSize: '18px',
      fontWeight: '500',
      color: '#f0f1f6',
      text: `${placesCounter}`
    }

    const marker = new google.maps.Marker({
      position: position,
      map: isMap || map,
      icon: placesCounter > 1 ? `/static/badges/multiple.png` : `/static/badges/${offer.technology.toLowerCase()}.png`,
      label: placesCounter > 1 ? label : null,
      content: offer,
      zIndex: placesCounter,
      animation: window.google.maps.Animation.DROP
    })

    window.google.maps.event.addListener(marker, 'click', () => {

      let placesArray = []
      markersArray.forEach((arrMarker) => {
        if (arrMarker.getPosition().equals(marker.getPosition())) {
          placesArray.push(arrMarker.content)
        }
      })

      markersArray.forEach(marker => marker.setAnimation(null))

      setInfoWindowContent(placesArray)

      infoWindow.close()
      infoWindow.setContent(infoWindowRef.current)
      infoWindow.open(isMap || map, marker)
    })
    window.google.maps.event.addListener(isMap || map, 'click', () => {
      infoWindow.close()
    })
    markersArray.push(marker)
  }

  return (
    <div className='map-wrapper'>
      <div className='map' ref={mapRef}></div>
      {infoWindowContent && <div className="info-widnow__wrapper" ref={infoWindowRef}>
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
        }
        .info-widnow__arrow div {
          background: white;
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