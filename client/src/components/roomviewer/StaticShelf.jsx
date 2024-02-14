import React from 'react'
import {motion, isValidMotionProp } from "framer-motion";
import { chakra, VStack, Text, shouldForwardProp, Modal, ModalBody, ModalOverlay, Button, ModalFooter, ModalHeader, ModalContent, ModalCloseButton, useDisclosure } from "@chakra-ui/react";


const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop)
  });
export default function StaticShelf(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
      onTap={onOpen}
      cursor={"pointer"}
      _hover={{
        bg: "blue.500",
        color: "white",
      }}
    >
        <VStack>
            <Text>{props.shelf.shelvename}</Text>

        </VStack>
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.shelf.shelvename}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraBox>
  )
}
