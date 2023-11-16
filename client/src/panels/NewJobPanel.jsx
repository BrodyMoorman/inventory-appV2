import { Flex, Text, HStack, Input } from '@chakra-ui/react'
import React from 'react'

export default function NewJobPanel(props) {
  return (
    <Flex justify={"center"} flexDir={"column"} alignItems={'center'} gap={'10px'} >
        <Text fontSize={"3xl"} fontWeight={"semibold"}>New Job</Text>
        <Flex justify={"center"} flexDir={"column"} alignItems={'center'} w={'80vw'} h={"75vh"}  p={'3'} borderRadius={'2xl'} maxH={'85vh'} gap={'24px'} bg={"white"} boxShadow='lg'>
          <HStack><Text>Job Name: </Text><Input placeholder="Project Name"></Input></HStack>
        </Flex>
    </Flex>
  )
}
