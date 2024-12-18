import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import {useState} from 'react'
import ToolList from './ToolList'
import FormatBlock from './FormatBlock'

export default function EditorPanel() {
    const [blocks, setBlocks] = useState([])
    const addBlock = (block) => {
        if (block.styleId === 12) {
            const newBlock = {
                styleId: block.styleId,
                columns: [{id: 1, blocks: []}]
            }
            setBlocks([...blocks, newBlock])
        }   
    }
  return (
    <HStack  h={"800px"} w={"full"}  justify={'space-between'}>
        <VStack p={2} bg={"white"} borderRadius={"2xl"} w={"25%"} h={"full"}>
            <div>
            <h1>Tools Panel</h1>
            </div>
            <ToolList parentCallback={addBlock} />
        </VStack>
        <VStack bg={"white"} borderRadius={"2xl"} w={"75%"} h={"full"}>
            <div>
            <h1>Preview Panel</h1>
            </div>
            <VStack p={2} w="full">

                {blocks.map(block => <FormatBlock key={block.styleId} columns={block.columns} />)}
            </VStack>
        </VStack>
    </HStack>
  )
}
