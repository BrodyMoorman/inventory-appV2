import React from 'react'
import { Text, HStack, SimpleGrid, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,} from '@chakra-ui/react'
import JobCard from './JobCard'
export default function MyJobs(props) {
  return (
    <>
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
      {props.data.map((job) => (
        <JobCard key={job.idjobs} job={job} />
      ))}
      
       </HStack>
    </>
  )
}
