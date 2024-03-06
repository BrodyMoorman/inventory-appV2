import React from 'react'
import {motion, isValidMotionProp } from "framer-motion";
import { chakra, Text, shouldForwardProp, Box } from "@chakra-ui/react";
import { useRef } from 'react';
import StaticBin from './StaticBin';


const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });

export default function StaticShelveRow(props) {
    const constraintsRef = useRef(null)
    const handleUpdate = () => {
        props.handleUpdate()
    }
  return (
    <ChakraBox
    bg="gray.200"
    w={`1300/${props.aspectRatio}px`}
    h={"1fr"}
    
    display={"flex"}
    justifyContent={"flex-end"}
    flexDirection={"column"}
    ref = {constraintsRef}
    
    dragConstraints={props.parent}
  >
    {props.bins.map((bin, index) => {
      return <StaticBin aspectRatio={props.aspectRatio} handleUpdate={handleUpdate} bin={bin} idBin={bin.id} key={bin.id} parent={constraintsRef} />
    }
    )}
    <Text fontSize={"4xl"} position={"relative"}  fontWeight={"semibold"} left={"50%"} top={"-40%"} color={"gray.500"} >Row: {props.rowNum}</Text>
    <Box w={"full"} h={props.aspectRatio>1 ? "5px" : "10px"} bg="gray.900" ></Box>
   

  </ChakraBox>
  )
}
