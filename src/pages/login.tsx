import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Button, CssBaseline, Box, Container, Stack, Typography, TextField, Avatar, Link as MUILink, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styles from '@/styles/Home.module.css'
import theme from '@/utils/theme'
import { useLogin } from '@/hooks/auth/use-login'
import useRedirect from '@/hooks/other/use-redirect'
import { LoginRequest } from '@/services/auth/login.service'
import { useTypedSelector } from '@/hooks/other/use-type-selector'
import PaperComponent from '@/components/_general/atoms/Paper.component'
import LoadingButtonComponent from '@/components/_general/atoms/LoadingButton.component'


const LoginPage: NextPage = () => {
  
  const [showPassword, setShowPassword] = React.useState(false);
  const accessToken                     = useTypedSelector(
    (state) => state.reducer.user.access_token,
  );

  useRedirect({
    toUrl    : '/',
    condition: !!accessToken === true,
  });
  
  const { mutate: submitLogin, isLoading } = useLogin();

  const { 
    watch,
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: '',
      password: '',
    }
  })

  
  const handleShowPassword      = () => setShowPassword((show) => !show);
  const handleMouseShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const onLogin: SubmitHandler<LoginRequest> = (data) => {
    submitLogin(data)
  }

  return (
    <Box 
      sx={{ 
        display        : 'flex',
        backgroundImage: 'linear-gradient(to right top, #30335f, #00446c, #00536d, #006065, #296a5a, #427557, #5c7e54, #778753, #8f9554, #aba256, #caae5a, #ebb861);'
      }}
    >
      <Box
        component = "main"
        sx        = {{
          flexGrow      : 1,
          width         : '100%',
          display       : 'flex',
          flexDirection : 'column',
          minHeight     : '100vh',
          overflow      : "auto",
          justifyContent: "center",
          alignItems    : "center",
        }}
      >
        <Container disableGutters maxWidth={false}>
          <Stack 
            display        = {"flex"}
            direction      = "row"
            justifyContent = "center"
            alignItems     = "center"
            spacing        = {0}
          >
            <Stack 
              display        = {"flex"}
              direction      = "column"
              justifyContent = "center"
              alignItems     = "stretch"
              spacing        = {0}
            >
            <PaperComponent sx={{ width: '100%' }}>
              <form onSubmit={handleSubmit(onLogin)}>
                <Stack
                  p={3}
                  direction      = {'column'}
                  justifyContent = "center"
                  alignItems     = "center"
                >
                {/* <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                >
                  B
                </Avatar> */}
                  <Avatar 
                    sx= {{ 
                      // width  : 56,
                      // height : 56,
                      bgcolor: theme.palette.primary.main
                    }}
                  >
                    <LockOutlinedIcon />
                  </Avatar>

                  <Typography 
                    mt         = {3}
                    variant    = "h4"
                    component  = "h4"
                    fontWeight = {600}
                    lineHeight = {1.5}
                    fontSize   = {'1.5rem'}
                    sx         = {{
                      [theme.breakpoints.down('md')]: {
                        fontSize: '1.25rem',
                      },
                      // wordWrap: 'break-word',
                    }}
                    >
                    Sign in to your account
                  </Typography>
                  <Typography 
                    mb         = {4}
                    variant    = "subtitle1"
                    component  = "h5"
                    fontWeight = {300}
                    lineHeight = {1.5}
                    fontSize   = {'0.875rem'}
                  >
                    Enter your credentials below
                  </Typography>

                  <Controller
                    name    = "username"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Username fields is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                      <TextField
                        autoComplete = 'off'
                        helperText   = {error ? error.message : null}
                        color        = {'primary'}
                        size         = "medium"
                        error        = {!!error}
                        onChange     = {onChange}
                        type         = 'string'
                        value        = {value}
                        label        = {"Username"}
                        variant      = "outlined"
                        sx           = {{mb:2}}
                        fullWidth
                      />
                      )
                    }
                  />

                  <Controller
                    name    = "password"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Password fields is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                      <TextField                    
                        fullWidth
                        autoComplete = 'off'
                        helperText   = {error ? error.message : null}
                        color        = {'primary'}
                        size         = "medium"
                        error        = {!!error}
                        onChange     = {onChange}
                        type         = {showPassword ? 'text' : 'password'}
                        value        = {value}
                        label        = {"Password"}
                        variant      = "outlined"
                        sx           = {{mb:2}}
                        InputProps   = {{
                          endAdornment : (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label  = "toggle password visibility"
                                onClick     = {handleShowPassword}
                                onMouseDown = {handleMouseShowPassword}
                                edge        = "end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>),
                        }}
                      />
                      )
                    }
                  />

                  <LoadingButtonComponent          
                    fullWidth
                    buttonColor = 'primary'
                    disabled    = {!isValid}
                    type        = "submit"
                    isLoading   = {isLoading}
                    variant     = 'contained'
                    sx          = {{
                      mt: 2,
                    }}
                  >
                    LOG IN
                  </LoadingButtonComponent>
                </Stack>
              </form>
            </PaperComponent>
            
            <PaperComponent sx={{ width: '100%' }}>
              <Box
                display        = {"flex"}
                justifyContent = "center"
                alignItems     = "center"
              >
                <Typography
                  sx        = {{
                    display   : 'flex',
                    alignItems: 'center',
                    lineHeight: 1.5,
                    fontSize  : '0.875rem',
                    mr        : 1,
                    fontWeight: 200,
                    "&:hover" : {
                      color         : theme.palette.primary.main,
                    }
                  }}
                >
                  Don&apos;t have an account?
                </Typography>
                <MUILink
                  component = {Link}
                  height    = {24}
                  underline = "hover"
                  href      = {'#'}
                  sx        = {{
                    display   : 'flex',
                    alignItems: 'center',
                    lineHeight: 1.5,
                    fontSize  : '0.875rem',
                    fontWeight: 600,
                    "&:hover" : {
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  {"Sign Up"}
                </MUILink>
              </Box>
            </PaperComponent>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default LoginPage;