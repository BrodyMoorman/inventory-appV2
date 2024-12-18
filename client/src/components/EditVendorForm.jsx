import React from 'react'
import { useState } from 'react'
import { Button, useToast, Text, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
     useDisclosure, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { makeRequest } from '../axios'

export default function EditVendorForm(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [vendor, setVendor] = useState(props.vendor)
    const toast = useToast()
    const handleChange = (e) => {
        setVendor({...vendor, [e.target.name]: e.target.value})
    }
    const handleSubmit = () => {
        makeRequest.put(`/vendors/${vendor.idvendors}`, vendor).then((res) => {
            console.log(res)
            toast({
                title: "Vendor Updated",
                description: "Vendor has been updated successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            window.location.reload()
        })

    }
    
  return (
    <>
      <Text w={"full"}  h={"full"} onClick={onOpen}>Edit Vendor</Text>

      <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Vendor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <FormLabel>Vendor Name</FormLabel>
                <Input name='vendorname' value={vendor.vendorname} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name='email' value={vendor.email} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input name='phonenumber' value={vendor.phonenumber} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel>Street Address</FormLabel>
                <Input name='streetaddress' value={vendor.streetaddress} onChange={handleChange} />
            </FormControl>
            <HStack>
            <FormControl>
                <FormLabel>City</FormLabel>
                <Input name='city' value={vendor.city} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel>State</FormLabel>
                <Input name='state' value={vendor.state} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel>ZIP</FormLabel>
                <Input name='zip' value={vendor.zip} onChange={handleChange} />
            </FormControl>
            </HStack>
            <FormControl>
                <FormLabel>Website</FormLabel>
                <Input name='vendorlink' value={vendor.vendorlink} onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue'  onClick={handleSubmit}>
              Submit
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
