import React from 'react'
import { VStack, HStack, Text } from '@chakra-ui/react'
import StaticStorageRoom from './StaticStorageRoom'
import { useQuery } from 'react-query'
import { makeRequest } from '../../axios'
import { useParams } from 'react-router-dom'

export default function RoomViewer(props) {
    const { roomid } = useParams()
    const { isLoading, error, data } = useQuery('room', () => 
    makeRequest.get(`/rooms/getshelves/${roomid}`).then((res) => {
        console.log(res.data)
        if(props.aspectRatio > 1) {
            res.data.forEach((shelf) => {
                shelf.width = shelf.width / props.aspectRatio
                shelf.x = shelf.x / props.aspectRatio
                shelf.height = shelf.height / props.aspectRatio
                shelf.y = shelf.y / props.aspectRatio
            })
        }
        return res.data
    }))
    if (isLoading) return 'Loading...'
    if (error) console.log(error)
  return (
    <VStack w={`${1300/props.aspectRatio}px`} h={`${750/props.aspectRatio}px`} bg={"gray.400"} gap={0}  borderRadius={"2xl"} backgroundSize={"cover"}
      border={"2px"}>
        <HStack w={"full"}bg={"white"} h={"5%"} boxShadow={"lg"} borderTopRadius={"inherit"} pl={2} >
            <Text fontWeight={"semibold"}>Room Viewer</Text>
        </HStack>
        <StaticStorageRoom aspectRatio={props.aspectRatio} shelves={data} />

    </VStack>
  )
}