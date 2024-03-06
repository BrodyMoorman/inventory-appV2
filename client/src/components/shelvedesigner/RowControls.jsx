import { VStack, Text, Button, Accordion, AccordionPanel, AccordionIcon, AccordionItem, AccordionButton, Box,
Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from "@chakra-ui/react"
import React from 'react'
import { useEffect } from "react"

export default function RowControls(props) {
    const handleChangeWidth = (value, index) => {
        props.bins[index].width = value
        props.updateBin(props.bins[index], props.rowNum)
    }
    useEffect(() => {
        console.log("Bin: ", props.bin)
    }, [props.bin])
  return (
    <VStack w={"full"} borderRadius={"2xl"} border="2px">
      <Text w={"full"} fontSize={"lg"} fontWeight={"semibold"} px={2}>Row: {props.rowNum}</Text>
      <Text fontWeight={"semibold"} px={2}>Bins({props.bins.length})</Text>
      <Button onClick={()=>{props.addBinCallback(props.rowNum)}}>Add Bin</Button>
      <Accordion allowToggle w={"full"}>
        {props.bins.map((bin, index) => {
            return (
                <AccordionItem key={index}>
                <AccordionButton w={"full"}>
                    <Box as="span" flex='1' textAlign='left'>
                    {bin.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <Text fontWeight={"semibold"} >Width:</Text>
                    <Slider aria-label='slider-ex-1' defaultValue={bin.width} onChange={(value)=>handleChangeWidth(value,index)} max={400}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                    </Slider>
                    <Text>{bin.width}</Text>
                    <Text>Bin Type: {bin.type}</Text>
                    <Button onClick={()=>{props.deleteBinCallback(props.rowNum, index)}}>Delete Bin</Button>
                </AccordionPanel>
                </AccordionItem>
            )
        }
        )}

</Accordion>
    </VStack>
  )
}
