import React from 'react'
import { useState, useEffect } from 'react'
import { Flex, VStack, HStack, Button, Modal, ModalContent, ModalHeader,
     ModalFooter, ModalBody, ModalCloseButton, ModalOverlay, useDisclosure,
     FormControl, FormLabel, Switch, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react'
import PartSelector from './PartSelector'
export default function NewRequestForm() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [part, setPart] = useState(null)


  return (
    <>
    <Button colorScheme='blue' onClick={onOpen}>New Request</Button>

    <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <HStack w={"full"}>
        <FormControl isRequired w={"65%"}>
            <FormLabel>Part</FormLabel>
            <PartSelector setPartCallback={setPart} />
        </FormControl>
        <FormControl isRequired w={"35%"}>
            <FormLabel>Number Needed</FormLabel>
            <Input type='number'  />
        </FormControl>
        
        </HStack>
        <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='email-alerts' mt='2' mb='0'>
            Urgent Request?
        </FormLabel>
        <Switch id='email-alerts' />
        </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue'  onClick={onClose}>
            Submit Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}
