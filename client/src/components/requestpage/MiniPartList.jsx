import React from 'react'
import { HStack, VStack, Text } from '@chakra-ui/react'

export default function MiniPartList(props) {
    const selectPart = (selectedPart) => {
        props.setPart(selectedPart)
    }
  return (
    <VStack mt={2} w={"full"}>
        <HStack w={"full"} fontWeight={"semibold"} justifyContent={"space-between"} p={2}>
            <Text>Part Name</Text>
            <Text>Part No.</Text>
        </HStack>
        {props.data.map((part) => (
            <HStack onClick={()=>selectPart(part)} w={"full"} justifyContent={"space-between"} borderRadius={"md"} p={2} key={part.idparts}
            cursor="pointer" _hover={{bg: "blue.500", color: "white", fontWeight:"semibold"}}>
                <p>{part.partname}</p>
                <p>{part.idparts}</p>
            </HStack>
        ))}
    </VStack>
  )
}
