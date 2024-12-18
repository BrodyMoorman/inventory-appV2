import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import EditorPanel from './EditorPanel'
export default function EditorModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Button onClick={onOpen}>Create Design Document</Button>

    <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Design Document Editor</ModalHeader>
        <ModalCloseButton />
        <ModalBody  bg={"gray.200"}>
            <EditorPanel />
        </ModalBody>

        <ModalFooter bg={"gray.200"} >
          <Button  colorScheme='blue' mr={3} onClick={onClose}>
            Save
          </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}
