import { HStack, VStack, Text, Button, Modal, ModalContent, ModalHeader,
     ModalBody, ModalFooter, useDisclosure, ModalOverlay, ModalCloseButton,
    FormControl, FormLabel, Input, FormErrorMessage, useToast,  } from '@chakra-ui/react'

import React from 'react'
import { useState } from 'react';
import { FaDoorOpen } from "react-icons/fa";
import axios from 'axios';
import { useQuery } from 'react-query';
import { makeRequest } from '../axios';
import RoomListItem from './RoomListItem';

export default function RoomsSettings() {


    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input, setInput] = useState('')
    const [isError, setIsError] = useState(false)

    const { isLoading, error, data } = useQuery(['rooms'], () =>
    makeRequest.get('/rooms').then((res) => {
        console.log(res.data)
        return res.data

    }))
    if (isLoading) return 'Loading...'
    if (error) console.log(error)
    const handleInputChange = (e) => {
        setInput(e.target.value)
    }
    const handleCreateRoom= async () => {
        if(input === '') {
            setIsError(true)
        } else {
            setIsError(false)
            const values = {
                roomName: input
            }
            try{
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/rooms/new`, values, {withCredentials: true}).then(res => {
                toast({
                    title: "Room Created.",
                    status: "success",
                    duration: 2000,
                    position: "top"
                    })



        }).catch(err => {
            
                toast({
                    title: "Error",
                    description: "Room could not be created.",
                    status: "error",
                    duration: 2000,
                    position: "top"
                    
                    })
            })
    }catch(err) {
        console.log(err)
        toast({
            title: "Error",
            description: "Room could not be created.",
            status: "error",
            duration: 2000,
            position: "top"
            })
    }
        onClose()
    }

    }
  return (
    <VStack>
        <HStack>
            {data.map((room, index) => {
              return(
                <RoomListItem key={index} room={room} />
              )
            })}

        </HStack>
        <Button colorScheme='blue' onClick={onOpen}>New Room</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired isInvalid={isError}>
            <FormLabel>Room Name</FormLabel>
            <Input type='text' value={input} onChange={handleInputChange} />
                {isError && <FormErrorMessage>Room Name is required.</FormErrorMessage>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreateRoom}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </VStack>
  )
}
