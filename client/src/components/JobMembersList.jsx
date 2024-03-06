import React from 'react'
import { Flex, Avatar, Text } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Select } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import UserSelectList from './UserSelectList'
import axios from 'axios'


export default function JobMembersList(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const addUser = async (user) => {
        try {
            const values = {
                userId: user.idusers,
            }
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/jobs/addmember/${props.jobId}`, values, {withCredentials: true})
            console.log(res)
            onClose()
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
        
    }
  return (
    <Flex flexDirection={"column"} w={"300px"} h={"300px"} border={"2px"} borderColor={"gray.200"} borderRadius={"2xl"}>
    <Flex w={"full"} h={"40px"} bg={"gray.200"} borderTopRadius={"inherit"}
    justifyContent={"center"} alignItems={"center"} fontWeight={"semibold"}> Team Members </Flex>
    <Flex w={"full"} h={"220px"} overflowY={"auto"} flexDirection={"column"}>
        {props.members.map((member, index) => {
            return(
                <Flex w={"full"} minH={"50px"} justifyContent={"space-between"} alignItems={"center"} px={2} borderBottom={"1px"} borderColor={"gray.200"}>
                    <Flex gap={1} alignItems={"center"}><Avatar size={"sm"} src={member.userImg} name={member.userName}/><Text>{member.userName}</Text></Flex>
                    <Text>{index == 0 ? "Creator" : "Member"}</Text>
                </Flex>)}
        )}

    </Flex>
    <Flex w={"full"} h={"40px"} borderBottomRadius={"inherit"}
    justifyContent={"center"} alignItems={"center"} fontWeight={"semibold"}
    bg="blue.400" cursor={"pointer"} color={"white"} _hover={{bg:"blue.300"}} onClick={onOpen}> Add Member </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody m={4}>
            <UserSelectList callback={addUser} exclude={props.members} />
          </ModalBody>
 
        </ModalContent>
      </Modal>
</Flex>
  )
}
