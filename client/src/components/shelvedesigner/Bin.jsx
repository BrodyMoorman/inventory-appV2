import React from 'react'
import { VStack, chakra, Text, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { useEffect, useState } from 'react'
const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop)
  });
  




export default function Bin(props) {
    const [dragStart, setDragStart] = useState([0,0])
    useEffect(() => {
        console.log("Bin: ", props.bin)
        }, [props.bin])
    const handleDragStart = (event, info) => {
        console.log("Drag start: ", info.point)
        setDragStart([info.point.x, info.point.y])
    }
    const handleDragEnd = (event, info) => {
        console.log("Drag end: ", info.point)
        const deltaX = info.point.x - dragStart[0]
        const deltaY = 0
        if(props.bin.x + deltaX < 0) {
            props.bin.x = 0
        } else if(props.bin.x + deltaX + props.bin.width > 1297) {
            props.bin.x = 1297 - props.bin.width
        }
         else {
            props.bin.x += deltaX
        }
        console.log("DeltaX: ", deltaX, "DeltaY: ", deltaY)
        props.updateBin(props.bin)
    }
  return (
    <ChakraBox
      bg="blue.400"
      borderRadius={"md"}
      dragConstraints={props.parent}
      dragMomentum={false}
      drag="x"
      color={"black"}
      padding="2"
      display="flex"
      justifyContent="center"
      alignItems="center"
      border={"2px solid white"}
      w = {props.bin.width}
      h = {"100px"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={{x:props.bin.x, y:props.bin.y,  rotate: 0}}


      position={"absolute"}
    zIndex={1}
      dragElastic={0}
    >
        
        <VStack h={"full"} justifyContent={'flex-end'}>
        <Text color={"white"} fontWeight={"semibold"}>{props.bin.name}</Text>
        </VStack>

    </ChakraBox>
  )
}
