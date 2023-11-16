import React from 'react'
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, FormLabel, Input, Textarea, Stack, Box, Text, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import PartSearchWithResults from './PartSearchWithResults'
import PartCardWithCount from './PartCardWithCount'
import { Await } from 'react-router-dom'
import axios from 'axios'



export default function NewAssemblyTemplate() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedParts, setSelectedParts] = useState([])
    const [values, setValues] = useState({
        name: '',
        description: '',
        parts: []
    })


    
    const firstField = React.useRef()
    const handleCallback = (part) => {
        setSelectedParts([...selectedParts, part])
        
        
    }
    const removePart = (part) => {
        setSelectedParts(selectedParts.filter((item) => item.partId !== part.partId))
    }
    const changePartCount = (part) => {
        setSelectedParts(selectedParts.map((item) => {
            if (item.partId === part.partId) {
                item = part
            }
            return item
        }))
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        values.parts = selectedParts
        console.log(values)
        try{
          const res = await axios.post('http://localhost:8800/api/templates/new', values, {
            withCredentials: true,
          }) 

        } catch (err) {
          console.log(err)
        }
        onClose()
        window.location.reload()

      }

    useEffect(() => {
        console.log(selectedParts)
    }, [selectedParts])
  return (
    <>
        <Button colorScheme='blue' onClick={onOpen}>Create New Template</Button>

        
        <Drawer
            isOpen={isOpen}
            placement='right'
            initialFocusRef={firstField}
            onClose={onClose}
            size={'md'}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
                Create New Template
            </DrawerHeader>

            <DrawerBody>
                <Stack spacing='24px'>
                <Box>
                    <FormLabel htmlFor='username'>Name</FormLabel>
                    <Input
                    ref={firstField}
                    name='name'
                    id='username'
                    placeholder='Please enter template name'
                    onChange={handleChange}
                    />
                </Box>

                <Box>
                    <FormLabel htmlFor='desc'>Description</FormLabel>
                    <Textarea
                     id='desc' 
                    name='description'
                    onChange={handleChange}
                    
                    />
                </Box>
                <PartSearchWithResults parentCallback={handleCallback} />
                    {selectedParts.map((part, index) => {
                        return (
                            <PartCardWithCount name={part.partName} id={part.partId} key={index} removePartCallback={removePart} changePartCountCallback={changePartCount} />
                        )
                    })}
                

                </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
  )
}
