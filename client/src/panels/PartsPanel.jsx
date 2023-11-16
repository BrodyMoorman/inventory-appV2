import React from 'react'
import { Flex, Input, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,} from '@chakra-ui/react'
import PartList from '../components/PartList'
import NewPart from '../components/NewPart'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'

export default function PartsPanel() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, error, data } = useQuery(['parts'], () =>

  makeRequest.get('/parts').then((res) => {
    console.log(res.data)
    return res.data

  })
  )
  if (isLoading) return 'Loading...'
  if (error) console.log(error)


  
 
  return (
    <Flex justify={"center"} flexDir={"column"} alignItems={'center'} gap={'10px'} >
        <Flex justify={"center"} flexDir={"column"} alignItems={'center'} w={'80vw'}  p={'3'} borderRadius={'2xl'} maxH={'85vh'} gap={'24px'} bg={"white"} boxShadow='lg'>
          
        <Heading fontSize={"5xl"}>Parts</Heading>
        <Flex w={'full'} justify={'space-between'} pl={'20px'} pr={'20px'}>
        
        <Input placeholder='Search' maxW={'600px'} minH={'35px'}  />
        <Button ml={'2'} colorScheme='blue' onClick={onOpen} >Add Part</Button>

        </Flex>
        
        <PartList data={data} />
        </Flex> 
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Part</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewPart />
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
        
    </Flex>
  )
}
