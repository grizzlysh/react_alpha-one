import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Paper } from '@mui/material';

interface VerticalMenuProps {
  buttonId    : string,
  modalId     : string,
  menuArray   : { 
    handleClick: () => void, 
    title      : string 
  }[],
}

const VerticalMenuComponent: React.FC<VerticalMenuProps> = ({ buttonId, modalId, menuArray }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open                    = Boolean(anchorEl);

  const handleClick             = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose             = () => {
    setAnchorEl(null);
  };

  let menuItem = menuArray.map( (val, idx) => (
    <MenuItem key={idx} onClick={val.handleClick}>{val.title}</MenuItem>
  ))

  return (
    <div>
      <IconButton
        aria-label    = "more"
        id            = {buttonId}
        aria-controls = {open ? modalId : undefined}
        aria-haspopup = "true"
        aria-expanded = {open ? 'true' : undefined}
        onClick       = {handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id            = {modalId}
        anchorEl      = {anchorEl}
        open          = {open}
        onClick       = {handleClose}
        onClose       = {handleClose}
        MenuListProps = {{
          'aria-labelledby': buttonId,
          // role: 'listbox',
        }}
        anchorOrigin = {{
          horizontal: 'left',
          vertical  : 'top',
        }}
        transformOrigin = {{
          horizontal: 'right',
          vertical  : 'top',
        }}
      >
        <Paper 
          sx = {{
            elevation: 0,
            width         : 140,
            overflow      : 'visible',
            filter        : 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            padding       : '4px',
            mt            : '-7px',
            borderRadius  : 2,
            backdropFilter: 'blur(20px)',
          }}
        >
          {menuItem}
        </Paper>
      </Menu>
    </div>
  )
}

export default VerticalMenuComponent;