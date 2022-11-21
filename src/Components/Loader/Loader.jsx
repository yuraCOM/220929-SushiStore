import React from 'react'
import './loader.css'

const Loader = () => {
    return (
        <div className="lds-spinner-cont">
            <h3>Loading.....</h3>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader