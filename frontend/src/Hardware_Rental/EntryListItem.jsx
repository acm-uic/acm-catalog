import React from 'react'

export default function EntryListItem(props) {
  return (
    <>
      <h1>{props.name}</h1>
      <p>{props.qty}</p>
      <p>{props.description}</p>
    </>
  )
}

