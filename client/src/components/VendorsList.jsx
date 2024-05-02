import React from 'react'
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import VendorListItem from '../components/VendorListItem'

export default function VendorsList(props) {
  return (
    <Table variant='simple'  >
            <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Location</Th>
                <Th>Phone</Th>
                <Th>Email</Th>
                <Th isNumeric>Vendor Link</Th>
            </Tr>
            </Thead>
            <Tbody>
                {props.vendors.map((vendor) => (
                    <VendorListItem key={vendor.idvendors} vendor={vendor} />
                ))}
            </Tbody>
        </Table>
  )
}
