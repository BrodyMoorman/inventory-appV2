import React from 'react'
import { Tr, Td,   Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Button  } from "@chakra-ui/react"
import { RepeatClockIcon } from '@chakra-ui/icons'
export default function TransactionListItem(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
 
    const handleClick = () => {
        window.location.href = `/parts/${props.partid}`
    }
    const isPositive = props.change > 0

  return (
    <>
    <Tr _hover={{ bg: "gray.100" }} onClick={onOpen} cursor={'pointer'}>
    <Td>{props.timestamp}</Td>
    <Td>{props.type}</Td>
    <Td isNumeric textColor={isPositive ? "green.400": "red.400"} >{isPositive&& <>+</> }{props.change}</Td>
    <Td isNumeric>{props.stock}</Td>
    <Td >{props.employee}</Td>
    </Tr>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Transaction Details
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
