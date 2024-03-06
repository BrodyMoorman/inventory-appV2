import React from 'react'
import { Flex, Text, VStack } from '@chakra-ui/react'

export default function JobActionListItem(props) {
  return (
    <Flex w={"full"} borderBottom={"1px"}  borderColor={'gray.300'} h={"40px"}  
        justifyContent={"space-between"} alignItems={"center"} fontWeight={"semibold"} cursor={"pointer"} _hover={{bg:"gray.200"}}>
          <Flex w={"200px"} justifyContent={"center"} ><Text fontSize={"md"}>{props.action.userName}</Text></Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>{props.action.actionType}</Text></Flex>
          {props.action.actionType == "status change" && <>
          <Flex w={"200px"} justifyContent={"center"} alignItems={"center"} mt={2}>
            <VStack gap={0} justifyContent={"center"}>
            <Text m={-2} p={0} fontSize={"xs"}>Status Before:</Text>
            <Text m={0} p={0} fontSize={"md"}>{props.action.oldStatus}</Text>
            </VStack>
            </Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"} mt={2}>
          <VStack gap={0}>
            <Text m={-2} p={0} fontSize={"xs"}>Status After:</Text>
            <Text m={0} p={0} fontSize={"md"}>{props.action.newStatus}</Text>
            </VStack></Text></Flex>
            </>
            }
          {props.action.actionType == "part charge" && <>
          <Flex w={"200px"} justifyContent={"center"} alignItems={"center"} mt={2}>
            <VStack gap={0} justifyContent={"center"}>
            <Text m={-2} p={0} fontSize={"xs"}>Part Name:</Text>
            <Text m={0} p={0} fontSize={"md"}>{props.action.partName}</Text>
            </VStack>
            </Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"} mt={2}>
          <VStack gap={0}>
            <Text m={-2} p={0} fontSize={"xs"}>Amount Charged:</Text>
            <Text m={0} p={0} fontSize={"md"}>{props.action.numCharged}</Text>
            </VStack></Text></Flex>
            </>
            }
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>{props.action.actionTime.slice(0, -7)}</Text></Flex>
    </Flex>
  )
}
