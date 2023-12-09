import React from 'react'
import { useParams } from 'react-router-dom'

export default function UpdateAppointment() {
    const {id} = useParams()
  return (
    <div>UpdateAppointment {id}</div>
  )
}
