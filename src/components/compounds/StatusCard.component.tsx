import React from 'react';

import { Stack } from '@mui/material'
import StatusIconComponent from '../atoms/StatusIcon.component';
import StatusTextComponent from '../atoms/StatusText.component';

interface StatusCardProps {
  color   : string,
  icon    : React.ReactNode,
  title   : string,
  subtitle: string,
  amount  : string,
}

const StatusCardComponent: React.FC<StatusCardProps> = ({ color, icon, title, subtitle, amount }) => {

  return (
    <Stack
      direction = {"row"}
      display   = {"flex"}
      gap       = {2.5}
      sx        = {{
        alignItems    : "center",
        justifyContent: "center",
        minWidth      : "200px",
        width         : '100%',
      }}
    >
      <StatusIconComponent color={color} icon={icon}/>
      <StatusTextComponent title={title} subtitle={subtitle} amount={amount}/>
    </Stack>
  )
}

export default StatusCardComponent;