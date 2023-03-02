import React from 'react'

import './Display.scss'

export default function Display({ value }) {
    return (
        <div className='display'>
            {new Array(3).fill(0).map((el, i) => {
                const digit = (Math.floor(value/Math.pow(10, 2-i)))%10
                return (<div className={`digit digit_${digit}`} key={i}></div>)
            })}
        </div>
    )
}
