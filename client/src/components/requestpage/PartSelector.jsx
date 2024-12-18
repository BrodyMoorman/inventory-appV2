import React from 'react'
import { useState, useEffect } from 'react'
import { Flex, Text, VStack, HStack, Button, Popover,
  PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverFooter, PopoverArrow,
  PopoverCloseButton, PopoverAnchor, Input } from '@chakra-ui/react'
import { makeRequest } from '../../axios'
import { useQuery } from 'react-query'
import Paginator from '../Paginator'
import MiniPartList from './MiniPartList'

export default function PartSelector(props) {

  const [part, setPart] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultsPerPage] = useState(props.resultsPerPage || 5)
  const [partNoSearch, setPartNoSearch] = useState('')




  const { isLoading, error, data, refetch } = useQuery(['parts'], () =>
    makeRequest.get('/parts/search/searchlength', { params: { search: search, partNoSearch: partNoSearch, searchingPartNo: (partNoSearch!=='')} }).then((res) =>{
      setTotalResults(res.data.count)
      setTotalPages(Math.ceil(res.data.count / resultsPerPage))
      let offset = (page - 1) * resultsPerPage
      let limit = resultsPerPage
      let data ={ params: { search: search, offset: offset, limit: limit } }
      if(partNoSearch !== '') {
        data.params.searchingPartNo = true
        data.params.search = partNoSearch
      }
      return makeRequest.get('/parts/', data ).then((res) => {
        return res.data
      })
    })
  )

  useEffect(() => {
    refetch()
  }, [search, page, partNoSearch])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handlePartNoChange = (e) => {
    setPartNoSearch(e.target.value)
  }

  const handleSelect = (selectedPart) => {
    setPart(selectedPart)
    props.setPartCallback(selectedPart)
  }
  if (isLoading) return 'Loading...'
  if (error) console.log(error)
  return (
    <Popover>
    <PopoverTrigger>
    
      <Flex alignItems={"center"} p={2} w="90%" cursor={"pointer"} h={"40px"} border={"1px"} borderColor={"gray.200"} borderRadius={"md"}> 
        <Text>{!part ? "Select Part" : part.partname}</Text>
      </Flex>
    </PopoverTrigger>
    <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Part List</PopoverHeader>
    <PopoverBody>
      <HStack>
        <Input w={"45%"} placeholder='Part No.' onChange={handlePartNoChange}></Input>
        <Input isDisabled={partNoSearch!==''} placeholder='Name' onChange={handleChange}></Input>
      </HStack>
      <VStack w={"full"} >
        <MiniPartList data={data} setPart={handleSelect} />
      <Paginator page={page} setPage={setPage} totalPages={totalPages} />
      <Text>Total Results: {totalResults}</Text>
      </VStack>
    </PopoverBody>
  </PopoverContent>
    </Popover>
  )
}
