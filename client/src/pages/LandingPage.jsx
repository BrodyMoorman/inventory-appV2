import { HStack, Text, Button, VStack, Center, Box, Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import { CiBoxes } from "react-icons/ci";
import { Container, chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import {ChevronDownIcon} from '@chakra-ui/icons'
import { MdOutlineWorkHistory } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { BsFillInboxesFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <Box  overflow={"hidden"}>
    <VStack   overflowX={"hidden"}  overflowY="auto" w={"99.1vw"} sx={{
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'black',
        borderRadius: '24px',
      },
      
    }} 
    >
      <HStack mb={-2} bg="black" overflow={"hidden"} h={"7vh"} w={"100%"} p={4} justifyContent={"space-between"}>
        <Text color={"white"} fontWeight={'semibold'} fontSize={"3xl"} >QuickInv</Text>
        <Button variant={"outline"} color="white" onClick={()=>{navigate('/login')}}>Login</Button>
      </HStack>
      <VStack position={"relative"} h={"90vh"}  bg={"black"} w={"full"} overflow={"hidden"}>
        <ChakraBox
        overflow={"hidden"}
        position={"absolute"}
        top={["30%","15%"]}
        bg={"#00bcff"}
        w={["300px","600px"]}
        h={["300px","600px"]}
        borderRadius={"full"}
        filter={"blur(90px)"}
        animate={{opacity: [0.3, 0.6, 0.3], scale: [0.8, 1, 0.8]}}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        />
        <VStack position={"absolute"} top={["25%","35%"]} gap={6} overflow={"hidden"}>
        <Text  overflow={"hidden"} textShadow={"2xl"} dropShadow={"2xl"} fontSize={["4xl","5xl"]} fontWeight={"bold"} color={"white"} w={"90%"} textAlign={"center"} >
          A MODERN INVENTORY MANAGEMENT SYSTEM
        </Text>
        <Text  overflow={"hidden"} textShadow={"2xl"} fontSize={"lg"} color={"white"} w={["90vw","700px"]} textAlign={'center'} >
          QuickInv is a web application designed to for small manufacturing facilities to manage their inventory and jobs. It was created as a personal project to
          demonstrate my ability to create a full stack web application.
        </Text>
        <HStack  overflow={"hidden"}>
          <Button variant={"outline"} color={"white"} onClick={()=>{navigate('/#features')}} >Learn More</Button>
          <Button onClick={()=>{navigate('/register')}}>Get Started</Button>
        </HStack>
        </VStack>
        <HStack position={"absolute"}  overflow={"hidden"} top={"95%"}>
          <ChakraBox
            w={8}
             h={8}
             bg={'rgba(0,0,0,.1)'}
            color={"rgba(255,255,255,1)"}
            borderRadius={"full"}
            whileHover={{ scale:1.1, backgroundColor:"rgba(255,255,255,1)", color:"rgba(0,0,0,1)"}}
            transition={{duration: 0.5}}
            overflow={"hidden"}
               >
            <ChevronDownIcon w={8} h={8}  />
          </ChakraBox>
        </HStack>
      </VStack>
      <VStack  mt={-2} pt={20} w={"100vw"}  bg={"black"} overflow={"hidden"}>
        <Text id="features" color={"white"} fontSize={"4xl"}>Features</Text>
        <HStack pt={12} w={["70vw"]} justifyContent={"space-between"} flexDirection={["column","row"]}>
          <VStack w={"350px"}  h={"600px"}  p={2} justifyContent={"flex-start"}>
          <VStack w="full" h = "130px">
          <MdOutlineWorkHistory color='white' size={"8em"} />
          </VStack>
          <Divider></Divider>
          <Text color={"white"} fontSize={"2xl"}>Manage Jobs</Text>
          <Text color={"white"} fontSize={"lg"} textAlign={"center"}>The job management system allows for team members to create jobs for easy access to exactly the parts that they need. It also allows for job tracking so all production is efficient and well documented.</Text>

          </VStack>
          <VStack w={"350px"}  h={"600px"}  p={2} justifyContent={"flex-start"}>
          <VStack w="full" h = "130px">
          <TiDocumentText color='white' size={"8em"} />
          </VStack>
          <Divider></Divider>
          <Text color={"white"} fontSize={"2xl"}>Track Transactions</Text>
          <Text color={"white"} fontSize={"lg"} textAlign={"center"}>With transaction tracking you can keep records of exactly where each item in your inventory has been used. The system also supports uploading files to keep track of item restocks</Text>

          </VStack>
          <VStack w={"350px"}  h={"600px"}  p={2} justifyContent={"flex-start"}>
            <VStack w="full" h = "130px" pt={4}>
          <BsFillInboxesFill color='white' size={"6em"} />
          </VStack>
          <Divider></Divider>
          <Text color={"white"} fontSize={"2xl"}>Storage Layout Designer</Text>
          <Text color={"white"} fontSize={"lg"} textAlign={"center"}>Design a virtual representation of your storage room. Parts locations can be easily found with intuitive graphics</Text>

          </VStack>
        </HStack>
          
      </VStack>
      <HStack w={"full"} h={"60px"} bg="black" mt={-2} justifyContent={"center"}>
        <Text color={"gray.700"}>Created By: <a href='https://brodymoorman.com'>Brody Moorman</a></Text>
      </HStack>
    </VStack>
    </Box>





























    // <VStack>
    // <HStack mb={-2} bg="blue.700" h={"7vh"} w={"100vw"} p={2} justifyContent={"space-between"}>
    //   <Text color={"white"} fontWeight={'semibold'} fontSize={"3xl"} >QuickInv</Text>
    //   <Button variant={"outline"} color="white">Login</Button>
    // </HStack>
    // <VStack h={"93vh"}  bg={"blue.400"} w={"full"}>
    // <HStack h={"93vh"}  bg={"blue.400"} w={"full"} my={0} m={0} justifyContent={"center"} >
    // <VStack>
    // <Text my={4} fontSize={"5xl"} w={"800px"}  color={'white'}  fontWeight={"bold"}>A MODERN INVENTORY MANAGEMENT SYSTEM </Text>
    // <Text  my={4}fontSize={"lg"}  w={"800px"}  color={'white'} >
    //   QuickInv is a web application designed to for small manufacturing facilities to manage their inventory and jobs. It was created as a personal project to
    //   demonstrate my ability to create a full stack web application. 
    // </Text>
    
    // <HStack my={4}>
    // <Button variant={"outline"} color={"white"}>Learn More</Button>
    // <Button>Get Started</Button>
    // </HStack>
    // </VStack>
    // <VStack  bg={"blue.700"} p={10} borderRadius={"full"}>
    // <CiBoxes size={200} color={"white"} />
    // </VStack>
    // </HStack>
    // </VStack>
    // </VStack>

  )
}
