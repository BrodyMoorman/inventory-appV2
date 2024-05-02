import React from 'react'
import { AccordionButton, AccordionItem, AccordionPanel, Button, HStack, Link, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function VendorListItemForPartPage(props) {
    

  return (
    <AccordionItem bg={"blue.400"}boxShadow={"xl"}  color={"white"} border={0} borderRadius={"md"} mb={2}>
    <h2>
      <AccordionButton  border={0}>
        <HStack justifyContent={"space-between"} w={"full"} textAlign='left'>
          <Text>{props.vendor.vendorname}</Text>
          <Text>${props.vendor.cost}</Text>
        </HStack>
        
      </AccordionButton>
    </h2>
    <AccordionPanel bg={"blue.500"} border={0} borderBottomRadius={"md"} pb={4}>
<HStack><Text>Vendor P/N: </Text><Text fontWeight={"semibold"}>{props.vendor.vendorpn}</Text></HStack>
<HStack><Text>Cost: </Text><Text fontWeight={"semibold"}>${props.vendor.cost}</Text></HStack>
<HStack><Text>Product Page: </Text><Link href={props.vendor.vendorpartlink}>Link <ExternalLinkIcon/></Link></HStack>
<HStack  w={"full"} justifyContent={"flex-end"}> <Button size={"sm"} color={"white"} variant={"outline"} onClick={()=> window.location.href = `/vendors/${props.vendor.vendorid}`}>Vendor Page</Button> </HStack>
    </AccordionPanel>
  </AccordionItem>
  )
}
