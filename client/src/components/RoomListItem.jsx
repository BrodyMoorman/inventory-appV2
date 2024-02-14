import React from 'react'
import { VStack, Text } from '@chakra-ui/react'
import { FaDoorOpen } from 'react-icons/fa'

export default function RoomListItem(props) {
    const handleRedirect = () => {
        console.log("Redirecting to room: ", props.room.idrooms)
        window.location.href=`room/${props.room.idrooms}`
    }
  return (
    <VStack onClick={handleRedirect} w={"120px"} h={"120px"} border={"2px"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} borderRadius={"xl"} borderColor={"gray.400"} color={"gray.400"} _hover={{borderColor:"blue.300", color:"blue.300"}}>
    <FaDoorOpen size={"50px"} />
        <Text fontWeight={"semibold"} color={"gray.600"}>{props.room.roomname}</Text>
    </VStack>
  )
}
