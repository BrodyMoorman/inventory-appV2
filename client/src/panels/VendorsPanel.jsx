import { Flex, Text, VStack,
    HStack,
    Input,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,

 } from '@chakra-ui/react'
 import NewVendorForm from '../components/NewVendorForm'
 import VendorsList from '../components/VendorsList'
 import { useQuery } from 'react-query'
 import { makeRequest } from '../axios'
 import { useState, useEffect } from 'react'
 import Paginator from '../components/Paginator'

 
import React from 'react'

export default function VendorsPanel() {
    const toast = useToast()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalResults, setTotalResults] = useState(0)
    const [resultsPerPage, setResultsPerPage] = useState(9)
    
    
    const { isloading, error, data, refetch } = useQuery(['vendors'], () =>
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
    <VStack w="full">
        
        <VStack w="90%" p="20px" bg="white" overflowX={"auto"} borderRadius="2xl" shadow="lg" m="20px" flexDirection="column" >
        <Text fontSize="4xl" fontWeight="bold" pb="10px">Vendors</Text>
        <HStack w={"full"} justifyContent={"space-between"}>
        <Input placeholder="Search" maxW={"400px"} onChange={(e) => setSearch(e.target.value)} />
        <NewVendorForm />
        </HStack>
        {data && <VendorsList vendors={data} />}

        <Paginator totalPages={totalPages} page={page} setPage={setPage} />
        <Text>Total Results: {totalResults}</Text>
        </VStack>
        

    </VStack>
  )
}
