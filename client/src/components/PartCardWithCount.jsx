import { Box, Flex,Text, Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import React from 'react'

export default function PartCardWithCount(props) {
    const part = {
        partName: props.name,
        partId: props.id,
        partCount: props.partCount
    }
const handleCountChange = (e) => {
    if(e.target.value == null || e.target.value == 0)
        part.partCount = 1
    else
        part.partCount = parseInt(e.target.value)
    sendPartChangeToParent()
    
}
const sendPartChangeToParent = () => {
    props.changePartCountCallback(part)
}


  return (
    <Flex w={"full"} borderRadius={"md"} color={'white'} my={1}>
        <Box _hover={{bg:"red.100"}} cursor={"pointer"} bg={"blue.400"} w="5%"  borderLeftRadius={"inherit"} borderColor={"#C1c1c2"} onClick={() => props.removePartCallback(part)} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <CloseIcon fontSize={"10px"} color={"red.500"}  />
        </Box>
        <Box bg={"blue.400"} w="80%"  borderLeft={"0"}  display={"flex"} borderColor={"#C1c1c2"} alignItems={"center"}>
            <Text pl={1} fontWeight={"semibold"}>{part.partName}</Text>
        </Box>
        <Box bg={"blue.600"} w="15%"  borderLeft={"0"} borderRightRadius={"inherit"} borderColor={"#C1c1c2"} display={"flex"} justifyContent={"center"}>
            <Editable defaultValue={props.partCount}>
                <EditablePreview />
                <EditableInput value={part.partCount} onChange={handleCountChange} textAlign={"center"} type='number' />
            </Editable>
        </Box>
    </Flex>
  )
}
