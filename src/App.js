import React, { useState, useEffect, useMemo } from 'react'
import ReactGlobe from 'react-globe'
import logo from './logo2.png'
import openSocket from 'socket.io-client'
import { numericLiteral, tsConstructSignatureDeclaration } from '@babel/types';

function getTooltipContent(marker) {
  return `City: ${marker.city}`
}

const App = ({ port }) => {
  const [event, setEvent] = useState(null)
  const [details, setDetails] = useState(null)
  const [markers, setMarkers] = useState([])
  const [focus, setFocus] = useState(undefined)
  const socket = useMemo(
    () => {
      const s = openSocket(`http://localhost:${port}`)
      console.log(s)
      return s
    },
    [port]
  )
  useEffect(
    () => {
      socket.on('msg', msg => {
        console.log(msg)
        // console.log(msg.city)
        setFocus(msg.coordinates)
        setTimeout(() => {
          setMarkers(prevState => [...prevState, msg])
        }, 3000)
      })

      return () => socket.close()
    },
    [socket]
  )

  useEffect(
    () => {
      setTimeout(() => {
        setFocus(undefined)
      }, 4000)
    },
    [focus]
  )

  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: 'CLICK',
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY }
    })
    setDetails(getTooltipContent(marker))
  }
  function onDefocus(previousCoordinates, event) {
    setEvent({
      type: 'DEFOCUS',
      previousCoordinates,
      pointerEventPosition: { x: event.clientX, y: event.clientY }
    })
    setDetails(null)
  }

  return (
    <div style={{ fontFamily: 'arial', width: '100vw', height: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: 12
        }}
      >
        <img alt="Logo" src={logo} style={{ maxWidth: '300px' }} />
      </div>
      <ReactGlobe
        markers={markers}
        markerOptions={{
          getTooltipContent
        }}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
        globeOptions={{
          cloudsSpeed: 0.2,
          cloudsOpacity: 0.35,
          enableClouds: true
        }}
        focus={focus}
        focusOptions={{
          animationDuration: 3000,
          distanceRadiusScale: 2.5,
          easingFunction: ['Exponential', 'In'],
          enableDefocus: true
        }}
      />

      {details && (
        <div
          style={{
            background: 'white',
            position: 'absolute',
            fontSize: 24,
            top: 0,
            right: 0,
            padding: 12
          }}
        >
          {details}
        </div>
      )}
    </div>
  )
}

App.defaultProps = {
  port: '8000'
}

export default App
