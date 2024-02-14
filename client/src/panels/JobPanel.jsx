import React from 'react'
import { Flex, Box, Text, Tag, TagLabel, Spinner, HStack, Button, Avatar, Icon, Menu, MenuButton, MenuList, MenuItem, IconButton, MenuDivider,
     useDisclosure, Modal, ModalOverlay, ModalCloseButton, ModalBody, ModalFooter, ModalContent, ModalHeader, Select } from '@chakra-ui/react'
import { CloseIcon, CheckIcon, TimeIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import PartListForJob from '../components/PartListForJob';
import JobActionsList from '../components/JobActionsList';
import { useQuery } from 'react-query';
import { makeRequest } from '../axios';
import { useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import JobMembersList from '../components/JobMembersList';




export default function JobPanel(props) {
    const auth = useAuthUser()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedStatus, setSelectedStatus] = useState("")
    const onStatusChange = (e) => {
        setSelectedStatus(e.target.value)
    }
    const removeDuplicateUsers = (arr) => {
        let unique = []
        arr.forEach(item => {
            if(!unique.some(obj => obj.userId === item.userId)) {
                unique.push(item)
            }
        })
        return unique

    }
    const handleStatusSubmit = () => {
        const values = {
            jobStatus: selectedStatus,
            userId: auth().idusers,
            oldStatus: data.jobStatus
        }
        axios.put(`http://localhost:8800/api/jobs/status/${props.jobid}`, values , {withCredentials: true})
        .then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const removeDuplicateParts = (arr) => {
        let unique = []
        arr.forEach(item => {
            if(!unique.some(obj => obj.partID === item.partID)) {
                unique.push(item)
            }
        })
        return unique
    }
    const { isLoading, error, data } = useQuery(['job'], () =>
    makeRequest.get(`/jobs/${props.jobid}`).then((res) => {
        let data = JSON.parse(res.data.job)
            data.parts = removeDuplicateParts(data.parts)
            data.members = removeDuplicateUsers(data.members)
            console.log(data)
        return data
        })
    )
    if (isLoading) return 'Loading...'
    if (error) console.log(error)

    const handleFetch = () => {
        axios.get('http://localhost:8800/api/jobs/6', {withCredentials: true})
        .then(res => {
            let data = JSON.parse(res.data.job)
            data.parts = removeDuplicateParts(data.parts)
            data.members = removeDuplicateUsers(data.members)
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <Flex justify={"center"} flexDir={"column"} alignItems={"center"} gap={"10px"}>
        <Flex w={"full"} h={"full"} bg={"white"} p={4} borderRadius={"3xl"} flexDirection={"column"}>
            <HStack justifyContent={"space-between"} alignItems={"flex-start"} w={"full"} px={3}>
            <Box>
            <Text fontSize={"3xl"} fontWeight={"semibold"}>{data.jobName}</Text>
            <HStack mt={"-5px"}><Text>Job ID:</Text><Text>{data.jobId}</Text></HStack>
            
            {data.jobStatus=="in progress" && <Tag size="md" variant="solid" colorScheme="yellow" borderRadius="full" px="2" mr="2">
                <Spinner size={"xs"} mr={"4px"} speed= "2s"/>
                <TagLabel>In Progress</TagLabel>
            </Tag> }
            {data.jobStatus== "completed" && <Tag size="md" variant="solid" colorScheme="green" borderRadius="full" px="2" mr="2">
                <CheckIcon size={"xs"} mr={"4px"}/>
                <TagLabel>Completed</TagLabel>
            </Tag>}
            {data.jobStatus == "canceled" && <Tag size="md" variant="solid" colorScheme="red" borderRadius="full" px="2" mr="2">
                <CloseIcon size={"xs"} mr={"4px"}/>
                <TagLabel>Canceled</TagLabel>
            </Tag>}
            {data.jobStatus == "overdue" && <Tag size="md" variant="solid" colorScheme="orange" borderRadius="full" px="2" mr="2">
                <TimeIcon size={"xs"} mr={"4px"}/>
                <TagLabel>Overdue</TagLabel>
            </Tag> }
            </Box>
            <Menu>
            <MenuButton variant={'outline'} as={IconButton} icon={<Icon as={BsThreeDotsVertical} fontSize={"xl"} color={"gray.500"}/>} px={0}> </MenuButton>
            <MenuList>
                <MenuItem onClick={onOpen}>Change Job Status</MenuItem>
                <MenuItem>Create Template From Job</MenuItem>
                <MenuItem onClick={handleFetch}>Fetch Test</MenuItem>
                <MenuDivider/>
                <MenuItem color={"red.300"}>Delete Job</MenuItem>
            </MenuList>
            </Menu>   
            </HStack>
            <HStack pt={2} justifyContent={"space-between"} mb={4}>
                <PartListForJob parts={data.parts} />
                <JobMembersList jobId={data.jobId} members={data.members} />
            </HStack>
            <JobActionsList actions={data.jobActions} />
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Job Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Current Status: {data.jobStatus}
            <Select name='statusSelect' onChange={onStatusChange} defaultValue={data.jobStatus}>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
                <option value="overdue">Overdue</option>
            </Select>
          </ModalBody>


          <ModalFooter>
          
            <Button colorScheme='blue' isDisabled={(data.jobStatus == selectedStatus)} onClick={handleStatusSubmit}>
              Apply
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
