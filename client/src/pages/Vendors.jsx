import React from 'react'
import { Flex, Input, Heading, Box } from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import VendorsPanel from '../panels/VendorsPanel'
import PartsPanel from '../panels/PartsPanel'

export default function Vendors() {
  return (
    <Box w='100vw'>
      <SidebarWithHeader content={<VendorsPanel/>} />
    </Box>
  )
}