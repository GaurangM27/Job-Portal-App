import React, {useState} from "react";
import { Box,Grid,FilledInput ,Select,MenuItem,Dialog,DialogTitle,DialogContent,DialogActions,makeStyles,Button,IconButton, Typography, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon} from '@material-ui/icons';
import theme from "../../theme/theme";

const useStyles = makeStyles((theme) => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        cursor: "pointer",
        "&:hover" : {
            backgroundColor: theme.palette.secondary.main,
        color: "#fff",
        }
    },
    included : {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    }
}))


export default (props)=> {
  
  const [loading , setLoading] = useState(false);
    const [jobDetails,setJobDetails] = useState({
        title : "",
        type : "Full Time",
        companyName : "",
        companyUrl : "",
        link : "",
        location : "Remote",
        description : "",
        skills : [],
    }) 

    const handleChange = e =>{
        e.persist();
        setJobDetails(oldState => ({...oldState,[e.target.name] : e.target.value}))
    }

    const handleSubmit = async ()=>{
      for(const field in jobDetails){
        if (typeof jobDetails[field] === 'string' && !jobDetails[field])
        return;
      }
      if(!jobDetails.skills.length) return;
      setLoading(true);
      await props.postJobs(jobDetails);
      setLoading(false);
    }

    const addRemoveSkill = (skill) => jobDetails.skills.includes(skill) ? 
    setJobDetails((oldState => ({
      ...oldState,skills : oldState.skills.filter((s) => s !== skill ),
    })))
    :  
    setJobDetails(oldState => ({...oldState, skills:  oldState.skills.concat(skill),
    }));

    const classes=useStyles();
    const skills = ["JavaScript", "React", "Node", "Vue", "Firebase", "MongoDB", "SQL"];
    return (
      <Dialog open={props.modal} fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Post Job
            <IconButton onClick={props.closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FilledInput 
              onChange={handleChange}
               name="title"
               value={jobDetails.title}
                autoComplete="off"
                placeholder="Job Title *"
                disableUnderline
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Select
              onChange={handleChange} 
              name="type"
              value={jobDetails.type}
                fullWidth
                disableUnderline
                variant="filled"
              >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <FilledInput 
              onChange={handleChange}
              name="companyName"
              value={jobDetails.companyName}
                autoComplete="off"
                placeholder="Company Name *"
                disableUnderline
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FilledInput 
              onChange={handleChange}
              name="companyUrl"
              value={jobDetails.companyUrl}
                autoComplete="off"
                placeholder="Company URL *"
                disableUnderline
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Select
              onChange={handleChange}
              name="location"
              value={jobDetails.location}
                fullWidth
                disableUnderline
                variant="filled"
              >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="In-Office">In-Office</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <FilledInput 
              onChange={handleChange}
              name="link"
              value={jobDetails.link}
                autoComplete="off"
                placeholder="Job Link *"
                disableUnderline
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FilledInput 
              onChange={handleChange}
              name="description"
              value={jobDetails.description}
                autoComplete="off"
                multiline
                rows={4}
                placeholder="Job Description *"
                disableUnderline
                fullWidth
              />
            </Grid>
          </Grid>
          <Box>
            <Typography>Skills</Typography>
            <Box display="flex">
              {skills.map((skill) => (
                <Box onClick={() => addRemoveSkill(skill)} className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}` } key={skill}>
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            color="red"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption">*Required Fields</Typography>
            <Button onClick={handleSubmit} 
            variant="contained" 
            disableElevation 
            color="primary"
            disabled={loading}
            >
              {loading ? (<CircularProgress color="secondary"  size={22}/>)
              : ("Post Job")
              }
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
}