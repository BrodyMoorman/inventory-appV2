import React from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, 
        UnorderedList, ListItem, Text, Button, HStack,
        Link
} from '@chakra-ui/react'

import TemplatePartDisplay from './TemplatePartDisplay'

import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import PdfViewer from './PdfViewer'
import { FaRegFile } from "react-icons/fa";

export default function AssemblyTemplateListItem(props) {

  const handleDelete = async (e) => {
    e.preventDefault()
    try{
      const res = await makeRequest.delete(`/templates/${props.id}`)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
    window.location.reload()
  }

  return (
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            {props.name}
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Text fontWeight="semibold">Description:</Text>
        <Text>{props.description}</Text>
        <Text fontWeight="semibold">Parts List:</Text>
        <UnorderedList maxH={24}w={"50%"} display={"flex"} flexDirection={"column"} flexWrap={"wrap"} mb={2}>
            {props.parts.map((part, index) => {
                return (
                  <ListItem key={index} display={"flex"} gap={"1"}><Text>{part.partName}</Text> <Text fontWeight="semibold">x{part.partCount}</Text> </ListItem>
                )
            })}

        </UnorderedList>
        {(props.designDoc) &&
        <Box mb={4}>
        <Text fontWeight="semibold">Design Document:</Text>
        <Link href={`http://localhost:8800/fileuploads/${props.designDoc}`} ml={4} color={"gray.600"} alignItems={"center"} display={"flex"} isExternal>
        <FaRegFile />{props.designDoc.slice(13)}
        </Link>
        </Box>
        }
        <HStack>
        <Button colorScheme='blue'>Edit</Button>
        <Button colorScheme='red' onClick={handleDelete} >Delete</Button>
        </HStack>
        </AccordionPanel>
    </AccordionItem>
  )
}
