import React from 'react'
import ShelveDesigner from './ShelveDesigner'
import ShelveViewer from '../shelveviewer/shelveviewer';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';
import { useState } from 'react';
import { VStack } from '@chakra-ui/react';

export default function ViewerDesignerSwitch(props) {
    const [rows, setRows] = useState([{id: 1, bins: []}])
    const [designer, setDesigner] = useState(false)
    const {isLoading, error, data, refetch} = useQuery(['shelve'], () =>
    makeRequest.get(`/rooms/getshelvewithbins/${props.shevlveId}`).then((res) => {
        if(res.data.length === 0) {
            setDesigner(true)
            return "No data"
        }
        let data = JSON.parse(res.data[0].shelve)
        console.log(data)
        let newRows = []
        for (let i = 1; i <= data.numrows; i++) {
            let row = {id: i, bins: []}
            newRows.push(row)
        }
        console.log(newRows)
        data.bins.forEach((bin) => {
          if(props.aspectRatio > 1) {
            bin.width = bin.width / props.aspectRatio
            bin.x = bin.x / props.aspectRatio
          }
          if(props.selectedBin == bin.id) {
            bin.selected = true
          }
            newRows[bin.rownum-1].bins.push(bin)
        }
        )
        console.log("NewRows:",newRows)

        return newRows
    } ))
    if (isLoading) return "Loading..."
    if (error) return "An error has occurred: " + error.message
    console.log("data: ", data)
    const handleUpdate = () => {
      console.log("Refetching")
        refetch()
    }
    
  return (
    <div>
      {data == "No data" ? <ShelveDesigner rows={rows} /> : <ShelveViewer aspectRatio={props.aspectRatio} handleUpdate={handleUpdate} rows={data} />}
    </div>
  )
}
