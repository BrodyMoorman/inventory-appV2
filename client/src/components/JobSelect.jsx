import React from 'react'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import { useAuthUser } from 'react-auth-kit'
import { Select, FormControl, FormLabel } from '@chakra-ui/react'

export default function JobSelect(props) {
    const auth = useAuthUser()
    const { isLoading, error, data } = useQuery(['jobs'], () =>
    makeRequest.get(`/jobs/user/${auth().idusers}`).then((res) => {
        console.log(res.data) 
        res.data.forEach(job => {
            if(job.jobStatus === "completed") {
                res.data.splice(res.data.indexOf(job), 1)
            }
        })
        return res.data
    })
    )
    if (isLoading) return 'Loading...'
    if (error) console.log(error)
    const handleChange = (e) => {
        props.callback(e.target.value)
    }
    
  return (
    <FormControl isRequired isDisabled={props.isDisabled}>
    <FormLabel>Select Job:</FormLabel>
        <Select placeholder='Select option' name='jobid' onChange={handleChange}>
            {data.map((job, index) => {
                return (
                    <option key={index} value={job.idjobs}>{job.jobname}</option>
                )
            }
            )}
        </Select>
    </FormControl>
  )
}
