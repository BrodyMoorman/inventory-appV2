import { HStack, Heading, Text } from '@chakra-ui/react'
import React from 'react'


export default function ToolListItem(props) {
    const map1 = new Map();


    map1.set(1, "3xl");
    map1.set(2, "2xl");
    map1.set(3, "xl");
    map1.set(4, "lg");
    map1.set(5, "md");

    const handleClick = () => {
        props.parentCallback({styleId: props.styleId, name: props.name});
    }

  return (
    <HStack  w={"full"} minH={"50px"} justifyContent={"center"} borderRadius={"lg"} p={2} bg={"white"}
    _hover={{bg:"blue.400", cursor:"pointer", color:"white"}} onClick={handleClick}
    >
        {  props.styleId < 7 ?
        <Heading size={map1.get(props.styleId)}>
            {props.name}
        </Heading>
        :
        <Text>
            {props.name}
        </Text>
        }
    </HStack>
  )
}
