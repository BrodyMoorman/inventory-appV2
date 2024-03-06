import React from 'react'
import TeamListItem from './TeamListItem'
import { VStack } from '@chakra-ui/react'

export default function TeamList(props) {
  return (
    <VStack w={'70%'} spacing={2} align={'center'} h={"600px"}>
      {props.team.map((user, index) => {
        return (
            <TeamListItem key={index} user={user}/>
        )
      })}
    </VStack>
  )
}
