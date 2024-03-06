import React from 'react'
import { Text, HStack, SimpleGrid, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,} from '@chakra-ui/react'
import JobCard from './JobCard'
export default function MyJobs(props) {
  return (
    <>
    <Text fontSize="3xl" fontWeight="semibold" pb="10px">My Jobs:</Text>
    <SimpleGrid columns={[1,4]} spacing={5} p={2}>
      {props.data.map((job) => (
        <JobCard key={job.idjobs} job={job} />
      ))}
      
      </SimpleGrid>
    </>
  )
}
