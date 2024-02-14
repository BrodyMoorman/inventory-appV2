import { Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import AssemblyTemplateList from '../components/AssemblyTemplateList'
import RoomsSettings from '../components/RoomSettings'
export default function SettingsPanel() {
  return (
    <Flex flexDir={"column"} overflowX="hidden">
        <Text fontSize="3xl" fontWeight="semibold" pb="10px">Settings</Text>
        
        <VStack>
        <Flex w="90%" p="20px" bg="white" borderRadius="2xl" shadow="lg" m="20px" flexDirection="column" >
            <Text fontSize="2xl" fontWeight="semibold">Storage</Text>
            <VStack>
                <Text fontSize="xl">Rooms</Text>
                <RoomsSettings />
                

            </VStack>
            


        </Flex>
        <Flex w="90%" p="20px" bg="white" borderRadius="2xl" shadow="lg" m="20px" flexDirection="column" >
            <Text fontSize="2xl" fontWeight="semibold">Assemblies</Text>
            <VStack>
                <Text fontSize="xl">Assembly Templates</Text>
                <AssemblyTemplateList />

            </VStack>
            


        </Flex>
        </VStack>
        <VStack>

        </VStack>
        
    </Flex>
  )
}
