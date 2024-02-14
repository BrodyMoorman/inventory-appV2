import React from 'react'
import {motion, isValidMotionProp } from "framer-motion";
import { chakra, VStack, Text, shouldForwardProp } from "@chakra-ui/react";


const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop)
  });
export default function StaticShelf(props) {
  return (
    <ChakraBox
      bg="blue.400"
      w={`${props.shelf.width}px`}
      h={`${props.shelf.height}px`}
      animate={{x:props.shelf.x, y:props.shelf.y,  rotate: 0}}
      color={"black"}
      padding="2"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position={"absolute"}
      borderRadius={"md"}
      border={props.aspectRatio > 1 ? "1px":"2px"}
      borderColor={"white"}
    >
        <VStack>
            <Text>{props.shelf.shelvename}</Text>

        </VStack>
    </ChakraBox>
  )
}
