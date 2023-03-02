import React from 'react'
import Counter from '../counter/Counter'
import Smile from '../smile/Smile'
import Time from '../time/Time'

import './Header.scss'

export default function Header() {
  return (
    <header className='header'>
      <Counter />
      <Smile />
      <Time />
    </header>
  )
}
