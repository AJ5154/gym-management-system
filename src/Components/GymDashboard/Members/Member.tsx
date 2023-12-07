import { People, Search } from "@mui/icons-material";
import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Member = () => {
    const navigate= useNavigate()

    const navigateNextPage=()=>{
        navigate("/addmembers")
    }
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container sx={{ mt: 10 }}>
          <Grid item xs>
            <Typography component="h1" variant="h5" sx={{ ml: 30 }}>
              Add Members
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 4 }}
              onClick={navigateNextPage}
            >
              <People /> Add Plan
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ ml: 30, mr: 10, mt:4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <TextField
                label="Search Member Name/Mobile"
                type="search"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} lg={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="member-type-label">Member Type</InputLabel>
                <Select
                  labelId="member-type-label"
                  id="member-type"
                  label="Member Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"InActive"}>InActive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} lg={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="gym-plans-label">Gym Plans</InputLabel>
                <Select
                  labelId="gym-plans-label"
                  id="gym-plans"
                  label="Gym Plans"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"All"}>All</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} lg={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="age-label">Age</InputLabel>
                <Select labelId="age-label" id="age" label="Age">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"General Training"}>
                    General Training
                  </MenuItem>
                  <MenuItem value={"Personal Training"}>
                    Personal Training
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} lg={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="batch-label">Batch</InputLabel>
                <Select labelId="batch-label" id="batch" label="Batch">
                  <MenuItem value={"All"}>All</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Member;
