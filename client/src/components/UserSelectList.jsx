import React from 'react'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import { VStack } from '@chakra-ui/react'
import UserSelectListItem from './UserSelectListItem'

export default function UserSelectList(props) {

    const { isLoading, error, data } = useQuery(['users'], () =>

    makeRequest.get('/users').then((res) => {
        if(props.exclude.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < props.exclude.length; j++) {
                if (res.data[i].idusers === props.exclude[j].userId) {
                    res.data.splice(i, 1)
                }
            }
        }
    }

        return res.data
        })
    )
    if (isLoading) return 'Loading...'
    if (error) console.log(error)

    const handleSelect = (userId) => {
        data.map((user) => {
            if (user.idusers === userId) {
                props.callback(user)
                console.log('user selected')
                console.log(user)
            }
        })
    }


  return (
    <VStack maxH={"400px"} overflowY={"auto"}>
        {data.length > 0 ?
        data.map((user, index) => {
            return (
                <UserSelectListItem
                key={index}
                id={user.idusers}
                name={user.name}
                profilepic={user.profilepic}
                callback={handleSelect}
                />
            )
        }) : <p>No users found</p>
        }
    </VStack>
  )
}
