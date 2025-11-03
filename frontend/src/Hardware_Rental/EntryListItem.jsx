import React from 'react'

export default function EntryListItem({ name, qty, description }) {
  const wholeStyle = {
    display: 'flex',
    flexDirection: 'row',
    border: '2px solid black',
    marginBottom: '0.25em'
  }

  const leftStyle = {
    width: '25%',
    textAlign: 'left',
    backgroundColor: 'rgb(221, 85, 85)',
    paddingLeft: '0.8em'
  };

  const centerStyle = {
    backgroundColor: 'rgb(255, 255, 255)',
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const rightStyle = {
    backgroundColor: 'rgb(255, 255, 255)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
  }

  return (
    <>
    <div style={wholeStyle}>
      <div style={leftStyle}>
        <p>Item: {name}</p>
        <p>Qty: {qty}</p>
      </div>
      <div style={centerStyle}>
        <p>{description}</p>
      </div>
      <div style={rightStyle}>
        <button>Rent</button>
      </div>
    </div>
    </>
  )
}

