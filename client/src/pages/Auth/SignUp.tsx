import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AxiosError, AxiosResponse } from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { Container } from '@mui/material';

interface IInputs {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    repeatPassword?: string
}

export default function SignUp() {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [inputs, setInputs] = React.useState<IInputs>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [errors, setErrors] = React.useState<IInputs>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        })
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        setErrors({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: ''
        })
        api.post('/auth/signup', inputs).then((r: AxiosResponse) => {
            if (r.status === 200) {
                localStorage.setItem('token', r.data.data.token)
                navigate('/resumes/list')
            }

            setLoading(false)
        }).catch((e: AxiosError<{
            message: string,
            fields: IInputs
        }>) => {
            if (e.response?.data?.fields) {
                setErrors(e.response.data.fields);
            } else {
                console.error('Error without fields:', e.response?.data);
            }
            setLoading(false);
        })
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={inputs?.firstName}
                                onChange={handleChange}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={inputs?.lastName}
                                onChange={handleChange}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={inputs?.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={inputs?.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="repeatPassword"
                                label="Repeat Password"
                                type="password"
                                id="repeatPassword"
                                value={inputs?.repeatPassword}
                                onChange={handleChange}
                                error={Boolean(errors.repeatPassword)}
                                helperText={errors.repeatPassword}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent="flex-start">
                        <Grid item>
                            <Link to="/">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}