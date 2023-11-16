import React from 'react'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import { VStack } from '@chakra-ui/react'
import UserSelectListItem from './UserSelectListItem'

export default function UserSelectList(props) {

    const { isLoading, error, data } = useQuery(['users'], () =>

    makeRequest.get('/users').then((res) => {
        return res.data
        })
    )
    if (isLoading) return 'Loading...'
    if (error) console.log(error)
    console.log(data)

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
    <VStack>
        {data.map((user, index) => {
            return (
                <UserSelectListItem
                key={index}
                id={user.idusers}
                name={user.name}
                profilepic={user.profilepic}
                callback={handleSelect}
                />
            )
        })}
    </VStack>
  )
}
