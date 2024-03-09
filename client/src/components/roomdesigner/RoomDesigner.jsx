import { HStack, VStack, Text, Button, Slider, SliderTrack,
     SliderFilledTrack, SliderThumb, Input } from '@chakra-ui/react'
import React from 'react'
import grid from "../../assets/grid.jpg"
import StorageRoom from './StorageRoom'
import { useState, useRef } from 'react'
import ShelveControls from './ShelveControls'
import { useParams } from 'react-router-dom'
import Shelf from './Shelf'
import axios from 'axios'

export default function RoomDesigner() {
    const [count , setCount] = useState(0)
    const [selectedShelf, setSelectedShelf] = useState(null)
    const [shelves, setShelves] = useState([])
    const constraintsRef = useRef(null)
    const { roomid } = useParams()
    const addShelf = () => {
        setCount(count + 1)
        const shelfName = "Shelf " + count
        const newShelf = {
            id: count,
            shelfName: shelfName,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            rotation: 0,
            selected: false
        }

        setShelves([...shelves, newShelf])
       
    }
    const setSelectedCallback = (shelfRef) => {
        console.log("Selected shelf: ", shelfRef)
        setSelectedShelf(shelfRef)
    }
    const updateShelf = (shelf) => {
        console.log("Updating shelf: ", shelf)
        const newShelves = shelves.map((s) => {
            if(s.id === shelf.id) {
                return shelf
            } else {
                return s
            }
        })
        setShelves(newShelves)
    }
    const duplicateShelf = (shelf) => {
        setCount(count + 1)
        const newShelf = {...shelf}
        newShelf.id = count
        newShelf.shelfName = "Shelf " + count
        setShelves([...shelves, newShelf])
    }
    const deleteShelf = (shelf) => {
        const newShelves = shelves.filter((s) => {
            return s.id !== shelf.id
        })
        setShelves(newShelves)
    }
    const handleSubmit = () => {
        shelves.forEach((shelf) => {
            const data = {
                roomid: parseInt(roomid),
                shelfname: shelf.shelfName,
                width: shelf.width,
                height: shelf.height,
                x: shelf.x,
                y: shelf.y
            }
            console.log(data)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/rooms/createshelve`, data,  {withCredentials: true} )
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
                return
            })
        } )
        console.log("All shelves submitted")
    }
  return (
    <HStack>
    <VStack w={"1300px"} h={"750px"} bg={"gray.400"} gap={0}  borderRadius={"2xl"} backgroundSize={"cover"}
      border={"2px"}>
        <HStack w={"full"}bg={"white"} h={"5%"} boxShadow={"lg"} borderTopRadius={"inherit"} pl={2} >
            <Text fontWeight={"semibold"}>Room Designer</Text>
        </HStack>
        <StorageRoom shelves={shelves} updateShelf={updateShelf} callback={setSelectedCallback} />

    </VStack>
    <VStack w={"300px"} h={"750px"} bg={"gray.400"}  borderRadius={"2xl"} backgroundSize={"cover"}
      border={"2px"}>
        <HStack w={"full"}bg={"white"} h={"40px"} boxShadow={"lg"} borderTopRadius={"inherit"} pl={2} >
            <Text fontWeight={"semibold"}>Room Tools</Text>
            
        </HStack>
        {shelves.length > 0 && <Button m={2} w={"90%"} h={"50px"} colorScheme='blue' onClick={handleSubmit}>Submit</Button>}
        <Button onClick={addShelf}>Add Unit</Button>
        <VStack w={"full"} overflowY={"auto"} maxH={"540px"}>
        {shelves.map((shelf, index) => {
                return(<ShelveControls deleteShelf={deleteShelf} duplicateShelf={duplicateShelf} updateShelf={updateShelf} shelf={shelf} key={index} />)
            })
        }
        </VStack>
    </VStack>
    </HStack>
  )
}
