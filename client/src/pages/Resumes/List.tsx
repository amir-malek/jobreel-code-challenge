import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Add, Delete, DescriptionOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import api from '../../api';
import { AxiosResponse } from 'axios';
import { IResume } from './Create';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export default function ResumeList() {
    const [resumes, setResumes] = useState<IResume[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getResumes()
    }, [])

    const getResumes = () => {
        api.get('/resumes').then((r: AxiosResponse) => {
            setResumes(r.data.data.resumes)
        })
    }


    const deleteResume = (resumeId: string | undefined) => {
        if (resumeId) {
            setLoading(true)
            api.delete(`/resumes/${resumeId}`).then(() => {
                setLoading(false)
                getResumes()
            })
        }
    }

    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <DescriptionOutlined sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Resume List
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            sx={{
                                color: 'primary.main', // Text color
                                backgroundColor: 'white', // Background color
                                borderColor: 'white', // Border color
                                minHeight: 'auto', // Set height to auto
                                '&:hover': {
                                    backgroundColor: '#eeeeee', // Lighter shade for hover state
                                    borderColor: '#eeeeee',
                                },
                            }}
                            startIcon={<Add />}
                            component={Link}
                            to="/resumes/create"
                        >
                            Create new
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <main style={{ minHeight: '100vh', backgroundColor: '#fef7ee' }}>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {resumes.map((card) => (
                            <Grid key={card._id} item xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.firstName} {card.lastName}
                                        </Typography>
                                        <Typography>
                                            {card.summary}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button component={Link} to={`/resumes/${card._id}`} size="small">View</Button>
                                        <LoadingButton
                                            startIcon={<Delete />}
                                            size="small"
                                            loading={loading}
                                            color='error'
                                            onClick={() => deleteResume(card._id)}
                                        >
                                            Delete
                                        </LoadingButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </>
    );
}