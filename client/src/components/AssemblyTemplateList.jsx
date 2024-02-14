import React from 'react'

import { Accordion, VStack, Button, useDisclosure, Drawer, DrawerOverlay,
        DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter,
        Stack, Box, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon,
        Select, Textarea, Text
} from '@chakra-ui/react'

import { useQuery } from 'react-query'
import { makeRequest } from '../axios'

import NewAssemblyTemplate from './NewAssemblyTemplate'
import AssemblyTemplateListItem from './AssemblyTemplateListItem'



export default function AssemblyTemplateList() {

  const { isLoading, error, data } = useQuery(['parts'], () =>

  makeRequest.get('/templates').then((res) => {
    console.log(res.data)
    return res.data

  })
  )
  if (isLoading) return 'Loading...'
  if (error) console.log(error)




  return (
    <VStack w="full" >
    <Accordion allowToggle w="full" maxH="96" overflowY="auto" p={1}>
        {data.map((template, index) => {
            return (
              <AssemblyTemplateListItem key={index} id={template.transaction_id} name={template.transaction_name} designDoc={template.designdocument} description={template.transaction_description} parts={template.parts} />
            )
        })}
    </Accordion>
    <NewAssemblyTemplate />
    </VStack>
  )
}
