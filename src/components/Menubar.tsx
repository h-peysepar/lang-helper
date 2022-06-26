import React from 'react'
import Add from '@mui/icons-material/AddCircleOutlineOutlined'
import FontDownload from '@mui/icons-material/TranslateOutlined'
import Help from '@mui/icons-material/HelpOutlineOutlined'
import NavLink from 'next/link'
import Settings from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
function Menubar() {
     const linkClass = 'text-gray-200 p-4 box-content'
     return (
          <div className='flex w-9/12 items-center justify-around'>
               <IconButton><NavLink href='/add-word'><Add className={linkClass}/></NavLink></IconButton>
               <IconButton><NavLink href='/words'><FontDownload className={linkClass}/></NavLink></IconButton>
               <IconButton><NavLink href='/setting'><Settings className={linkClass}/></NavLink></IconButton>
               <IconButton><NavLink href='/quiz'><Help className={linkClass}/></NavLink></IconButton>
          </div>
     )
}

export default Menubar