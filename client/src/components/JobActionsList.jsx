import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import JobActionListItem from './JobActionListItem'

export default function JobActionsList() {
  return (
    <Flex flexDirection={"column"} w={"1000px"} h={"300px"} border={"2px"} borderColor={"gray.200"} borderRadius={"2xl"}>
      <Flex w={"full"} px={3} h={"40px"} bg={"blue.300"} borderTopRadius={"inherit"}
        justifyContent={"space-between"} alignItems={"center"} fontWeight={"semibold"} color={"white"}>
        <Text fontSize={"xl"}>Job Actions</Text>
        
      </Flex>
      <Flex w={"full"} bg={'gray.100'}  h={"25px"}  
        justifyContent={"space-between"} alignItems={"center"} fontWeight={"semibold"}>
        <Flex w={"200px"} justifyContent={"center"} ><Text fontSize={"md"}>User</Text></Flex>
        <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>Action Type</Text></Flex>
        <Flex w={"400px"} justifyContent={"center"}><Text fontSize={"md"}>Action Details</Text></Flex>
        <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>Timestamp</Text></Flex>
      </Flex>
      <JobActionListItem />

    </Flex>
  )
}