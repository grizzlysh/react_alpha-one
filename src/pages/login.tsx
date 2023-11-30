import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Button, CssBaseline, Box, Container, Stack, Typography, TextField, Avatar, Link as MUILink } from '@mui/material'

import styles from '@/styles/Home.module.css'
import theme from '@/utils/theme'
import { useLogin } from '@/hooks/auth/use-login'
import useRedirect from '@/hooks/other/use-redirect'
import { LoginRequest } from '@/services/auth/login.service'
import { useTypedSelector } from '@/hooks/other/use-type-selector'
import PaperComponent from '@/components/_general/atoms/Paper.component'


const LoginPage: NextPage = () => {
  
  const accessToken = useTypedSelector(
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
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const handleLogin: SubmitHandler<LoginRequest> = (data) => {
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
              <form onSubmit={handleSubmit(handleLogin)}>
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
                    rules   = {{ required: {
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
                        autoComplete='off'
                        helperText = {error ? error.message : null}
                        color      = {'primary'}
                        size       = "medium"
                        error      = {!!error}
                        onChange   = {onChange}
                        type       = 'string'
                        value      = {value}
                        label      = {"Username"}
                        variant    = "outlined"
                        sx         = {{mb:2}}
                        fullWidth
                      />
                      )
                    }
                  />

                  <Controller
                    name    = "password"
                    control = {control}
                    rules   = {{ required: {
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
                        autoComplete = 'off'
                        helperText   = {error ? error.message : null}
                        color        = {'primary'}
                        size         = "medium"
                        error        = {!!error}
                        onChange     = {onChange}
                        type         = 'text'
                        value        = {value}
                        label        = {"Password"}
                        variant      = "outlined"
                        sx           = {{mb:2}}
                        fullWidth
                      />
                      )
                    }
                  />

                  <LoadingButton
                    fullWidth
                    type    = "submit"
                    loading = {isLoading}
                    variant = 'contained'
                    color   = {'primary'}
                    sx      = {{
                      mt: 2,
                    }}
                  >
                    LOG IN
                  </LoadingButton>
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
                    fontWeight: 200,
                    "&:hover" : {
                      color         : theme.palette.primary.main,
                    }
                  }}
                >
                  Don't have an account? &nbsp;
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