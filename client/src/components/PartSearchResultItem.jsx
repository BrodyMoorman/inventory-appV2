import React from 'react'
import { Box, Text } from '@chakra-ui/react'


export default function PartSearchResultItem(props) {
    const part = {
        partName: props.partname,
        partId: props.partid,
        partCount: 1
    }

  return (
    <Box  h={"8"} cursor={"pointer"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"2"} _hover={{bg:"#edf3f6"}}
    onClick={() => props.callback(part)}
    >
        <Text>{part.partName}</Text>
       <Box display={"flex"}><Text>PartNo. </Text><Text >{part.partId}</Text></Box> 
    </Box>
  )
}
