import React from 'react'
import {motion, isValidMotionProp } from "framer-motion";
import { chakra, VStack, HStack, Text, shouldForwardProp, Modal, ModalBody, ModalOverlay, Button, ModalFooter, ModalHeader, ModalContent, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import ShelveDesigner from '../shelvedesigner/ShelveDesigner';
import ShelveViewer from '../shelveviewer/shelveviewer';
import ViewerDesignerSwitch from '../shelvedesigner/ViewerDesignerSwitch';

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
      bg={props.shelf.selected ? "green.400" : "blue.400"}
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
      onTap={props.blockClick? null :onOpen}
      cursor={props.blockClick?"":"pointer"}
      _hover={props.blockClick?{}:{
        bg: "blue.500",
        color: "white",
      }}
    >
        <VStack>
            <Text textAlign={"center"}>{props.shelf.shelvename}</Text>

        </VStack>
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.shelf.shelvename}</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <VStack border={"2px"} borderRadius={"xl"}>
              <HStack justifyContent={"flex-start"} alignItems={"center"} px={2} pt={1} w={"full"}><Text fontWeight={"semibold"}> Shelve Designer</Text></HStack>
              <ViewerDesignerSwitch aspectRatio={1} shevlveId={props.shelf.idshelvingunits} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraBox>
  )
}
