import React,{useState, useEffect} from "react";
import { Box, Button, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import { app, firestore } from './firebase/config';
import { Close as CloseIcon } from "@material-ui/icons";
import ViewJobModal from "./components/Job/ViewJobModal";

export default () => {
  const [jobs,setJobs]= useState([]);

  const [loading,setLoading]= useState(true);

  const [customSearch,setCustomSearch]= useState(false);

  const [modal, setModal] = useState(false);

  const [viewJob, setViewJob] = useState({});

  const fetchJobs = async () =>{
    setCustomSearch(false);
    setLoading(true);
    const req= await firestore.collection("jobs").orderBy("postedOn", "desc").get();
    const tempJobs= req.docs.map((job) => ({...job.data() ,id: job.id, postedOn : job.data().postedOn.toDate()}));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchCustomJobs = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req= await firestore
    .collection("jobs")
    .orderBy("postedOn", "desc")
    .where("location", '==', jobSearch.location)
    .where("type", '==', jobSearch.type)
    .get();
    const tempJobs= req.docs.map((job) => ({...job.data() ,id: job.id, postedOn : job.data().postedOn.toDate()}));
    setJobs(tempJobs);
    setLoading(false);
  };

  const postJobs  =async jobDetails =>{
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    })
  }

  useEffect( () => {
    fetchJobs();
  },[]);
  return <ThemeProvider theme={theme}>
    
    <Header openModal={() => setModal(true)}/>
    <NewJobModal closeModal={() => setModal(false)} modal={modal} postJobs={postJobs} />
    <ViewJobModal job={viewJob} closeModal={() => setViewJob({})}/>
    <Box xb={3}>
    <Grid container justify="center">
      <Grid item xs={10}>
        <SearchBar fetchCustomJobs={fetchCustomJobs} />

        {
          loading ? (<Box display="flex" justifyContent="center"><CircularProgress /></Box>
          ): (<>
          {customSearch && (<Box my={2} display="flex" justifyContent="flex-end">
            <Button onClick={fetchJobs}>
              <CloseIcon size={20} />
              Custom Search
            </Button>
          </Box>)}
          {
          jobs.map((job)=> (<JobCard open={() => setViewJob(job)} key={job.id} {...job}/>
          ))}
          </>
          )

        }

        
      </Grid>
    </Grid>
    </Box>
  </ThemeProvider>
};
