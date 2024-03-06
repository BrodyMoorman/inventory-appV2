import React from 'react'
import { Button, Drawer, Switch, FormControl, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, FormLabel, Input, Textarea, Stack, Box, Text, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import PartSearchWithResults from './PartSearchWithResults'
import PartCardWithCount from './PartCardWithCount'
import { Await } from 'react-router-dom'
import axios from 'axios'



export default function NewAssemblyTemplate() {
    const [error, setError] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedParts, setSelectedParts] = useState([])
    const [values, setValues] = useState({
        name: '',
        description: '',
        parts: [],
        designDoc: null
    })
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [designFile, setDesignFile] = useState(null)


    
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

    const fileUpload = async (file) => {
        try{
            const formData = new FormData();
            formData.append('file', file)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload/`, formData, {
                withCredentials: true,
            })
            console.log(res)
            return res.data.filename
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        values.parts = selectedParts
        console.log(values)
        if(values.name === '') {
            setError("Please fill out all fields.")
            return
        }
        if(values.parts.length === 0) {
            setError("Please add at least one part.")
            return
        }


        
        try{
            if(designFile){
                const fileName =  await fileUpload(designFile)
                values.designDoc = fileName
            } else {
                values.designDoc = null
            }
        }catch (err) {
            console.log(err)
        }
        console.log(values)
        try{
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/templates/new`, values, {
            withCredentials: true,
          }) 
        } catch (err) {
            console.log(err)
        }

        
        onClose()
        window.location.reload()
        console.log(values)
      }


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
                <FormControl display='flex' alignItems='center' onChange={(e)=>{setShowFileUpload(e.target.checked)}}>
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Include design document?
                    </FormLabel>
                    <Switch id='email-alerts' />
                </FormControl>
                {showFileUpload && <Box>

                        <Input type='file' id='file-upload' onChange={(e)=>{
                            setDesignFile(e.target.files[0])
                            console.log(e.target.files[0])
                            
                            }} />

                </Box>}
                <PartSearchWithResults parentCallback={handleCallback} />
                    {selectedParts.map((part, index) => {
                        return (
                            <PartCardWithCount name={part.partName} partCount={part.partCount} id={part.partId} key={index} removePartCallback={removePart} changePartCountCallback={changePartCount} />
                        )
                    })}
                
                {error && <Text color={"red.400"}>{error}</Text>}
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
