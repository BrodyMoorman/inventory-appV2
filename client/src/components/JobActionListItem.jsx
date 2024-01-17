import React from 'react'
import { Flex, Text, VStack } from '@chakra-ui/react'

export default function JobActionListItem() {
  return (
    <Flex w={"full"} borderBottom={"1px"}  borderColor={'gray.300'} h={"40px"}  
        justifyContent={"space-between"} alignItems={"center"} fontWeight={"semibold"} cursor={"pointer"} _hover={{bg:"gray.200"}}>
          <Flex w={"200px"} justifyContent={"center"} ><Text fontSize={"md"}>Brody Moorman</Text></Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>Status Change</Text></Flex>
          <Flex w={"200px"} justifyContent={"center"} alignItems={"center"} mt={2}>
            <VStack gap={0} justifyContent={"center"}>
            <Text m={-2} p={0} fontSize={"xs"}>Status Before:</Text>
            <Text m={0} p={0} fontSize={"md"}>In Progress</Text>
            </VStack>
            </Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"} mt={2}>
          <VStack gap={0}>
            <Text m={-2} p={0} fontSize={"xs"}>Status After:</Text>
            <Text m={0} p={0} fontSize={"md"}>Completed</Text>
            </VStack></Text></Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>01/17/2024 12:34:01</Text></Flex>
    </Flex>
  )
}
