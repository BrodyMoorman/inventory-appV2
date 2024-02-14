import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { useRef, useEffect } from 'react';
import Shelf from './Shelf'

const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });

export default function StorageRoom(props) {
    const updateShelf = (shelf) => {
        props.updateShelf(shelf)
    }
    const constraintsRef = useRef(null)
    const setSelectedCallback = (shelfRef) => {
        console.log("Selected shelf: ", shelfRef)
        props.callback(shelfRef)
        
    }

    useEffect(() => {
        console.log("Shelves: ", props.shelves)
    }, [props.shelves])
  return (
    <ChakraBox
      bg="gray.400"
      w={"1300px"}
      h={"720px"}
      borderX={"2px"}
      borderBottomRadius={"inherit"}
      ref={constraintsRef}
    >
        {props.shelves.map((shelf, index) => {
            return <Shelf key={shelf.id} updateShelf={updateShelf} shelf={shelf} callback={setSelectedCallback} parent={constraintsRef} />
        })}

    </ChakraBox>

  )
}
