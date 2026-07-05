import React from 'react'


function Logo({width = '100px', logo}) {
  return (
    <div>
      <img src={logo} alt='logo' width={100}/>
    </div>
  )
}

export default Logo
