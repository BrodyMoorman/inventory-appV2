import React from 'react'
import { Tr, Td,   Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Button  } from "@chakra-ui/react"
import { redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import QuickAction from './QuickAction'

export default function PartListItem(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
 
    const handleClick = () => {
        window.location.href = `/parts/${props.partid}`
    }
  return (
    <>
    <Tr _hover={{ bg: "gray.100" }} onClick={onOpen} cursor={'pointer'}>
    <Td>{props.partNo}</Td>
    <Td>{props.name}</Td>
    <Td>{props.location}</Td>
    <Td isNumeric>{props.stock}</Td>
    <Td isNumeric>${props.cost}</Td>
    </Tr>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QuickAction />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'onClick={handleClick}>Part Page</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    
  )
}
