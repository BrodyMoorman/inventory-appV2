import React from 'react'
import { useState } from 'react'
import { HStack, VStack, Button } from '@chakra-ui/react'
import {SettingsIcon} from '@chakra-ui/icons'

export default function FormatBlock(props) {
    const [isHovered, setIsHovered] = useState(false)
    const handleSetHover = () => {
        setIsHovered(!isHovered)
    }
  return (
    <VStack onMouseEnter={handleSetHover} onMouseLeave={handleSetHover}   minH={"80px"} p={2} w={"full"} bg={'gray.200'} borderRadius={"lg"}>
    <HStack p={1}  w={"full"} h={"25px"} justifyContent={"flex-end"}>{isHovered && <Button  size={"sm"}><SettingsIcon/></Button>}</HStack>
    <HStack w={"full"} >
        {props.columns.map (column => 
        <VStack key={column.id}  flex={1} h={"full"} p={2} bg={"white"} borderRadius={"lg"} >
            <h1>+</h1>
        </VStack>
        )}

    </HStack>
    </VStack>
  )
}
