import { Box, Text, Tag, TagLabel, Spinner, VStack, HStack } from '@chakra-ui/react'
import { CloseIcon, CheckIcon, TimeIcon} from '@chakra-ui/icons'
import React from 'react'

export default function AssemblyCard(props) {
  return (
    <Box bg={"white"} minW="350px" maxW="350px" h="150px" rounded='2xl' shadow="lg" p="10px" cursor={"pointer"} transition={".5s"} _hover={{shadow:"xl"}}>
      <VStack justify="flex-start" alignItems={"flex-start"} h="100%">
        <HStack h="50%" w="full" justifyContent={"space-between"} alignItems={"flex-start"}>
          <Box>
            <Text fontSize="xl" fontWeight="semibold">Assembly Title</Text>
            
            {/* <Tag size="md" variant="solid" colorScheme="yellow" borderRadius="full" px="2" mr="2">
                <Spinner size={"xs"} mr={"4px"} speed= "2s"/>
                <TagLabel>In Progress</TagLabel>
            </Tag> */}
            <Tag size="md" variant="solid" colorScheme="green" borderRadius="full" px="2" mr="2">
                <CheckIcon size={"xs"} mr={"4px"}/>
                <TagLabel>Completed</TagLabel>
            </Tag>
            {/* <Tag size="md" variant="solid" colorScheme="red" borderRadius="full" px="2" mr="2">
                <CloseIcon size={"xs"} mr={"4px"}/>
                <TagLabel>Canceled</TagLabel>
            </Tag> */}
            {/* <Tag size="md" variant="solid" colorScheme="orange" borderRadius="full" px="2" mr="2">
                <TimeIcon size={"xs"} mr={"4px"}/>
                <TagLabel>Overdue</TagLabel>
            </Tag> */}
            <Text>Expected: 10/29/23</Text>
          </Box>
          <Text>Brody Moorman</Text>
        </HStack>
        <Box h="50%" w="100%">
          <VStack justify="flex-end" alignItems={"flex-end"} h="full">
          <Text pt={"max"}>Date Created: 10/5/23</Text>
          </VStack>
        </Box>
      </VStack>
        
    </Box>
  )
}
