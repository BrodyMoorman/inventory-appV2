import React from 'react'
import { Text, HStack, SimpleGrid,Flex, Button, Modal, ModalOverlay, ModalContent,
        ModalBody, ModalHeader, ModalFooter, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react'
import AssemblyCard from '../components/JobCard'
import NewJobForm from '../components/NewJobForm'
import MyJobs from '../components/MyJobs'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import { useAuthUser } from 'react-auth-kit'

export default function JobsPanel() {
  const auth = useAuthUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, error, data } = useQuery(['jobs'], () =>
    makeRequest.get(`/jobs/user/${auth().idusers}`).then((res) => {
      console.log(res.data)
      return res.data
    })
  )
  if (isLoading) return 'Loading...'
  if (error) console.log(error)

  return (
    <Flex flexDir={"column"} overflowX="hidden">
      <HStack w="full" justifyContent="flex-end" p={1}>
        <Button colorScheme='blue' onClick={onOpen}>New Job</Button>
      </HStack>
      <MyJobs data={data} />
       <Text fontSize="3xl" fontWeight="semibold" pb="10px">All Jobs:</Text>
       <SimpleGrid minChildWidth='350px' spacing={"20px"} overflowX={'hidden'} pb="15px">
        
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
