import React, { useState } from 'react'

import './shell.css'

const MENU_ITEMS = [
    "Dashboard",
    "Routes",
    "About",
    "Settings",
    "Contact"
]
const MenuItem = ({name, active, onClick, activeColor, nonActiveColor, textColor}) => {
    return(
        <div className='menu-item'
        onClick={onClick} 
        style={{
            color: textColor,
            backgroundColor: active && `#${activeColor.split('#')[1]}40`
        }}
        >
            {name}
            {
                active &&
                <div className='menu-item-active-indicator' style={{backgroundColor: activeColor}}>

                </div>
            }
            
        </div>
    )
}

export default function UiShell({
    background,
    sidebar, 
    sidebarActive, 
    sidebarText,
    contentText,
    innerCards
}){

    const [ active, setActive ] = useState('Dashboard')

    return(
        <div className='shell-container' style={{backgroundColor: background}}>
            <div className='sidebar' style={{backgroundColor: sidebar}}>
               {
                   MENU_ITEMS.map((item, index) => {
                      return <MenuItem
                            key={index}
                            name={item}
                            active={active === item}
                            onClick={() => setActive(item)}
                            activeColor={sidebarActive}
                            nonActiveColor={sidebar}
                            textColor={sidebarText}
                       />

                   })
               }
            </div>
            <div className='content'> 
               <div className={'card-container'}>

                    <div className='header-block-container'>
                        <div className='header-title' style={{color: contentText }}>
                            Heading
                        </div>
                        <div className='header-subtitle' style={{color: contentText }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                    </div>

                    <div className='card-container-inner'>
                        <div className='card-big' style={{backgroundColor: innerCards}}></div>
                        <div className='side-card-container'>
                            <div className='card-small' style={{backgroundColor: innerCards}}></div>
                            <div className='card-small' style={{backgroundColor: innerCards}}></div>
                            <div className='card-small' style={{backgroundColor: innerCards}}></div>
                        </div>
                    </div>

               </div>   

            </div>
        </div>
    )
}