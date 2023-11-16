import React from 'react'
import { Flex,Box, Text } from '@chakra-ui/react'

export default function TemplatePartDisplay() {
  return (
    <Flex borderRadius="md" maxW="24" maxH={"10"} _hover={{maxW:"fit-content"}}>
        <Box maxH="8" w="80%" bg="#E7e7e7" borderLeftRadius={"inherit"}  _hover={{maxWidth:"fit-content"}}  >
            <Text noOfLines="1" _hover={{maxW:"fit-content"}}>12mm Screw</Text>
        </Box>
        <Box maxH="8" w="20%" bg="#D4d4d5"  borderRightRadius={"inherit"} >
            12
        </Box>
      
    </Flex>
  )
}
