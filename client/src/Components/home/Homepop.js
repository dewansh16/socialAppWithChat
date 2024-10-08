import React, { useState } from 'react'
import { Button, Font } from '../../styling/Styles'

function Homepop() {

  const [navSign,setNavSign] = useState('/')

  return (
    <div className={`homepop flex flex-col items-start p-8 gap-8`} >
      <div className={`flex flex-col py-0 px-1`}>
        <p className={`${Font.font} ${Font.heading3} ${Font.medium}`} >Select Profile</p>
        <p className={`${Font.font} ${Font.body2} ${Font.regular}`} >You want to join Uttertale as a:</p>
      </div>
      <div className='flex flex-col' >
        <div className='flex flex-row items-center py-3 px-4 gap-3' >
          <input type="radio" name="signup" value={'/Sign-Up/Company-Business'} onChange={(e)=>setNavSign(e.target.value)} id="" style={{width:20,height:20,marginBottom:4}} />
          <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >Business</p>
        </div>
        <div className='flex flex-row items-center py-3 px-4 gap-3' >
          <input type="radio" name="signup" id="" value={'/Sign-Up/entrepreneur'} onChange={(e)=>setNavSign(e.target.value)} style={{width:20,height:20,marginBottom:4}} />
          <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >Entrepreneur</p>
        </div>
        <div className='flex flex-row items-center py-3 px-4 gap-3' >
          <input type="radio" name="signup" id="" value={'/Sign-Up/entrepreneur'} onChange={(e)=>setNavSign(e.target.value)} style={{width:20,height:20,marginBottom:4}} />
          <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >Content creator</p>
        </div>
      </div>
      <a href={navSign}>
        <div className={`${Button.button} ${Button.primary} ${Button.medium}`} >
          <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >Continue</p>
        </div>
      </a>
    </div>
  )
}

export default Homepop
