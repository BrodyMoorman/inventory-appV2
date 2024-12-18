import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import { VStack, Link, Text, HStack, IconButton, Icon, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, SimpleGrid } from '@chakra-ui/react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import VendorProductCard from '../components/VendorProductCard';
import EditVendorForm from '../components/EditVendorForm';

export default function VendorPanel() {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
    const { vendorid } = useParams()
    const { isLoading, error, data } = useQuery('vendor', () =>
    makeRequest.get(`/vendors/${vendorid}`).then((res) => {
        res.data.parts = JSON.parse(res.data.parts)
        console.log(res.data)
        return res.data
    }))

    if (isLoading) return 'Loading...'
    if (error) console.log(error)
    const handleDelete = () => {
        makeRequest.delete(`/vendors/${vendorid}`).then((res) => {
            console.log(res)
            window.location.href = "/vendors"
        })
    }
  return (
    <VStack w="full">
        
        <VStack w="90%" p="20px" bg="white" overflowX={"auto"} borderRadius="2xl" shadow="lg" m="20px" flexDirection="column" >
        
        <HStack w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize="4xl" fontWeight="semibold">{data.vendorname}</Text>
        <Menu>
            <MenuButton variant={'outline'} as={IconButton} icon={<Icon as={BsThreeDotsVertical} fontSize={"xl"} color={"gray.500"}/>} px={0}> </MenuButton>
            <MenuList>
                <MenuItem onClick={onOpen}><EditVendorForm vendor={data}></EditVendorForm></MenuItem>
                <MenuDivider/>
                <MenuItem onClick={handleDelete} color={"red.300"}>Delete Vendor</MenuItem>
            </MenuList>
            </Menu>  
        </HStack>
        <HStack w={"full"}>
          <VStack alignItems={"flex-start"} gap={-2}>
        <Text>{data.email ? data.email :  "No Recorded Email"}</Text>
        <Text>{data.phonenumber ? data.phonenumber :  "No Recorded Phone Number"}</Text>
        <Text>{data.streetaddress ? data.streetaddress + ", " +  data.city + " " + data.state + ", " + data.zip:  "No Recorded Phone Number"}</Text>
        {data.vendorlink? <Link textDecoration={"underline"} href={data.vendorlink}>Vendor Website</Link> : <Text>No Vendor Link</Text>}
        </VStack>
        </HStack>
        <VStack>
        <Text fontSize={"2xl"}>Products</Text>
        { data.parts.length === 0 || (data.parts.length === 1 && data.parts[0].partid === null) ? <Text>No Products</Text> :
        <SimpleGrid columns={[1,5]} gap={2}>
        {data.parts.map((part) => {
            return <VendorProductCard key={part.partid} part={part}/>
        }
        )}
        </SimpleGrid>
}
        </VStack>
        </VStack>
        

    </VStack>
  )
}
