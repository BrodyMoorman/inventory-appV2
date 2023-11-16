import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import { Box } from '@chakra-ui/react'
import Parts from './Parts'

export default function Home() {
  return (
    <Box w='100vw'>
        <SidebarWithHeader content={<div>Dashboard</div>} />
        
    </Box>
  )
}
