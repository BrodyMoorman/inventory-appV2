import React from 'react'
import { Flex, Text, Input, HStack, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,} from '@chakra-ui/react'
import PartList from '../components/PartList'
import NewPart from '../components/NewPart'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import { useState, useEffect } from 'react'
import Paginator from '../components/Paginator'
import axios from 'axios'

export default function PartsPanel() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultsPerPage] = useState(9)
  const [partNoSearch, setPartNoSearch] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  
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

  if (isLoading) return 'Loading...'
  if (error) console.log(error)

  return (
    <Flex justify={"center"} flexDir={"column"} alignItems={'center'} gap={'10px'}>
      <Flex justify={"center"} flexDir={"column"} alignItems={'center'} w={'80vw'} p={'3'} borderRadius={'2xl'} maxH={'85vh'} gap={'24px'} bg={"white"} boxShadow='lg'>
        <Heading fontSize={"5xl"}>Parts</Heading>
        <Flex w={'full'} justify={'space-between'} pl={'20px'} pr={'20px'}>
          <HStack>
              <Input placeholder='Part No.' maxW={'200px'} minH={'35px'} onChange={handlePartNoChange} />
              <Input isDisabled={partNoSearch!==''} placeholder='Search' maxW={'600px'} minH={'35px'} onChange={handleChange} />

          </HStack>

          <Button ml={'2'} colorScheme='blue' onClick={onOpen}>Add Part</Button>
        </Flex>
        <PartList data={data} />
        <Paginator page={page} setPage={setPage} totalPages={totalPages} />
        <Text>Total Results: {totalResults}</Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Part</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewPart />
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
