import React from 'react'
import { Tr, Td } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function VendorListItem(props) {
  return (
    <Tr _hover={{bg:"gray.200"}} cursor={"pointer"} onClick={()=>{window.location.href = `/vendors/${props.vendor.idvendors}`}} >
                <Td>{props.vendor.vendorname}</Td>
                <Td>{props.vendor.streetaddress ? props.vendor.streetaddress + ", " + props.vendor.city + ", " + props.vendor.state :  "N/A"}</Td>
                <Td>{props.vendor.phonenumber ? props.vendor.phonenumber :  "N/A"}</Td>
                <Td>{props.vendor.email ? props.vendor.email:  "N/A"}</Td>
                <Td isNumeric>{props.vendor.vendorlink && <a href={props.vendor.vendorlink} target="_blank"><ExternalLinkIcon mx="2px" /></a>}</Td>
    </Tr>
  )
}
