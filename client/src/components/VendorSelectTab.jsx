import { HStack, VStack, Divider, Popover, PopoverArrow, PopoverBody, Input, PopoverContent, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react'
import React from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import Paginator from './Paginator'


export default function VendorSelectTab(props) {
    
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalResults, setTotalResults] = useState(0)
    const [resultsPerPage, setResultsPerPage] = useState(9)
    const { isloading, error, data, refetch } = useQuery(['vendorssearch'], () =>
    makeRequest.get('/vendors/searchlength', {params: {search: search}}).then((res) => {
        setTotalResults(res.data.count)
        setTotalPages(Math.ceil(res.data.count / resultsPerPage))
        let offset = (page - 1) * resultsPerPage
        let limit = resultsPerPage
        let data = {params: {search: search, offset: offset, limit: limit}}
        return makeRequest.get('/vendors/', data).then((res) => {
          return res.data
        })  
      })
    )
    useEffect(() => {
        refetch()
      }, [search, page])
    if (isloading) return 'Loading...'
    if (error) console.log(error)
  return (

    <Popover>
    <PopoverTrigger>
        {props.vendor ?
            <HStack w={64} h={12} cursor={"pointer"} justifyContent={"space-between"}  border={"2px"}  borderRadius={"md"} p={2} borderColor={"gray.500"}>
            <Text color={"black"} >{props.vendor.vendorname}</Text>
            <ChevronDownIcon color={"gray.500"} fontSize={"xl"}/>

        </HStack>:
            <HStack w={64} h={12} cursor={"pointer"} justifyContent={"space-between"} border={"2px"}  borderRadius={"md"} p={2} borderColor={"gray.500"}>
            <Text color={"gray.500"} >Select Vendor</Text>
            <ChevronDownIcon color={"gray.500"} fontSize={"xl"}/>
        </HStack>}

    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>Vendors</PopoverHeader>
      <PopoverBody>
        <VStack>
        <HStack w="full" justifyContent={"space-between"} mb={2}>
        <Input placeholder="Search" maxW={"400px"} onChange={(e) => setSearch(e.target.value)} />

        </HStack>
        <VStack w={"full"} border={"1px"} py={1} borderColor={"gray.300"}>
        {data && data.map((vendor) => {
          return(
            <VStack onClick={()=>props.setVendor(vendor)} pl={1} pt={2} m={-1} cursor={'pointer'} _hover={{bg:"gray.200"}} w={"full"} key={vendor.idvendors}>
                <HStack w={"full"}>
                <Text>{vendor.vendorname}</Text>
                </HStack>
                <Divider></Divider>
            </VStack>
          ) 
        })}
        </VStack>

        <Paginator totalPages={totalPages} page={page} setPage={setPage} />
        <Text>Total Results: {totalResults}</Text>
        </VStack>
        
      </PopoverBody>
    </PopoverContent>
  </Popover>
  )
}
