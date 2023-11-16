import { HStack, Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

export default function UserSelectListItem(props) {
    const id = props.idusers
    const handleClick = () => {
        console.log('user selected')
        console.log(props.id)
        props.callback(props.id)
    }
  return (
    <HStack w={'100%'} h={'50px'} bg={'white'} borderRadius={'2xl'} p={'2'} _hover={{bg:'#edf3f6'}} cursor={'pointer'} onClick={handleClick}>
        <Avatar size={"sm"} name={props.name} src={props.profilepic} />
        <Text>{props.name}</Text>
    </HStack>
  )
}
