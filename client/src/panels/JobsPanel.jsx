import React from 'react'
import { Text, HStack, SimpleGrid,Flex, Button, Modal, ModalOverlay, ModalContent,
        ModalBody, ModalHeader, ModalFooter, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react'
import AssemblyCard from '../components/AssemblyCard'
import NewJobForm from '../components/NewJobForm'
export default function JobsPanel() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex flexDir={"column"} overflowX="hidden">
      <HStack w="full" justifyContent="flex-end" p={1}>
        <Button colorScheme='blue' onClick={onOpen}>New Job</Button>
      </HStack>
      <Text fontSize="3xl" fontWeight="semibold" pb="10px">My Jobs:</Text>
      <HStack spacing="2" overflow="auto" pb="4"
      __css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#4A5568',
          borderRadius: '24px',
        },
      }}
      >
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />
      <AssemblyCard />

       </HStack>
       <Text fontSize="3xl" fontWeight="semibold" pb="10px">All Jobs:</Text>
       <SimpleGrid minChildWidth='350px' spacing={"20px"} overflowX={'hidden'} pb="15px">
        <AssemblyCard />
        <AssemblyCard />
        <AssemblyCard />
        <AssemblyCard />
        <AssemblyCard />
        <AssemblyCard />
        <AssemblyCard />
        <AssemblyCard />
        
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewJobForm />
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
