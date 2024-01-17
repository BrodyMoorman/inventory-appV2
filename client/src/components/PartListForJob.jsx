import React from 'react'
import { Flex, Box, Text, HStack } from '@chakra-ui/react'
import PartListItemForJob from './PartListItemForJob'

export default function PartListForJob(props) {
  let estimatedCost = 0
  props.parts.forEach(part => {
    estimatedCost += Number((part.partCost).toFixed(2)) * part.numNeeded
  })
  return (
    <Flex flexDirection={"column"} w={"1000px"} h={"300px"} border={"2px"} borderColor={"gray.200"} borderRadius={"2xl"}>
      <Flex w={"full"} px={3} h={"40px"} bg={"blue.300"} borderTopRadius={"inherit"}
        justifyContent={"space-between"} alignItems={"center"} fontWeight={"semibold"} color={"white"}>
        <Text fontSize={"xl"}>Parts List</Text>
        <HStack><Text fontWeight={"normal"}>Estimated Cost:</Text> <Text>${estimatedCost}</Text></HStack>
      </Flex>
      <Flex w={"full"} bg={'gray.100'}  h={"25px"}  
        justifyContent={"space-between"} alignItems={"center"} fontWeight={"semibold"}>
        <Flex w={"200px"} justifyContent={"center"} ><Text fontSize={"md"}>Part Name</Text></Flex>
        <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>Location</Text></Flex>
        <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>In Stock</Text></Flex>
        <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>Required</Text></Flex>
        <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>Charged</Text></Flex>
      </Flex>
      <Flex flexDir={"column"} overflowY={"auto"}>
      {props.parts.map((part) => {
        return <PartListItemForJob key={part.partID} part={part} />
      })}
      </Flex>
    </Flex>
  )
}
