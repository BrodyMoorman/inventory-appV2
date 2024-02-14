import React from 'react'
import { chakra, VStack, Text, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop)
  });

export default function Shelf(props) {
    const [dragStart, setDragStart] = useState([0,0])
    const [dragEnd, setDragEnd] = useState([0,0])
    const [selected, setSelected] = useState(false)
    const [height, setHeight] = useState(120)
    const selfRef = useRef(null)
    const handleClicked = () => {
        props.callback(selfRef)

    }
    useEffect(()=> {
        console.log("Shelf height: ", height)
    }, [props.shelf])
    const handleDragStart = (event, info) => {
        console.log("Drag start: ", info.point)
        setDragStart([info.point.x, info.point.y])
    }
    const handleDragEnd = (event, info) => {
        console.log("Drag end: ", info.point)
        setDragEnd([info.point.x, info.point.y])
        const deltaX = info.point.x - dragStart[0]
        const deltaY = info.point.y - dragStart[1]
        if(props.shelf.x + deltaX < 0) {
            props.shelf.x = 0
        } else if(props.shelf.x + deltaX + props.shelf.width > 1297) {
            props.shelf.x = 1297 - props.shelf.width
        }
         else {
            props.shelf.x += deltaX
        }
        if(props.shelf.y + deltaY < 0) {
            props.shelf.y = 0
        }else if(props.shelf.y + deltaY + props.shelf.height > 709) {
            props.shelf.y = 709 - props.shelf.height
        }
         else {
            props.shelf.y += deltaY
        }

        props.updateShelf(props.shelf)
        console.log("DeltaX: ", deltaX, "DeltaY: ", deltaY)
    }
  return (
    <ChakraBox
      bg="blue.400"
      w={`${props.shelf.width}px`}
      h={`${props.shelf.height}px`}
      borderRadius={"md"}
      dragConstraints={props.parent}
      dragMomentum={false}
      animate={{x:props.shelf.x, y:props.shelf.y,  rotate: 0}}
      drag
      color={"black"}
      padding="2"
      display="flex"
      justifyContent="center"
      alignItems="center"
      border={"2px solid white"}
      
      onTap={handleClicked}
      position={"absolute"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragElastic={0}
    >
        <VStack>
        <Text>{props.shelf.shelfName}</Text>
        <Text>Width: {props.shelf.width}</Text>
        </VStack>

    </ChakraBox>
  )
}
