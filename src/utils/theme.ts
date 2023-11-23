import { Roboto, Public_Sans } from 'next/font/google'
import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const publicSans = Public_Sans({
  weight  : ['300', '400', '500', '700'],
  subsets : ['latin'],
  display : 'swap',
  fallback: ['sans-serif', 'Arial'],
});


export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // scrollbarColor: "#6B7280 #E5E7EB",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor     : "transparent",
            width               : '0.5rem',
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: "#6B7280",
            borderRadius   : '.5rem',
            // minHeight      : 24,
            // borderRadius   : 8,
            // border         : "3px solid #2b2b2b",
          },
          // "&:hover::-webkit-scrollbar-thumb, & *:hover::-webkit-scrollbar-thumb": {
          //   backgroundColor: "#6B7280",
          //   borderRadius   : '.5rem',
          //   visibility     : "visible",
          // },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    }
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: publicSans.style.fontFamily,
  },
});

export default theme;