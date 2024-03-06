import React from 'react'
import { VStack, HStack, Text, Button } from '@chakra-ui/react'
import StaticStorageRoom from './StaticStorageRoom'
import { useQuery } from 'react-query'
import { makeRequest } from '../../axios'
import { useParams } from 'react-router-dom'

export default function RoomViewer(props) {
    const { roomid } = useParams()
    let actualroomid = roomid
    if(props.roomid) {
        actualroomid = props.roomid
    }
    const { isLoading, error, data } = useQuery('room', () => 
    makeRequest.get(`/rooms/getshelves/${actualroomid}`).then((res) => {
        console.log(res.data)
        if(props.aspectRatio > 1) {
            res.data.forEach((shelf) => {
                shelf.width = shelf.width / props.aspectRatio
                shelf.x = shelf.x / props.aspectRatio
                shelf.height = shelf.height / props.aspectRatio
                shelf.y = shelf.y / props.aspectRatio
            })
        }
        if(props.activeshelveid){
          console.log("Active shelve id: ", props.activeshelveid)
            res.data.forEach((shelf) => {
                if(shelf.idshelvingunits === props.activeshelveid) {
                    shelf.selected = true
                }
            })
        }

        return res.data
    }))
    if (isLoading) return 'Loading...'
    if (error) console.log(error)
  return (
    <>
    {data.length === 0 ? <VStack w={"full"}>
        <Text>No Shelves in this room</Text>
        <Button onClick={()=> window.location.href = `/roomdesigner/${roomid}`} colorScheme={"blue"}>Open Room Designer</Button>
    </VStack> : 
      <VStack w={`${1300/props.aspectRatio}px`} h={`${750/props.aspectRatio}px`} bg={"gray.400"} gap={0}  borderRadius={"2xl"} backgroundSize={"cover"}
        border={"2px"}>
          <HStack w={"full"}bg={"white"} h={"5%"} boxShadow={"lg"} borderTopRadius={"inherit"} pl={2} >
              <Text fontWeight={"semibold"}>Room Viewer</Text>
          </HStack>
          <StaticStorageRoom blockClick={props.roomid} aspectRatio={props.aspectRatio} shelves={data} />

      </VStack>
}
    </>
  )
}
