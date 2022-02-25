import React from 'react'
import Add from '@material-ui/icons/AddCircleOutlineOutlined'
import FontDownload from '@material-ui/icons/TranslateOutlined'
import Help from '@material-ui/icons/HelpOutlineOutlined'
import NavLink from 'next/link'
import Settings from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
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