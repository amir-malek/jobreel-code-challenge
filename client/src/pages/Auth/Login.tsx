import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import api from '../../api';
import { AxiosError, AxiosResponse } from 'axios';
import { Container } from '@mui/material';

interface IInputs {
    email?: string
    password?: string
}

export default function Login() {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [inputs, setInputs] = React.useState<IInputs>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = React.useState<IInputs>({
        email: '',
        password: ''
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
        api.post('/auth/login', inputs).then((r: AxiosResponse) => {
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={inputs.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={inputs.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={loading}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Link to="/auth/signup">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}