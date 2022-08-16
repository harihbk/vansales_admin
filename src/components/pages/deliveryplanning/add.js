import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {  TextField, Grid } from "@material-ui/core";
import { createStyles , makeStyles , Theme} from '@material-ui/core/styles';
import axios from 'axios';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import styleFunctionSx from '@mui/system/styleFunctionSx';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    root: {
      color: 'blue'
    },
    dialogPaper: {
        minHeight: '50vh',
        maxHeight: '40vh',
        minWidth : '100vh',
        maxWidth : '100vh'
    },
  });



export default function Add({...props}) {
  const { _open , _setOpen , _childfunction} = props;
  const [open, setOpen] = React.useState(false);
  const [truckno, setTruckno] = React.useState([]);
  const [trucknoselect, setTrucknoselect] = React.useState('');
  const [trucktype, setTrucktype] = React.useState('');
  const [driver, setDriver] = React.useState('');
  const [loadman, setLoadman] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());


  const { register , handleSubmit , setValue , formState : {errors} , reset} = useForm();


  const handleClickOpen = () => {
  };

  const handleClose = () => {
    _setOpen(false);
  };

  React.useEffect(()=>{
    if(_open){
      axios.get(`${process.env.REACT_APP_BASE_URL}/gettruck`)
      .then(d=>{
          setTruckno(d.data)
          console.log(d);
      })
      .catch(e=>{
          console.log(e);
      })
    }
  
  },[_open])


  React.useEffect(()=>{
    let truck_id = trucknoselect;
    if(truck_id){
      console.log(truck_id);
      let _truck =  [...truckno?.truck];
      let obj = _truck.find(e=>e._id == truck_id);
      setTrucktype(obj['trucktype'] || '')
//      setValue('trucktype',obj['trucktype']) 
      console.log(obj);
    }
  
    

  },[trucknoselect]);

  const onsubmit = (data) => {

    axios.post(`${process.env.REACT_APP_BASE_URL}/trip`,data)
    .then(d=>{
      _childfunction("Trip Created Successfully","success")
      _setOpen(false)
        console.log(d);
    })
    .catch(e=>{
      console.log(e.response);
      _childfunction("Trip not created","error")
      _setOpen(false)
        console.log(e);
    })
    
  }

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };


  const classes = useStyles();


  return (
    <div>
      
      <Dialog
        className="custModal"
        open={_open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        classes={{ paper : classes.dialogPaper}}
        
      >
        <DialogTitle className="modalTitle">{"Assign Driver and Load Man"}</DialogTitle>
        <DialogContent style={{paddingTop: 30}}>

        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-around" alignItems="center">
              <Grid item xs={6}>
                  <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Truck No</InputLabel>
                        <Select
                              fullWidth
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value = { trucknoselect }
                              label="Truck No"
                              {...register('truck', { required: true })}
                                onChange={(e)=> setTrucknoselect(e.target.value)  }
                                
                            >
                              <MenuItem value="">
                                <em>select</em>
                              </MenuItem>
                              { truckno?.truck?.map(e=>(
                                  <MenuItem value={e._id}>{e.truckno}</MenuItem>
                                  ))}
                            </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={6}>
                  <TextField variant="outlined" label="Truck Type" {...register('trucktype', { required: true })} value={trucktype} InputLabelProps={{ shrink: true }}  InputProps={{
                              readOnly: true, }}  fullWidth></TextField>
              </Grid>
              <Grid item xs={6}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">Driver</InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value = { driver }
                        label="Driver"
                        
                        {...register('driver', { required: true })}
                        onChange = {(e)=> setDriver(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>select </em>
                        </MenuItem>
                        { truckno?.driver?.map(e=>(
                            <MenuItem value={e._id}>{e.username}</MenuItem>
                            ))}
                      </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">LoadMan</InputLabel>
                      <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value = { loadman }
                          label="LoadMan"
                          
                          {...register('loadman', { required: true })}
                          onChange = {(e)=>setLoadman(e.target.value)}
                        >
                          <MenuItem value="">
                            <em>select</em>
                          </MenuItem>
                          { truckno?.loadman?.map(e=>(
                              <MenuItem value={e._id}>{e.username}</MenuItem>
                              ))}
                      </Select>
                  </FormControl>
              </Grid>

              <Grid item xs={6}>
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    label="Material Date Picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />

                  </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={6}>
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    label="Material Date Picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />

                  </MuiPickersUtilsProvider>
              </Grid>

            </Grid>
          </Box>
        </DialogContent>
        <DialogActions className="modalAction">
          <Button className="cancelBtn" onClick={handleClose}>Cancel</Button>
          <Button className="submitBtn"  onClick={handleSubmit(onsubmit)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}