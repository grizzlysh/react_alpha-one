import React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import { Chip, Link as MUILink, Typography, useTheme} from '@mui/material';
// import Chip from '@mui/joy/Chip'
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
// import MUILink from '@mui/material/Link';

interface CrumbsProps {
  linkRef       : string,
  last          : boolean,
  textDefault   : string | undefined,
  textGenerator?: () => string | undefined,
}


const StyledCrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.grey[300]
  return {
    // fontWeight        : theme.typography.fontWeightRegular,
    backgroundColor,
    color             : theme.palette.grey[800],
    height            : theme.spacing(3),
    lineHeight        : 1.57,
    fontSize          : '0.875rem',
    fontWeight        : 400,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active'        : {
      boxShadow      : theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

const CrumbComponent: React.FC<CrumbsProps> = ({ linkRef, textDefault, textGenerator, last }) => {

  const theme           = useTheme();
  const [text, setText] = React.useState(textDefault);

  React.useEffect( () => {
    // If `textGenerator` is nonexistent, then don't do anything
    if (!(textGenerator)) { 
      return;
    } else {
      // Run the text generator and set the text again
      const finalText = textGenerator();
      setText(finalText);
    }
  }, [textGenerator]);
  return (
    <>
    {
      (last) ? 
        // <StyledCrumb
        //   component = "a"
        //   label     = {textDefault}

        //   disabled
        //   icon      = {<HomeIcon fontSize="small" />}
        // />
        
        <Typography
          // color  = "text.primary"
          height = {24}
          sx     = {{
            display   : 'flex',
            alignItems: 'center',
            lineHeight: 1.5,
            fontSize  : '1rem',
            fontWeight: 400,
          }}
        >
          {/* <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
          {text == 'Dashboard' ? <HomeIcon sx={{ fontSize: "1.25 rem", color : theme.palette.shadow.main }} /> : text}
        </Typography>
      :
        // <StyledCrumb
        //   component = "a"
        //   href      = {linkRef}
        //   label     = {textDefault}
        //   icon      = {<HomeIcon fontSize="small" />}
        // />
        <MUILink
          component = {Link}
          height    = {24}
          underline = "hover"
          sx        = {{
            display   : 'flex',
            alignItems: 'center',
            lineHeight: 1.5,
            fontSize  : '1rem',
            fontWeight: 400,
            "&:hover": {
              color         : "#ffffff",
            }
          }}
          color     = "#212b36"
          href      = {linkRef}
        >
          {/* <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
          {/* {text} */}
          {text == 'Dashboard' ? <HomeIcon sx={{ fontSize: "1.25 rem", color : theme.palette.shadow.main }} /> : text}
        </MUILink>
    }
    </>
  )
}

export default CrumbComponent;