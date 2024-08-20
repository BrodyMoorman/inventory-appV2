import React from 'react'
import { VStack, Text, HStack, Link, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, PopoverFooter } from '@chakra-ui/react'
import { ExternalLinkIcon, DeleteIcon  } from '@chakra-ui/icons'
import { makeRequest } from '../axios'

export default function VendorProductCard(props) {
    const handleDelete = () => {
        makeRequest.delete(`/vendors/part/${props.part.idpartstovendor}`).then((res) => {
            console.log(res)
            window.location.reload()
        })
    }
  return (
    <VStack p={2} bg={"blue.400"} color={"white"} w={"250px"} h={"160px"} borderRadius={'md'} border={"2px"} borderColor={"blue.600"} alignItems={"flex-start"}>
        
            <Text bg={"blue.600"} p={1} borderRadius={"md"} fontWeight={"semibold"}>{props.part.partname}</Text>
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Supplier P/N: {props.part.vendorpn}</Text>
            
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Price: ${props.part.cost}</Text>
            <HStack w={"full"} justifyContent={"space-between"}>
            <Link href={props.part.vendorpartlink}><ExternalLinkIcon /></Link>
            <Popover>
                <PopoverTrigger>
                    <DeleteIcon color="red.400" cursor={"pointer"}/>
                </PopoverTrigger>
                <PopoverContent color="black">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation</PopoverHeader>
                    <PopoverBody>Are you sure you want to delete this item from the supplier?</PopoverBody>
                    <PopoverFooter>
                        <Link color="red.400" onClick={handleDelete}>Delete</Link>
                    </PopoverFooter>
                </PopoverContent>
                </Popover>
            </HStack>
          </VStack>
  )
}
