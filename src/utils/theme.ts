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
            backgroundColor: "transparent",
            width          : '0.5rem',
            height         : '0.5rem',
            boxShadow      : 'inset 0 0 6px rgba(0,0,0,0.00)',
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
      light       : '#7c8f73',
      main        : '#5C7450',
      dark        : '#405138',
      contrastText: '#fff',
    },
    secondary: {
      light       : '#636992',
      main        : '#3C4477',
      dark        : '#2a2f53',
      contrastText: '#fff',
    },
    error: {
      light       : '#b1335a',
      main        : '#9E0031',
      dark        : '#6e0022',
      contrastText: '#fff',
    },
    warning: {
      light       : '#eaaa33',
      main        : '#E59500',
      dark        : '#a06800',
      contrastText: '#000',
    },
    // {
    //   primary: {
    //     light       : '#9fb595',
    //     main        : '#88A37B',
    //     dark        : '#5f7256',
    //     contrastText: '#fff',
    //   },
    //   secondary: {
    //     light       : '#7c85bd',
    //     main        : '#5C67AD',
    //     dark        : '#404879',
    //     contrastText: '#fff',
    //   },
    // }
  },
  typography: {
    fontFamily: publicSans.style.fontFamily,
  },
});

export default theme;