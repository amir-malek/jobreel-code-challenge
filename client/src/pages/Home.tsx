import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DescriptionOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <DescriptionOutlined sx={{ mr: 2 }} />
                </Toolbar>
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        minHeight: '100vh'
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Welcome to Jobreel
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Elevate your career with Jobreel's
                            easy-to-use resume builder. Craft
                            compelling resumes in minutes and
                            step confidently into your next job
                            opportunity.
                            <br />
                            <br />
                            Begin your success
                            story with us today!
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button component={Link} to="/auth/login" variant="contained">Help create my resume!</Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </>
    );
}