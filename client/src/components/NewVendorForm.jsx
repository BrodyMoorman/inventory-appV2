import { VStack } from '@chakra-ui/react'
import { FormControl, FormLabel, Input, HStack,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function NewVendorForm() {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [values, setValues] = useState({
        name: '',
        email: '',
        website: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
    })
    const handleChange = (e) => {
        setValues(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(values.name === ''){
            toast({
                title: 'Error',
                position: 'top',
                description: 'Name is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        //FIX THIS SO ITS NOT SO DUMB
        if(values.phone === ''){
            values.phone = null
        }
        if(values.email === ''){
            values.email = null
        }
        if(values.website === ''){
            values.website = null
        }
        if(values.streetAddress === ''){
            values.streetAddress = null
        }
        if(values.city === ''){
            values.city = null
        }
        if(values.state === ''){
            values.state = null
        }
        if(values.zip === ''){
            values.zip = null
        }
        if(!(values.streetAddress===null) && ( values.city === null || values.state === null || values.zip === null) ){
            toast({
                title: 'Error',
                position: 'top',
                description: 'Please enter a complete address',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vendors/new`, values, {withCredentials: true})
            toast({
                title: 'Success',
                position: 'top',
                description: 'Vendor added',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            window.location.reload()
        } catch (err) {
            console.log(err)
            toast({
                title: 'Error',
                position: 'top',
                description: err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }
  return (
    <>
    <Button colorScheme="blue" onClick={onOpen}>New Vendor</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Vendor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VStack>
                <FormControl isRequired>
                <FormLabel>Vendor Name</FormLabel>
                <Input onChange={handleChange} name='name' placeholder='Name' />
                </FormControl>
                <FormControl >
                <FormLabel>Email</FormLabel>
                <Input onChange={handleChange} name='email'  />
                </FormControl>
                <HStack>
                <FormControl >
                <FormLabel>Website</FormLabel>
                <Input onChange={handleChange} name='website'  />
                </FormControl>

                <FormControl >
                <FormLabel>Phone Number</FormLabel>
                <Input onChange={handleChange} name='phone' />
                </FormControl>
                </HStack>

                <FormControl >
                <FormLabel>Street Address</FormLabel>
                <Input onChange={handleChange} name='streetAddress'  />
                </FormControl>
                <HStack>
                <FormControl >
                <FormLabel>City</FormLabel>
                <Input onChange={handleChange} name='city'  />
                </FormControl>
                <FormControl >
                <FormLabel>State</FormLabel>
                <Input onChange={handleChange} name='state' />
                </FormControl>
                <FormControl >
                <FormLabel>Zip Code</FormLabel>
                <Input onChange={handleChange} name='zip'  />
                </FormControl>
                </HStack>
                </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>

  )
}
