import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,} from "@chakra-ui/react"
import RecentTransactionListItem from './RecentTransactionListItem'

export default function RecentTransactionList(props) {
  return (
    <TableContainer w={"full"}  overflowY={'auto'}   >
    
    <Table variant='simple'  >

      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Part Name</Th>
          <Th>Transaction Type</Th>
          <Th isNumeric>Change Ammt.</Th>
          <Th isNumeric>Stock After</Th>
        </Tr>
      </Thead>
      <Tbody flexDirection={"column-reverse"}>
        
        {props.data && props.data.toReversed().map((item) => {
            return (
                <RecentTransactionListItem
                    transaction = {item}
                />
            )
        })}
        
      </Tbody>
      
    </Table>
  </TableContainer>
  )
}
