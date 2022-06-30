import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import NavLink from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import FontDownloadIcon from '@mui/icons-material/FontDownload';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';

import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Help from '@mui/icons-material/HelpOutlined';

function Menubar() {
  const linkClass = 'text-gray-200 p-4 box-content';
  const router = useRouter();
  const routes = useMemo(
    () => [
      {
        path: '/add-word',
        Icon: AddCircleOutlineIcon,
        ActiveIcon: AddCircleIcon,
      },
      {
        path: '/words',
        Icon: FontDownloadOutlinedIcon,
        ActiveIcon: FontDownloadIcon,
      },
      {
        path: '/setting',
        Icon: SettingsOutlinedIcon,
        ActiveIcon: SettingsIcon,
      },
      {
        path: '/quiz',
        Icon: HelpOutlineOutlinedIcon,
        ActiveIcon: Help,
      },
    ],
    [router]
  );
  return (
    <div className='flex w-9/12 items-center justify-around cursor-pointer'>
      {routes.map(route => (
        <NavLink key={route.path} href={route.path}>
          {router.pathname === route.path ? (
            <route.ActiveIcon className={linkClass} />
          ) : (
            <route.Icon className={linkClass} />
          )}
        </NavLink>
      ))}
    </div>
  );
}

export default Menubar;
