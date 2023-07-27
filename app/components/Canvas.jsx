"use client"

import {useState, useRef, useEffect, useCallback} from "react";


export default function Canvas({width, height, refresh}){

    const canvas = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [position, setPosition] = useState(null);

    const onDown = useCallback((event) => {
        console.log("Touchdown===========");
        const coordinates = getCoordinates(event)
        if (coordinates) {
          setPosition(coordinates)
          setDrawing(true)
        }
      }, [])
    
      const onUp = useCallback(() => {
        setDrawing(false)
        setPosition(null)
      }, [])
    
      const getCoordinates = (event) => {
        if (!canvas.current) {
          return null
        }
    
        const x = event.pageX || event.touches[0].pageX
        const y = event.pageY || event.touches[0].pageY
    
        return {
          x: x - canvas.current.offsetLeft,
          y: y - canvas.current.offsetTop
        }
      }
    
      const onMove = useCallback(
        (event) => {
          if (drawing) {
            const newPosition = getCoordinates(event)
            if (position && newPosition) {
              drawLine(position, newPosition)
              setPosition(newPosition)
            }
          }
        },
        [drawing, position]
      )
    
      const drawLine = (originalPosition, newPosition) => {
        if (!canvas.current) {
          return null
        }
    
        const context = canvas.current.getContext('2d')
    
        if (context) {
          context.strokeStyle = 'white'
          context.lineJoin = 'round'
          context.lineWidth = 3
    
          context.beginPath()
          context.moveTo(originalPosition.x, originalPosition.y)
          context.lineTo(newPosition.x, newPosition.y)
          context.closePath()
    
          context.stroke()
        //   handleDraw(context.getImageData(0, 0, width, height))
        }
      }
    
    //   const handleDraw = (data) => {
    //     if (typeof props.onDraw === 'function') {
    //       onDraw(data)
    //     }
    //   }

      const clear = (context) => {
        context.clearRect(0, 0, width, height);
      }
    
      useEffect(() => {
        if (canvas.current) {
          const context = canvas.current.getContext('2d');

          clear(context);
          
          // TODO: scale imageData
        //   context.putImageData(props.data, 0, 0)
        }
      }, [refresh])
    


    return <canvas
                ref={canvas}
                onMouseDown={onDown}
                onTouchStart={onDown}
                onMouseUp={onUp}
                onTouchEnd={onUp}
                onMouseLeave={onUp}
                onMouseMove={onMove}
                onTouchMove={onMove}
                width={width}
                height={height}

                className="border-1 border-gray-500"
            />

}