import React from 'react';

import { Box, Typography, Stack } from '@mui/material'

interface StatusTextProps {
  color   ?: string,
  title   : string,
  subtitle: string,
  amount  : string,
}

const StatusTextComponent: React.FC<StatusTextProps> = ({ title, subtitle, amount }) => {

  return (
    <Stack
      flexDirection = {"column"}
      display       = "flex"
      gap           = {0.5}
      sx            = {{
        margin: 0,
      }}
    >
      <Typography
        variant    = "subtitle1"
        component  = "h6"
        // color      = "textSecondary"
        fontWeight = {600}
        lineHeight = {1.5}
        fontSize   = {"1rem"}
      >
        {title}
      </Typography>
      <Box
        // variant    = "caption"
        // component  = "h6"
        color      = "#919eab"
        fontWeight = {400}
        lineHeight = {1.5}
        fontSize   = {"0.875rem"}
      >
        {subtitle}
      </Box>
      <Typography
        variant    = "subtitle2"
        component  = "h6"
        // color      = "textSecondary"
        fontWeight = {600}
        lineHeight = {1.5}
        fontSize   = {"0.875rem"}
      >
        {amount}
      </Typography>
    </Stack>
  )
}

export default StatusTextComponent;