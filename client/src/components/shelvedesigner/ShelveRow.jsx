import React from 'react'
import {motion, isValidMotionProp } from "framer-motion";
import { chakra, Text, shouldForwardProp, Box } from "@chakra-ui/react";
import { useRef } from 'react';
import Bin from './Bin';


const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  

export default function ShelveRow(props) {
  const updateBin = (bin) => {
    props.updateBin(bin, props.rowNum)
  }
  const constraintsRef = useRef(null)
  return (
    <ChakraBox
    bg="gray.200"
    w={"1300px"}
    h={"1fr"}
    
    display={"flex"}
    justifyContent={"flex-end"}
    flexDirection={"column"}
    ref = {constraintsRef}
    
    dragConstraints={props.parent}
  >
    {props.bins.map((bin, index) => {
      return <Bin  updateBin={updateBin} bin={bin} idBin={bin.id} key={bin.id} parent={constraintsRef} />
    }
    )}
    <Text fontSize={"4xl"} position={"relative"}  fontWeight={"semibold"} left={"50%"} top={"-40%"} color={"gray.500"} >Row: {props.rowNum}</Text>
    <Box w={"full"} h={"10px"} bg="gray.900" ></Box>
   

  </ChakraBox>
  )
}
