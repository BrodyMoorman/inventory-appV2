import React from 'react'
import { VStack, HStack, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
export default function ShelveControls(props) {
    const [width, setWidth] = useState(props.shelf.width)
    const handleChangeWidth = (value) => {
        props.shelf.width = value
        props.updateShelf(props.shelf)
    }
    const handleChangeHeight = (value) => {
        props.shelf.height = value
        props.updateShelf(props.shelf)
    }

    useEffect(() => {
        console.log("Shelf: ", props.shelf)
    }, [width])
  return (
    <VStack w={"95%"} bg={'white'} borderRadius={"md"} p={1} boxShadow={"xl"}>
            <HStack justifyContent={"flex-start"} w={'full'} >
                <Text fontWeight={"semibold"} >{props.shelf.shelfName}</Text>
                </HStack>
                <HStack justifyContent={"flex-start"} w={'full'} >
                <Text fontWeight={"semibold"} >Width:</Text>
                    <Slider aria-label='slider-ex-1' defaultValue={props.shelf.width} onChange={handleChangeWidth} max={400}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                    </Slider>
                    <Text>{props.shelf.width}</Text>
                </HStack>
                <HStack justifyContent={"flex-start"} w={'full'} >
                <Text fontWeight={"semibold"} >Height:</Text>
                    <Slider aria-label='slider-ex-1' onChange={handleChangeHeight} defaultValue={props.shelf.height} max={400}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                    </Slider>
                    <Text>{props.shelf.height}</Text>
                </HStack>
                <HStack>
                     <Button variant={'outline'} colorScheme='red' border={"2px"} onClick={() => props.deleteShelf(props.shelf)}><DeleteIcon/></Button>
                      <Button colorScheme='blue' onClick={()=>props.duplicateShelf(props.shelf)}>Duplicate Unit</Button>
                </HStack>
                
            

        </VStack>
  )
}
