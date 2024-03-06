import React from 'react'
import { HStack, Avatar, Text } from '@chakra-ui/react'

export default function TeamListItem(props) {
    const handleClick = () => {
        window.location.href = `/users/${props.user.idusers}`
    }
  return (
    <HStack w={'100%'} h={'50px'} bg={'gray.200'} borderRadius={'2xl'} p={'2'} _hover={{bg:'#edf3f6'}} cursor={'pointer'} onClick={handleClick} justifyContent={"space-between"}>
    <HStack>
    <Avatar size={"sm"} name={props.user.name} src={props.user.profilepic} />
    <Text>{props.user.name}</Text>
    </HStack>
    {props.user.permissionlevel === 3 && <Text>Admin</Text>}
    {props.user.permissionlevel === 2 && <Text>Member</Text>}
    {props.user.permissionlevel === 1 && <Text>Unverified</Text>}
    </HStack>
  )
}
