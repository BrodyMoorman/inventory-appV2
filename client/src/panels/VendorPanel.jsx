import React from 'react'
import { VStack, Text, HStack, IconButton, Icon, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, SimpleGrid } from '@chakra-ui/react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { ExternalLinkIcon } from '@chakra-ui/icons'
export default function VendorPanel() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <VStack w="full">
        
        <VStack w="90%" p="20px" bg="white" overflowX={"auto"} borderRadius="2xl" shadow="lg" m="20px" flexDirection="column" >
        
        <HStack w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize="4xl" fontWeight="semibold">Vendor Name</Text>
        <Menu>
            <MenuButton variant={'outline'} as={IconButton} icon={<Icon as={BsThreeDotsVertical} fontSize={"xl"} color={"gray.500"}/>} px={0}> </MenuButton>
            <MenuList>
                <MenuItem onClick={onOpen}>Change Vendor Info</MenuItem>
                <MenuDivider/>
                <MenuItem color={"red.300"}>Delete Vendor</MenuItem>
            </MenuList>
            </Menu>  
        </HStack>
        <HStack w={"full"}>
          <VStack alignItems={"flex-start"} gap={-2}>
        <Text>Email@example.com</Text>
        <Text>(808) 232-4252</Text>
        <Text>123 lake ave. Orlando FL 32826</Text>
        <Text>Website</Text>
        </VStack>
        </HStack>
        <VStack>
        <Text fontSize={"2xl"}>Products</Text>
        <SimpleGrid columns={[1,5]} gap={2}>
          <VStack p={2} bg={"blue.400"} color={"white"} w={"250px"} h={"150px"} borderRadius={'md'} border={"2px"} borderColor={"blue.600"} alignItems={"flex-start"}>
            <Text bg={"blue.600"} p={1} borderRadius={"md"} fontWeight={"semibold"}>Product 1</Text>
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Supplier P/N: QA-4213</Text>
            
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Price: $23.95</Text>
            <HStack w={"full"} justifyContent={"flex-end"}>
            <ExternalLinkIcon   />
            </HStack>
          </VStack>
        
          <VStack p={2} bg={"blue.400"} color={"white"} w={"250px"} h={"150px"} borderRadius={'md'} border={"2px"} borderColor={"blue.600"} alignItems={"flex-start"}>
            <Text bg={"blue.600"} p={1} borderRadius={"md"} fontWeight={"semibold"}>Product 1</Text>
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Supplier P/N: QA-4213</Text>
            
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Price: $23.95</Text>
            <HStack w={"full"} justifyContent={"flex-end"}>
            <ExternalLinkIcon   />
            </HStack>
          </VStack>
          <VStack p={2} bg={"blue.400"} color={"white"} w={"250px"} h={"150px"} borderRadius={'md'} border={"2px"} borderColor={"blue.600"} alignItems={"flex-start"}>
            <Text bg={"blue.600"} p={1} borderRadius={"md"} fontWeight={"semibold"}>Product 1</Text>
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Supplier P/N: QA-4213</Text>
            
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Price: $23.95</Text>
            <HStack w={"full"} justifyContent={"flex-end"}>
            <ExternalLinkIcon   />
            </HStack>
          </VStack>
          <VStack p={2} bg={"blue.400"} color={"white"} w={"250px"} h={"150px"} borderRadius={'md'} border={"2px"} borderColor={"blue.600"} alignItems={"flex-start"}>
            <Text bg={"blue.600"} p={1} borderRadius={"md"} fontWeight={"semibold"}>Product 1</Text>
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Supplier P/N: QA-4213</Text>
            
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Price: $23.95</Text>
            <HStack w={"full"} justifyContent={"flex-end"}>
            <ExternalLinkIcon   />
            </HStack>
          </VStack>
          <VStack p={2} bg={"blue.400"} color={"white"} w={"250px"} h={"150px"} borderRadius={'md'} border={"2px"} borderColor={"blue.600"} alignItems={"flex-start"}>
            <Text bg={"blue.600"} p={1} borderRadius={"md"} fontWeight={"semibold"}>Product 1</Text>
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Supplier P/N: QA-4213</Text>
            
            <Text bg={"blue.600"} p={1} borderRadius={"md"}>Price: $23.95</Text>
            <HStack w={"full"} justifyContent={"flex-end"}>
            <ExternalLinkIcon   />
            </HStack>
            
          </VStack>
        </SimpleGrid>
        </VStack>
        </VStack>
        

    </VStack>
  )
}
