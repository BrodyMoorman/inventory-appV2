import React from 'react'
import {motion, isValidMotionProp } from "framer-motion";
import { HStack, VStack, Text, Button, chakra, shouldForwardProp } from "@chakra-ui/react";
import { useRef, useState, useEffect } from 'react';
import ShelveRow from './ShelveRow';
import RowControls from './RowControls';
import axios from 'axios';



const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
export default function ShelveDesigner(props) {
  const [numRows, setNumRows] = useState(1)
  const [rows, setRows] = useState(props.rows)

  const updateShelf = (shelf) => {
    props.updateShelf(shelf)
}
const constraintsRef = useRef(null)
const setSelectedCallback = (shelfRef) => {
    console.log("Selected shelf: ", shelfRef)
    props.callback(shelfRef)
    
}
const handleAddRow = () => {
    if(rows.length < 8) {
  
        const newRow = {id: rows.length + 1, bins: []}
        setRows([...rows, newRow])
    
    }
  
}
const handleSubtractRow = () => {
  if(rows.length > 1) {
  setRows(rows.slice(0, rows.length - 1))
  }
}

const handleAddBin = (rowNum) => {
  let oldbins= []
  rows.map((row) => {
    if(row.id === rowNum) {
      oldbins = row.bins
    }
  })
  const binName = "Bin " + rowNum + "-" + (oldbins.length + 1)
  const newBin = { name: binName, id: oldbins.length + 1, x : 0, y: 0, width: 100, height: 100, row: rowNum}
  const newBins = [...oldbins, newBin]
  const newRows = rows.map((row) => {
    if(row.id === rowNum) {
      return {id: row.id, bins: newBins}
    } else {
      return row
    }
  })
  setRows(newRows)
}
const updateBin = (bin, rowNum) => {
  let oldbins= []
  rows.map((row) => {
    if(row.id === rowNum) {
      oldbins = row.bins
    }
  })
  const newBins = oldbins.map((b) => {
    if(b.id === bin.id) {
      return bin
    } else {
      return b
    }
  })
  const newRows = rows.map((row) => {
    if(row.id === rowNum) {
      return {id: row.id, bins: newBins}
    } else {
      return row
    }
  })
  setRows(newRows)
}
useEffect(() => {
  console.log("Rows: ", rows)
}
, [rows])

const handleSubmit = async () => {
  let bins = []
  rows.map((row) => {
    row.bins.map((bin) => {
      bins.push(bin)
    })
  })
  const data1 = {
    rows: rows.length,
    id: props.shelfId
  }
  let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rooms/updaterows`, data1, {withCredentials: true})
  console.log("Data: ", res)
  bins.map(async(bin) => {
    bin.shelveid = props.shelfId
  })
  bins.forEach(async (bin) => {
    let res2 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rooms/createbin`, bin, {withCredentials: true})
    console.log("Data: ", res2)
  })

  console.log("Submitted!")
}
const handleFetchTest = async () => {
  let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rooms/getshelvewithbins/${props.shelfId}`, {withCredentials: true})
  console.log("Data: ", res)
  let data = await JSON.parse(res.data[0].shelve)
  let newRows = []
  for(let i = 1; i <= parseInt(data.numRows); i++) {
    console.log("Row: ", i)
    let newRow = {id: i, bins: []}
    newRows.push(newRow)
  }
  data.bins.map((bin) => {
    newRows.map((row) => {
      if(bin.rownum === row.id) {
        row.bins.push(bin)
      }
    })
  })
  console.log("New Rows: ", newRows)
  setRows(newRows)
  console.log("Data: ", data)
  console.log("Rows: ", rows)
}


  return (
    <HStack>
    <ChakraBox
    bg="gray.400"
    w={"1300px"}
    h={"720px"}
    display={"grid"}
    borderBottomRadius={"inherit"}
    ref={constraintsRef}
  >
    {
      rows.toReversed().map((row) => {
        return <ShelveRow updateBin={updateBin} bins={row.bins} rowNum={row.id} key={row.id} parent={constraintsRef} />
      })

}
    
    
  </ChakraBox>
  <VStack w={"350px"} h={"720px"} overflowY={"auto"} >
    <Text fontSize={"2xl"} fontWeight={"semibold"}>Controls</Text>
    <Button onClick={handleFetchTest}>Fetch Test</Button>
    <Text>Rows</Text>
    <HStack>
      <Button onClick={handleSubtractRow}>-</Button>
      <Text>{rows.length}</Text>
      <Button onClick={handleAddRow}>+</Button>
    </HStack>
    <VStack w={"full"} overflowY={"auto"} h={"80%"}>
    {rows.toReversed().map((row, index) => {
      return <RowControls updateBin={updateBin} bins={row.bins} addBinCallback={handleAddBin} key={index} rowNum={row.id} />
      }
    )}
    </VStack>
    
      <Button w={"80%"} mb={2}  colorScheme={"blue"} onClick={handleSubmit}>Submit</Button>
  </VStack>
  </HStack>
  )
}
