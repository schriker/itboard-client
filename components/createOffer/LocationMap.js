import { useEffect, useRef } from 'react'

const LocationMap = ({ form, field }) => {

  const mapRef = useRef()
  const infoWindowRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    initMap()
  },[])

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: {lat: 51.509865, lng: -0.118092},
      zoom: 8,
      mapTypeControl: false
    });
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current)
    autocomplete.bindTo('bounds', map)
    autocomplete.setFields(['address_components', 'formatted_address' , 'geometry', 'name'])

    const infowindow = new window.google.maps.InfoWindow()
    const infowindowContent = infoWindowRef.current
    infowindow.setContent(infowindowContent)

    const marker = new window.google.maps.Marker({
      map: map,
      anchorPoint: new window.google.maps.Point(0, -29)
    })

    autocomplete.addListener('place_changed', function() {
      infowindow.close()
      marker.setVisible(false)
      const place = autocomplete.getPlace()
      
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'")
        return
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location)
        map.setZoom(17)  
      }
      marker.setPosition(place.geometry.location)
      marker.setVisible(true)
      map.setCenter(marker.getPosition());

      form.setFieldValue('address_components', place.address_components)
      form.setFieldValue('lat', place.geometry.location.lat())
      form.setFieldValue('lng', place.geometry.location.lng())
      form.setFieldValue(field.name, place.formatted_address)
    })
  }

  return (
    <div className="map-input inputs">
      <div className="input-row">
        <input 
          {...field}
          ref={inputRef} 
          name={field.name} 
          id={field.name} 
          placeholder=""
          autoComplete="off"
          className={form.errors[field.name] && form.touched[field.name] ? 'with-error' : form.values[field.name] !== '' ? 'touched' : form.touched[field.name] ? 'touched' : null} 
          type="text" />
        <label htmlFor={field.name}>Search location</label>
      </div>
      <div className="map-wrapper">
        <div ref={mapRef} className="map"></div>
        <div ref={infoWindowRef} className="window-content">
          <img src="" width="16" height="16" id="place-icon" />
          <span id="place-name"  className="title"></span><br />
          <span id="place-address"></span>
        </div>
      </div>
      <style jsx>{`
        .map-wrapper {
          width: 100%;
          height: 350px;
          margin-bottom: 35px;
        }
        .map {
          height: 100%;
        }
        .inputs {
          padding: 40px 80px;
        }
        .window-content {
          display: none;
        }
        .map .window-content {
          display: inline;
        }
        `}</style>
    </div>
  )
}

export default LocationMap