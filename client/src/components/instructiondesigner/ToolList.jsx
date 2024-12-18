import { VStack, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import ToolListItem from './ToolListItem'

export default function ToolList(props) {
    const tools = [
        {
            name: "Heading 1",
            id: 1
        },
        {
            name: "Heading 2",
            id: 2
        },
        {
            name: "Heading 3",
            id: 3
        },
        {
            name: "Heading 4",
            id: 4
        },
        {
            name: "Heading 5",
            id: 5
        },
        {
            name: "Paragraph",
            id: 7
        },
        {
            name: "Image",
            id: 8
        },
        {
            name: "Video",
            id: 9
        },
        {
            name: "Ordered List",
            id: 10
        },
        {
            name: "Unordered List",
            id: 11
        },
        {
            name: "Format Block",
            id: 12
        }
    ]
    const callback = (block) => {
        props.parentCallback(block)
    }

  return (
    <VStack w={"full"}h={"100%"}  bg={"gray.200"} borderRadius={"lg"}>
        <VStack w={"full"} h={"700px"} p={2} overflowY={'auto'}>
            {tools.map(tool => <ToolListItem parentCallback={callback} key={tool.id} styleId={tool.id} name={tool.name} />)}

        </VStack>
    </VStack>
  )
}
