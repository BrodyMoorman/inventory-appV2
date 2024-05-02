import React from 'react'
import { Button, Modal, ModalBody, ModalCloseButton,
     ModalContent, ModalFooter, ModalHeader, ModalOverlay,
     Text, VStack, HStack, Input, FormControl,
     FormLabel, InputGroup, InputLeftElement, useDisclosure, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import VendorSelectTab from './VendorSelectTab'
import axios from 'axios'
export default function AddVendorPartModal(props) {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [vendor, setVendor] = useState(null)
    const [vendorPN, setVendorPN] = useState('')
    const [cost, setCost] = useState('')
    const [productPage, setProductPage] = useState('')
    const handleChange = (e) => {
        switch(e.target.name){
            case "vendorPN":
                setVendorPN(e.target.value)
                break
            case "cost":
                setCost(e.target.value)
                break
            case "productPage":
                setProductPage(e.target.value)
                break
            default:
                break
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(vendorPN === ''){
            toast({
                title: 'Error',
                position: 'top',
                description: 'Vendor P/N is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        if(cost === ''){
            toast({
                title: 'Error',
                position: 'top',
                description: 'Cost is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        if(vendor === null){
            toast({
                title: 'Error',
                position: 'top',
                description: 'Vendor is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        const data = {
            partid: props.partid,
            vendorid: vendor.idvendors,
            vendorPN: vendorPN,
            cost: cost,
            productPage: productPage
        }
        if(productPage === ''){
          data.productPage = null
        }
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vendors/addpart`, data)
            toast({
                title: 'Success',
                position: 'top',
                description: 'Part added to vendor',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
            toast({
                title: 'Error',
                position: 'top',
                description: 'Error adding part to vendor',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        
        
        
    }
    const cleanUpAndClose = () => {
        setVendor(null)
        setVendorPN('')
        setCost('')
        setProductPage('')
        onClose()
    }
      

  return (
    <>
    <Button w={"full"} color={"blue.400"} variant={"outline"} border={"2px"} _hover={{bg:"blue.400", color:"white"} } onClick={onOpen} >Add Vendor</Button>
    <Modal  isOpen={isOpen} onClose={cleanUpAndClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"2xl"}>Add Vendor</ModalHeader>
          <ModalCloseButton onClick={cleanUpAndClose} />
          <ModalBody>
          <FormControl isRequired>
            <FormLabel>Vendor</FormLabel>
            <VendorSelectTab vendor={vendor} setVendor={setVendor} />
          </FormControl>
            
            {vendor &&
             <VStack mt={4} h={"full"}>
                <HStack w={"full"}>
                  <VStack w={"65%"}>
                  <FormControl isRequired>
                    <FormLabel>Vendor P/N</FormLabel>
                    <Input onChange={handleChange} name="vendorPN" />
                  </FormControl>
                  </VStack>
                  <VStack w={"35%"}>
                  <FormControl isRequired>
                    <FormLabel>Cost</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                          $
                        </InputLeftElement>
                        <Input onChange={handleChange} name="cost"  type='number'  />
                      </InputGroup>
                  </FormControl>
                  </VStack>
                </HStack>
                <FormControl>
                    <FormLabel>Product Page</FormLabel>
                    <Input onChange={handleChange} name="productPage" />
                  </FormControl>
              </VStack>}
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Add Vendor
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
