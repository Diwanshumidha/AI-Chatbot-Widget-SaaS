"use client"

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const ProSidebar = () => {
  return (
    <div className='flex flex-col'><Sidebar>
    <Menu>
      <SubMenu label="Charts">
        <MenuItem> Pie charts </MenuItem>
        <MenuItem> Line charts </MenuItem>
      </SubMenu>
      <MenuItem> Documentation </MenuItem>
      <MenuItem> Calendar </MenuItem>
    </Menu>
  </Sidebar>
  </div>
  )
}

export default ProSidebar