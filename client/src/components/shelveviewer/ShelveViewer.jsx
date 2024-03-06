import React from 'react'
import {motion, isValidMotionProp } from "framer-motion";
import { HStack, VStack, Text, Button, chakra, shouldForwardProp } from "@chakra-ui/react";
import { useRef, useState, useEffect } from 'react';
import StaticShelveRow from './StaticShelveRow';
import axios from 'axios';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';

const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });


export default function ShelveViewer(props) {
    const [rows, setRows] = useState(props.rows)
    const constraintsRef = useRef(null)
    // const {isLoading, error, data} = useQuery(['shelve'], () =>
    // makeRequest.get(`/rooms/getshelvewithbins/${props.shevlveId}`).then((res) => {
    //     if(res.data.length === 0) {
    //         return "No data"
    //     }
    //     let data = JSON.parse(res.data[0].shelve)
    //     console.log(data)
    //     let newRows = []
    //     for (let i = 1; i <= data.numrows; i++) {
    //         let row = {id: i, bins: []}
    //         newRows.push(row)
    //     }
    //     console.log(newRows)
    //     data.bins.forEach((bin) => {
    //         newRows[bin.rownum-1].bins.push(bin)
    //     }
    //     )
    //     console.log(newRows)
    //     setRows(newRows)
    // } ))
    // if (isLoading) return "Loading..."
    // if (error) return "An error has occurred: " + error.message
    const handleUpdate = () => {
        props.handleUpdate()
    } 
    useEffect(() => {
        setRows(props.rows)
    }
    ,[props.rows])
    console.log("Rows: ", rows)
    return (
        <VStack overflow={"hidden"} border={'solid'} borderWidth={props.aspectRatio>1? 2: 3} w={`${1300/props.aspectRatio}px`}h={`${750/props.aspectRatio}px`} borderRadius={"2xl"}>
            <HStack h="3%"alignItems={"flex-start"} px={2}w={"full"}  bg={"white"}> <Text fontWeight={"semibold"} fontSize={"md"}>Shelf Viewer</Text></HStack>

            <ChakraBox
            bg="gray.400"
            w={"full"}
            h={"full"}
            display={"grid"}
            borderBottomRadius={"inherit"}
            ref={constraintsRef}
        >
            {
            rows.toReversed().map((row) => {
                return <StaticShelveRow aspectRatio={props.aspectRatio} handleUpdate={handleUpdate} bins={row.bins} rowNum={row.id} key={row.id} parent={constraintsRef} />
            })

        }
            
            
        </ChakraBox>
        </VStack>
  )
}
