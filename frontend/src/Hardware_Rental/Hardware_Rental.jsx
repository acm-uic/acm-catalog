import React from "react";
import EntryListItem from "./EntryListItem.jsx"
import "./Hardware_rental.css"

function HardwareRental(){
    const Entry = (name, Qty, description)=>{
        return {
            _name: name,
            _Qty: Qty,
            _description: description,
            get name(){
            return this._name;
            },
            get description(){
            return this._description;
            },
            get Qty(){
            return this._Qty;
            },
            set addQty(num){
            return this._Qty += num;
            }
        }
    };

    const listEntry = [Entry("HDMI Cable", 28, "Charge yo trash"),Entry("Trash Bag", 1, "Why do you want this")]
    const displayEntries = listEntry.map((element)=>{
        return (
        <EntryListItem name={element.name} qty={element.Qty} description={element.description}/>
    )})

    return(
        <>
            <div id="EntryList">
                {displayEntries}
            </div>
        </>
    )
};

export default HardwareRental;