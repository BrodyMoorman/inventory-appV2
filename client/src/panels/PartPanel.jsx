import React from 'react'
import { Flex, Input, Heading, Grid, GridItem , Text,  VStack, Link, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,} from '@chakra-ui/react'
import TransactionList from '../components/TransactionList'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import TransactionForm from '../components/TransactionForm'

import { ExternalLinkIcon, ArrowBackIcon } from '@chakra-ui/icons'

export default function PartPanel(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, error, data } = useQuery(['part'], () => 

  makeRequest.get(`/parts/${props.id}`).then((res) => {
    return res.data
  })
  )

  if (isLoading) return 'Loading...'
  if (error) console.log(error)
 
  const handleBack = () => {
    window.history.back()
  }

  return (
    <Flex justify={"center"} flexDir={"column"} alignItems={'center'} gap={'10px'} >
    <Flex  flexDir={"column"} alignItems={'center'} w= {{base:'100vw', lg:'80vw'}}  p={'3'} borderRadius={'2xl'} h={{base:'85vh', lg:'85vh'}} gap={'24px'} >
    
    {/* <img  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:5173/parts/${props.id}`} alt="" />
    <Heading fontSize={"5xl"}>Part {props.id}</Heading>
    <Input placeholder='Search' maxW={'600px'} minH={'35px'}  /> */}
    <HStack w="full" justifyContent={"flex-start"}>
    <Button leftIcon={<ArrowBackIcon />}  colorScheme='black' variant='outline' onClick={handleBack}>
    Back
  </Button>
    </HStack>
    <Grid
      h='full'
      w={'full'}
      templateRows='repeat(3, 1fr)'
      templateColumns='repeat(7, 1fr)'
      gap={3}
    >
  <GridItem rowSpan={1} colSpan={5} boxShadow='lg' bg="white" rounded={"2xl"} p='10px'  >
    <Heading fontSize={"5xl"}>{data.partname}</Heading>
    <Text fontSize={"3xl"}>Part No. {data.idparts}</Text>
    <Text fontSize={"3xl"}>{data.location}</Text>
  </GridItem>
  <GridItem colSpan={2}   display={"flex"} justifyContent={"flex-start"} alignItems={"center"} flexDir={"column"} boxShadow='lg' bg="white" rounded={"2xl"} p='10px' >
  <Heading fontSize={"5xl"}>Stock: {data.count} </Heading>
    <Button colorScheme='blue' w={"200px"} rounded={"2xl"} onClick={onOpen} >Create Transaction</Button>
  </GridItem>
  <GridItem colSpan={5} rowSpan={2}  padding={"10px"} boxShadow='lg' bg="white" rounded={"2xl"} p='10px' >
    <HStack justify={"space-between"}>
      <Heading>Item Transactions</Heading>
      <Button colorScheme='blue' >Generate Report</Button>
    </HStack>
    
    <TransactionList />
  </GridItem>
  <GridItem colSpan={2} rowSpan={1}  padding={"10px"} display={'flex'} justifyContent={"flex-end"} flexDir={"column"} alignItems={"flex-end"} boxShadow='lg' bg="white" rounded={"2xl"} p='10px'  > 
    
  <HStack justifyContent={"flex-start"} alignItems={"flex-start"} w={"100%"}><Heading>Item Details</Heading></HStack>
    <VStack alignItems={"flex-end"} gap={"-10px"}>
    <Text fontSize={"3xl"}>Cost: ${data.cost}</Text>
    <Text fontSize={"3xl"}>Supplier: {data.vendor}</Text>
    <Text fontSize={"3xl"}>Supplier Part No. {data.vendorpartno}</Text>
    <Link href='https://google.com' isExternal>
      Resuply Link <ExternalLinkIcon mx='2px' />
    </Link>

    </VStack>
  </GridItem>
  <GridItem colSpan={2} rowSpan={1}  padding={"10px"} display={'flex'} justifyContent={"flex-end"} flexDir={"column"} alignItems={"flex-end"} boxShadow='lg' bg="white" rounded={"2xl"} p='10px'  >
  <HStack justifyContent={"flex-start"} alignItems={"flex-start"} w={"100%"}><Heading>Quick Access</Heading></HStack>
  <img  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:5173/parts/${props.id}`}></img>
  </GridItem>
</Grid>
    </Flex> 
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TransactionForm id={props.id} stock={data.count} />
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
</Flex>
  )
}
