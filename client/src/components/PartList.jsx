import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Button } from "@chakra-ui/react"
import PartListItem from './PartListItem'
export default function PartList(props) {
  console.log(props.data)
  return (
    <TableContainer w={"full"}  overflowY={'auto'}   >
    
  <Table variant='simple'  >
    <TableCaption>Load More</TableCaption>
    <Thead>
      <Tr>
        <Th>Part No.</Th>
        <Th>Name</Th>
        <Th>Location</Th>
        <Th isNumeric>Stock</Th>
        <Th isNumeric>Cost</Th>
      </Tr>
    </Thead>
    <Tbody>
      {props.data.map((part) => {
        return (
          <PartListItem partNo={part.idparts} name={part.partname} location={part.location} stock={part.count} cost={part.cost} partid={part.idparts}/>
        )
      })}   
    </Tbody>
    
  </Table>
</TableContainer>
  )
}
