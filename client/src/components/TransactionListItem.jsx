import React, { useEffect } from 'react'
import { Tr, Td, Text, Link,   Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Button, HStack  } from "@chakra-ui/react"
import { RepeatClockIcon } from '@chakra-ui/icons'
import { FaRegFile } from "react-icons/fa";

export default function TransactionListItem(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
 
    const handleClick = () => {
        window.location.href = `/parts/${props.partid}`
    }
    const isPositive = props.transaction.add > 0
    useEffect(() => {
      console.log(props)
  }, [])

  return (
    <>
    <Tr _hover={{ bg: "gray.100" }} onClick={onOpen} cursor={'pointer'}>
    <Td>{props.transaction.timestamp.slice(0, -5).replace('T', ' | ')}</Td>
    <Td>{props.transaction.transactiontype}</Td>
    <Td isNumeric textColor={isPositive ? "green.400": "red.400"} >{isPositive ? <>+</> : <>-</> }{props.transaction.quantity}</Td>
    <Td isNumeric>{props.transaction.stockafter}</Td>
    <Td >{props.transaction.transactorName}</Td>
    </Tr>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <p>Transaction Type: {props.transaction.transactiontype}</p>
            <p>Quantity: {props.transaction.quantity}</p>
            <p>Stock After: {props.transaction.stockafter}</p>
            <p>Transactor: {props.transaction.transactorName}</p>
            <p>Timestamp: {props.transaction.timestamp.slice(0, -5).replace('T', ' | ')}</p>
            {props.transaction.transactionfile && <HStack><Text>Transaction File:</Text><Link href={`${import.meta.env.VITE_BACKEND_STATIC_URL}/fileuploads/${props.transaction.transactionfile}`} ml={4} color={"gray.600"} alignItems={"center"} display={"flex"} isExternal>
          {props.transaction.transactionfile.slice(13)}<FaRegFile />
        </Link>
        </HStack>}

          </ModalBody>


        </ModalContent>
      </Modal>
    </>
  )
}
