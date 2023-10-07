import React from "react";
import { Box,Grid,FilledInput,Select,MenuItem,Dialog,DialogTitle,DialogContent,DialogActions } from "@material-ui/core";


export default (props)=> {
    return(
    <Dialog open={true} fullWidth>
        <DialogTitle>Post Job</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FilledInput placeholder="Job Title *" disableUnderline fullWidth/>
                </Grid>
                <Grid  item xs={6}>
                    <Select fullWidth disableUnderline variant="filled" defaultValue="Full Time">
                        <MenuItem value="Full Time">Full Time</MenuItem>
                        <MenuItem value="Part Time">Part Time</MenuItem>
                        <MenuItem value="Contract">Contract</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <FilledInput placeholder="Company Name *" disableUnderline fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <FilledInput placeholder="Company URL *" disableUnderline fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Select fullWidth disableUnderline variant="filled" defaultValue="Remote">
                        <MenuItem value="Remote">Remote</MenuItem>
                        <MenuItem value="In-Office">In-Office</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <FilledInput placeholder="Job Link *" disableUnderline fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <FilledInput multiline rows={4} placeholder="Job Description *" disableUnderline fullWidth/>
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
    )
}