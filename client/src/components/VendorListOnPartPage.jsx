import React from 'react'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Button, HStack, Link, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import VendorListItemForPartPage from './VendorListItemForPartPage'
import { makeRequest } from '../axios'
import { useQuery } from 'react-query'

export default function VendorListOnPartPage(props) {
  const { isloading, error, data, refetch } = useQuery(['vendors'], () =>
  makeRequest.get('/vendors/part/' + props.partid).then((res) => {
    console.log(res.data)
    return res.data
  })
)
if (isloading) return 'Loading...'
if (error) console.log(error)
return (
    <Accordion gap={4} w={"full"}>
      {data && data.map((vendor) => (
        <VendorListItemForPartPage key={vendor.idvendors} vendor={vendor} />
      ))}
  

</Accordion>
  )
}
