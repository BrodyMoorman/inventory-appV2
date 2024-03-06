import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { useRef, useEffect } from 'react';
import StaticShelf from './StaticShelf';


const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });



export default function StaticStorageRoom(props) {
  const constraintsRef = useRef(null)
  return (
    <ChakraBox
    bg="gray.300"
      w={`${1300/props.aspectRatio}px`}
      h={`${720/props.aspectRatio}px`}
      borderX={"2px"}
      borderBottomRadius={"inherit"}
      ref={constraintsRef}
    >
        {props.shelves.map((shelf, index) => {
            return <StaticShelf blockClick={props.blockClick} aspectRatio={props.aspectRatio} key={index} shelf={shelf} parent={constraintsRef} />
        })}

    </ChakraBox>
  )
}

