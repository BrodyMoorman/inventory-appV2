import React from 'react'
import { Flex, VStack, HStack, Button } from '@chakra-ui/react'
import NewRequestForm from '../components/requestpage/NewRequestForm'

export default function RequestsPanel() {
  return (
    <Flex justify={"center"} flexDir={"column"} alignItems={'center'} gap={'10px'}>
        <VStack w={"90%"} bg={"white"} borderRadius={"xl"} p={2}>
            <h1>Requests</h1>
            <HStack w={"full"} justifyContent={"flex-end"}>
                <NewRequestForm />
            </HStack>
        </VStack>
    </Flex>
  )
}
