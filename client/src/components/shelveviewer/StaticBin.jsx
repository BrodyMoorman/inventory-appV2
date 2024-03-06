import React from 'react'
import { VStack, chakra, Text, shouldForwardProp,  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  HStack,
 } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import BinPartSearch from '../BinPartSearch'
import { useEffect, useState } from 'react'
const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
export default function StaticBin(props) {
  console.log("aspectRatio: ", props.aspectRatio)
  const [open , setOpen] = useState(false)
  const handleUpdate = () => {
    props.handleUpdate()
  }


  return (
    <>
    {(props.aspectRatio == 1) ?
      <Popover >
      <PopoverTrigger>
        <ChakraBox
          
          bg={props.bin.selected? "green.400": "blue.400"}
          borderRadius={"md"}
          dragConstraints={props.parent}
          color={"black"}
          padding="2"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border={"2px solid white"}
          w = {props.bin.width}
          h = {`${100/props.aspectRatio}px`}
          _hover={props.aspectRatio>1 ? {}:{bg: "blue.500", color: "white"}}
          cursor={props.aspectRatio>1?"":"pointer"}
          animate={{x:props.bin.x, y:props.bin.y,  rotate: 0}}
          position={"absolute"}
        zIndex={1}
          dragElastic={0}
        >
            
            <VStack h={"full"} justifyContent={'flex-end'} overflow={"hidden"}>
              {props.bin.partname && props.aspectRatio<2 && 
              <HStack w={"full"} bg={"blue.600"} borderRadius={"sm"} h={"full"} px={1} overflow={"hidden"} > 
              <Text    textAlign={"center"} color={"white"} textOverflow={"ellipsis"} fontWeight={"semibold"}>{props.bin.partname }
              </Text>
              </HStack>
              }
            <Text textAlign={"center"} color={"white"} fontWeight={"semibold"}>{props.bin.name}</Text>
            </VStack>
        </ChakraBox>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Assign Part to {props.bin.name}</PopoverHeader>
        <PopoverBody>
          <BinPartSearch handleUpdate={handleUpdate} binId={props.bin.id} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
    :
    <ChakraBox
          
          bg={props.bin.selected? "green.400": "blue.400"}
          borderRadius={"md"}
          dragConstraints={props.parent}
          color={"black"}
          padding="2"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border={"2px solid white"}
          w = {props.bin.width}
          h = {`${100/props.aspectRatio}px`}
          _hover={props.aspectRatio>1 ? {}:{bg: "blue.500", color: "white"}}
          cursor={props.aspectRatio>1?"":"pointer"}
          animate={{x:props.bin.x, y:props.bin.y,  rotate: 0}}
          position={"absolute"}
        zIndex={1}
          dragElastic={0}
        >
            
            <VStack h={"full"} justifyContent={'flex-end'} overflow={"hidden"}>
              {props.bin.partname && props.aspectRatio<2 && 
              <HStack w={"full"} bg={"blue.600"} borderRadius={"sm"} h={"full"} px={1} overflow={"hidden"} > 
              <Text    textAlign={"center"} color={"white"} textOverflow={"ellipsis"} fontWeight={"semibold"}>{props.bin.partname }
              </Text>
              </HStack>
              }
            <Text textAlign={"center"} color={"white"} fontWeight={"semibold"}>{props.bin.name}</Text>
            </VStack>
        </ChakraBox>
  }
  </>
  
    
  )
}
