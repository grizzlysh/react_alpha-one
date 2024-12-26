import { Roboto, Public_Sans } from 'next/font/google'
import { createTheme, PaletteMode } from '@mui/material'

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

export const generateTheme = (mode: PaletteMode) => {
  return createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // padding: "0 !important",
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
    mode: mode,
    primary: {
      light       : '#EDF5E8',
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
    // secondary: {
    //   light       : '#DD9296',
    //   main        : '#BA3B3F',
    //   dark        : '#882d31',
    //   contrastText: '#fff',
    // },
    shadow: { 
      light       : '#32372F',
      main        : '#0A1106',
      dark        : '#1B2019',
      contrastText: '#fff',
    },
    radiance: {
      light       : '#FFFFFF',
      main        : '#F6F5F3',
      // main        : '#FBFBFF',
      dark        : '#CCCAC4 ',
      contrastText: '#000',
    },
    error: {
      light       : '#DD9296',
      main        : '#BA3B3F',
      dark        : '#882d31',
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
})
};