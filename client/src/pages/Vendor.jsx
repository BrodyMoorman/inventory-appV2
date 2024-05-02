import React from 'react'
import { Box } from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import VendorPanel from '../panels/VendorPanel'

export default function Vendor() {
  return (
    <Box w='100vw'>
      <SidebarWithHeader content={<VendorPanel/>} />
    </Box>
  )
}
