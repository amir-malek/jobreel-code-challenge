import { Delete, DescriptionOutlined } from "@mui/icons-material";
import {
    AppBar, Box, Button, Card, CardContent, Checkbox,
    Divider,
    FormControlLabel, Grid, InputAdornment, List, ListItem, TextField, Toolbar, Typography, styled
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { Dispatch, SetStateAction, useState } from "react";
import api from "../../api";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const TitleWithLine = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    '&:after': {
        content: '""',
        flex: 1,
        borderBottom: '1px solid #b0b0b0',
        marginLeft: theme.spacing(1),
    },
}));

interface IWorkExperience {
    title: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
}

export interface IResume {
    _id?: string;
    firstName: string;
    lastName: string;
    summary: string;
    email: string;
    phone: string;
    workExperience: IWorkExperience[]
}

const WorkExperience: React.FC<{ inputs: IResume, setInputs: Dispatch<SetStateAction<IResume>>, errors: any }> = ({ inputs, setInputs, errors }) => {

    const handleDeleteWorkExperience = (index: number) => {
        setInputs(prevState => ({
            ...prevState,
            workExperience: prevState.workExperience.filter((_, idx) => idx !== index)
        }));
    };

    const handleToggleCurrentlyWorking = (index: number) => {
        setInputs(prevState => {
            const newWorkExperience = [...prevState.workExperience];

            newWorkExperience[index] = {
                ...newWorkExperience[index],
                currentlyWorking: !newWorkExperience[index].currentlyWorking
            };

            return { ...prevState, workExperience: newWorkExperience };
        });
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;

        setInputs(prevState => {
            const newWorkExperience = [...prevState.workExperience];

            const updatedExperience = { ...newWorkExperience[index], [name]: value };
            newWorkExperience[index] = updatedExperience;

            return { ...prevState, workExperience: newWorkExperience };
        });
    }

    return inputs.workExperience.map((experience: IWorkExperience, idx: number) => {
        return <>
            <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id={`"title${idx}"`}
                        label="Title"
                        name="title"
                        autoComplete="job_title"
                        autoFocus
                        value={experience.title}
                        onChange={(e) => changeHandler(e, idx)}
                        error={Boolean(errors[`workExperience[${idx}].title`])}
                        helperText={errors[`workExperience[${idx}].title`]}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id={`"company${idx}"`}
                        label="Company"
                        name="company"
                        autoComplete="company"
                        autoFocus
                        value={experience.company}
                        onChange={(e) => changeHandler(e, idx)}
                        error={Boolean(errors[`workExperience[${idx}].company`])}
                        helperText={errors[`workExperience[${idx}].company`]}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mt: 2, mb: 2 }}>
                <TextField
                    label="Description"
                    required
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    name="description"
                    value={experience.description}
                    onChange={(e) => changeHandler(e, idx)}
                    error={Boolean(errors[`workExperience[${idx}].description`])}
                    helperText={errors[`workExperience[${idx}].description`]}
                />
            </Grid>
            <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Start Date"
                        type="date"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        margin="normal"
                        name="startDate"
                        value={experience.startDate}
                        onChange={(e) => changeHandler(e, idx)}
                        error={Boolean(errors[`workExperience[${idx}].startDate`])}
                        helperText={errors[`workExperience[${idx}].startDate`]}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="End Date"
                        type="date"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        margin="normal"
                        name="endDate"
                        value={experience.endDate}
                        onChange={(e) => changeHandler(e, idx)}
                        disabled={experience.currentlyWorking}
                        error={Boolean(errors[`workExperience[${idx}].endDate`])}
                        helperText={errors[`workExperience[${idx}].endDate`]}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={experience.currentlyWorking}
                                onChange={() => handleToggleCurrentlyWorking(idx)}
                                color="primary"
                            />
                        }
                        label="I currently work here"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        sx={{
                            minHeight: 'auto',
                        }}
                        startIcon={<Delete color="error" />}
                        onClick={() => handleDeleteWorkExperience(idx)}
                    >
                        Delete entry
                    </Button>
                </Grid>
            </Grid>
        </>
    })

}

export default function CreateResume() {
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<IResume>({
        firstName: '',
        lastName: '',
        summary: '',
        email: '',
        phone: '',
        workExperience: [{
            title: '',
            company: '',
            description: '',
            startDate: '',
            endDate: '',
            currentlyWorking: true
        }]
    })
    const [inputs, setInputs] = useState<IResume>({
        firstName: '',
        lastName: '',
        summary: '',
        email: '',
        phone: '',
        workExperience: [{
            title: '',
            company: '',
            description: '',
            startDate: '',
            endDate: '',
            currentlyWorking: true
        }]
    })

    const navigate = useNavigate()

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const addWorkExperience = () => {
        setInputs({
            ...inputs,
            workExperience: [
                ...inputs.workExperience,
                {
                    title: '',
                    company: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    currentlyWorking: true
                }
            ]
        })
    }

    const handleSubmit = () => {
        setLoading(true)
        setErrors({
            firstName: '',
            lastName: '',
            summary: '',
            email: '',
            phone: '',
            workExperience: [{
                title: '',
                company: '',
                description: '',
                startDate: '',
                endDate: '',
                currentlyWorking: true
            }]
        })
        api.post('/resumes', inputs).then(() => {
            setLoading(false)
            navigate('/resumes/list')
        }).catch((e: AxiosError<{
            message: string,
            fields: IResume
        }>) => {
            if (e.response?.data?.fields) {
                setErrors(e.response.data.fields);
            } else {
                console.error('Error without fields:', e.response?.data);
            }
            setLoading(false);
        })
    }


    return <>
        <AppBar position="sticky">
            <Toolbar>
                <DescriptionOutlined sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Create new resume
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                    <LoadingButton
                        variant="outlined"
                        color="inherit"
                        loading={loading}
                        sx={{
                            color: 'primary.main',
                            backgroundColor: 'white',
                            borderColor: 'white',
                            minHeight: 'auto',
                            '&:hover': {
                                backgroundColor: '#eeeeee',
                                borderColor: '#eeeeee',
                            },
                        }}
                        startIcon={<CheckIcon color="primary" />}
                        onClick={handleSubmit}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </Toolbar>
        </AppBar>
        <main>
            <Box
                sx={{
                    bgcolor: '#fef7ee',
                    pt: 8,
                    pb: 6,
                    px: 4
                }}
            >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent sx={{ pb: '0 !important' }}>
                                <Typography variant="h5" sx={{ mb: 2 }}>Resume Details</Typography>
                                <TitleWithLine>
                                    <Typography color={"textSecondary"} variant="subtitle1">Personal info</Typography>
                                </TitleWithLine>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First name"
                                            name="firstName"
                                            autoComplete="firstName"
                                            autoFocus
                                            value={inputs.firstName}
                                            onChange={changeHandler}
                                            error={Boolean(errors.firstName)}
                                            helperText={errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="lastname"
                                            label="Last name"
                                            name="lastName"
                                            autoComplete="lastName"
                                            autoFocus
                                            value={inputs.lastName}
                                            onChange={changeHandler}
                                            error={Boolean(errors.lastName)}
                                            helperText={errors.lastName}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} sx={{ mt: 2, mb: 2 }}>
                                    <TextField
                                        label="Summary"
                                        required
                                        multiline
                                        rows={4}
                                        fullWidth
                                        variant="outlined"
                                        name="summary"
                                        value={inputs.summary}
                                        onChange={changeHandler}
                                        error={Boolean(errors.summary)}
                                        helperText={errors.summary}
                                    />
                                </Grid>
                                <TitleWithLine>
                                    <Typography color={"textSecondary"} variant="subtitle1">Contact</Typography>
                                </TitleWithLine>
                                <Grid container spacing={2} sx={{ mb: 1 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            value={inputs.email}
                                            onChange={changeHandler}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Phone"
                                            name="phone"
                                            autoComplete="phone"
                                            autoFocus
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">+49</InputAdornment>
                                                ),
                                            }}
                                            value={inputs.phone}
                                            onChange={changeHandler}
                                            error={Boolean(errors.phone)}
                                            helperText={errors.phone}
                                        />
                                    </Grid>
                                </Grid>
                                <TitleWithLine>
                                    <Typography color={"textSecondary"} variant="subtitle1">Work Experience</Typography>
                                </TitleWithLine>
                                <WorkExperience inputs={inputs} setInputs={setInputs} errors={errors} />
                                <Box sx={{ width: '100%', textAlign: 'center', my: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        onClick={addWorkExperience}
                                        startIcon={<AddIcon />}
                                    >
                                        Add work experience
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>
                            <Typography variant="h5">Resume Preview</Typography>
                            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: '8px', boxShadow: 1 }}>
                                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>{(inputs.firstName) || 'John'} {inputs.lastName || 'Doe'}</Typography>
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>{inputs.email || 'johndoe@email.com'} | {'+49 ' + (inputs.phone || '123123123123')}</Typography>
                                <Divider sx={{ mb: 2 }} />

                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Professional Summary</Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>{inputs.summary || 'Enthusiastic and creative software engineer with a passion for building robust applications. Proven ability to work in fast-paced environments and deliver high-quality solutions.'}</Typography>
                                <Divider sx={{ mb: 2 }} />

                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Work Experience</Typography>
                                {inputs.workExperience.map((exp, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2">{exp.title} at {exp.company}</Typography>
                                        <Typography variant="caption">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</Typography>
                                        <List sx={{ pl: 1 }}>
                                            <ListItem>{exp.description}</ListItem>
                                        </List>
                                    </Box>
                                ))}
                                <Divider sx={{ mb: 2 }} />
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </main>
    </>
}