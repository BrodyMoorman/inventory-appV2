import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,} from "@chakra-ui/react"
import TransactionListItem from './TransactionListItem'


export default function TransactionList() {
    const dummyData = [
        { 
            date: '2021-04-20',
            transactionType: 'Purchase',
            changeAmmount: 100,
            stockAfter: 243,
            employee: 'John Doe'
        },
        {
            date: '2021-04-23',
            transactionType: 'Use in Production',
            changeAmmount: -50,
            stockAfter: 320,
            employee: 'Brody Moorman'
        },
        {
            date: '2021-04-24',
            transactionType: 'Use in Production',
            changeAmmount: -50,
            stockAfter: 320,
            employee: 'Jackson Dooley'
        }
     ]

  return (
    <TableContainer w={"full"}  overflowY={'auto'}   >
    
    <Table variant='simple'  >
      <TableCaption>Load More</TableCaption>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Transaction Type</Th>
          <Th isNumeric>Change Ammt.</Th>
          <Th isNumeric>Stock After</Th>
          <Th >Employee</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dummyData.map((item) => {
            return (
                <TransactionListItem
                    timestamp={item.date}
                    type={item.transactionType}
                    change={item.changeAmmount}
                    stock={item.stockAfter}
                    employee={item.employee}
                />
            )
        })}
        
      </Tbody>
      
    </Table>
  </TableContainer>
  )
}
