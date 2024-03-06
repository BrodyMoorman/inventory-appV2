import { VStack, HStack, FormControl, FormLabel, Button, Input, Box , Tag, Avatar, TagLabel,
     Center, Text, TagCloseButton, Flex, Popover, PopoverTrigger, PopoverArrow, PopoverContent,
     PopoverBody, PopoverHeader, PopoverCloseButton} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import React from 'react'
import { useState, useEffect } from 'react'
import { useAuthUser } from 'react-auth-kit'
import PartSearchWithResults from './PartSearchWithResults'
import PartCardWithCount from './PartCardWithCount'
import UserSelectList from './UserSelectList'
import { useQuery } from 'react-query'
import axios from 'axios'


export default function NewJobInputForm(props) {
    const [error, setError] = useState("")
    const auth = useAuthUser()
    const [values, setValues] = useState({
        jobTitle: '',
        completionDate: '',
    })

    const [template, setTemplate] = useState(props.template)

    const [parts, setParts] = useState([])
    const [members, setMembers] = useState([
        {
            userId: auth().idusers,
            name: auth().name,
            profilePic: auth().profilepic,
            creator: true
        }
    ])
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const addPartCallback = (part) => {
        if(parts.some(item => item.partId === part.partId)) {
            return
        }else{
        setParts([...parts, part])
        }
    }
    const removePart = (part) => {
        setParts(parts.filter((item) => item.partId !== part.partId))
    }
    const changePartCount = (part) => {
        setParts(parts.map((item) => {
            if (item.partId === part.partId) {
                item = part
            }
            return item
        }))
    }
    const addMember = (member) => {
        if(members.some(item => item.userId === member.idusers)) {
            return
        }else{
            const newMember = {
                userId: member.idusers,
                name: member.name,
                profilePic: member.profilepic,
                creator: false
            }
        setMembers([...members, newMember])
        }
    }
    const removeMember = (member) => {
        setMembers(members.filter((item) => item.userId !== member.userId))
    }

    const handleCreate  = async () => {
        const newJob = {
            jobTitle: values.jobTitle,
            completionDate: values.completionDate,
            parts: parts,
            members: members
        }
        if(newJob.jobTitle === '' || newJob.completionDate === '' || newJob.parts.length === 0 || newJob.members.length === 0) {
            setError("Please fill out all fields.")
            return
        }
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/jobs/new`, newJob, {
              withCredentials: true,
            }) 
            window.location.reload()
          } catch (err) {
            console.log(err)
          }

    }
    
    useEffect(() => {
        if(template.idtemplates !== -1) {
            setParts(template.parts)
        }
    }
    , [template])

    

        
    
  return (
    <VStack>
        {(template.idtemplates !== -1) && <Text>Instance of: {template.transaction_name}</Text>}

        <FormControl isRequired>
                  <FormLabel>Job Title</FormLabel>
                  <Input type="text" name='jobTitle' onChange={handleChange}  />
        </FormControl>
        <FormControl>
                  <FormLabel>Team Members</FormLabel>
                  <Box  border={"1px"} borderRadius={"md"} borderColor={"#E1E1E1"} p={1}>
                    <HStack>
                        <HStack maxW={"80%"} alignItems={"center"}>
                            {members.map((member, index) => {
                            return(
                            <Tag size='lg' colorScheme='red' borderRadius='full' key={index}>
                                <Avatar
                                    src={member.profilePic}
                                    size='xs'
                                    name={member.name}
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel>{member.name}</TagLabel>
                                {!member.creator && <TagCloseButton onClick={()=>removeMember(member)} />}
                            </Tag>
                            )
                        })}
                        </HStack>
                        <Popover>
                            <PopoverTrigger>
                                <Button size={"xs"} rounded={"full"}><AddIcon /></Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Add Team Member</PopoverHeader>
                                <PopoverBody><UserSelectList exclude={[]} callback={addMember} /></PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </HStack>
                  </Box>
        </FormControl>
        <FormControl >
                  <FormLabel>Expected Completion</FormLabel>
                  <Input type="date" name='completionDate' onChange={handleChange}  />
        </FormControl>
        <Box w={"full"}>
        <PartSearchWithResults parentCallback={addPartCallback} />
        </Box>
        <Box w={"full"}>
            {parts.map((part, index) => {
                return (
                    <PartCardWithCount name={part.partName} id={part.partId} partCount={part.partCount} key={index} removePartCallback={removePart} changePartCountCallback={changePartCount} />
                )
            })}
        </Box>
        <HStack w={"full"} justifyContent={"flex-end"}>
            <Button>Back</Button>
            <Button colorScheme='blue' onClick={handleCreate}>Create</Button>
        </HStack>
        {error && <Text color={"red.400"}>{error}</Text>}

    </VStack>
  )
}
