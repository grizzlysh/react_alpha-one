import React from 'react';


import { Paper, Box, Stack, Divider } from '@mui/material'
import StatusCardComponent from '../molecules/StatusCard.component';
import PaperComponent from '../atoms/Paper.component';

interface StatusHeaderProps {
  card: {
    color   : string,
    icon    : React.ReactNode,
    title   : string,
    subtitle: string,
    amount  : string,
  }[]
}

const StatusHeaderComponent: React.FC<StatusHeaderProps> = ({ card }) => {

  return (
    <PaperComponent
      sx={{
        width   : '100%',
        overflow: "auto",
        position: 'relative',
        // transition                 : "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        // maxWidth: "inherit",
        // display                    : 'flex',
        // zIndex                     : 0,
        // position                   : "relative",
      }}
    >
      <Box
        overflow={"auto"}
      >
        <Stack 
          overflow     = {"auto"}
          divider      = {<Divider orientation="vertical" flexItem sx={{mx: 1.5}} />}
          display      = {"flex"}
          direction    = {"row"}
          paddingY     = {2}
          alignContent = {"center"}
          alignItems   = {"center"}
          // justifyContent = {"center"}
          // width     = {"100%"}
        >
          {
            card.map( (val, idx) => (
              <StatusCardComponent key={"statusCard-"+idx} {...val} />
            ))
          }
        </Stack>
      </Box>
    </PaperComponent>
  )
}

export default StatusHeaderComponent;