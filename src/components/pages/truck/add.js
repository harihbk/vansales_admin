import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { createStyles , makeStyles , Theme} from '@material-ui/core/styles';
import {  TextField, Grid } from "@material-ui/core";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useForm } from "react-hook-form";
import axios from 'axios';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) =>
    createStyles({
    dialogPaper: {
        minHeight: '70vh',
        maxHeight: '70vh',
        minWidth : '120vh',
        maxWidth : '120vh'
    },
    content : {
    width : '100%'
    },
    fullWidth : {
        width: '50vh'
      }
    }),
    );

export default function AddTruck({...props}) {
  const { _open , _setopen , _fnFromParent } = props 
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [ uservalue, setUservalue] = React.useState('');

  

  const { register , handleSubmit , formState : {errors} , reset} = useForm();


  const classes = useStyles();

  const handleClose = () => {
    _setopen(false);
  };

  const onsubmit = (data) => {

    axios.post(`${process.env.REACT_APP_BASE_URL}/truck`,data)
    .then(r=>{
        _setopen(false);
        _fnFromParent("Truck Registered Successfully","success")
       // console.log(r);
    })
    .catch(e=>{
        console.log(e.response);
        _fnFromParent("Truck not registered","error")

        console.log(e);
    })


      console.log(data);
  } 

  React.useEffect(()=>{
    // get driver roles
    axios.get(`${process.env.REACT_APP_BASE_URL}/unassignedusers?role=623fd90da438abd7c3cd675e`)
    .then(r=>{
        setUsers(r.data);
    })
    .catch(e=>{
      console.log(e);
    })

  },[])

  const hStyle = { color: 'red' };



  return (
    <div>
    
      <Dialog
        open={_open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper : classes.dialogPaper}}

      >
        <DialogTitle>{"ADD Truck"}</DialogTitle>
        <DialogContent>
        
            <Grid container alignContent="center" alignItems="center" direction="column" >
                <Grid container alignContent="center" alignItems="center" direction="column" spacing={2}>
                
                    <Grid item>
                        <TextField variant="outlined" label="Truck Name" {...register(`truckname`,{ required: true })}/>
                        { errors?.truckname  && <p style={ hStyle }>Truck Name is required</p>}

                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" label="Truck No" {...register(`truckno`,{ required: true })}/>
                        { errors?.truckno  && <p style={ hStyle }>Truck Number is required</p>}

                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" label="Truck Type" {...register(`trucktype`,{ required: true })}/>
                        { errors?.trucktype  && <p style={ hStyle }>Truck Type is required</p>}

                    </Grid>
                    <Grid item>
                        <FormControl  className = { classes.fullWidth}>
                                <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
                                   <Select
                                    fullWidth
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={uservalue}
                                    label="Role"
                                    {...register('users', { required: true })}
                                        onChange = {e=>setUservalue(e.target.value)}
                                    >
                                    <MenuItem value="">
                                        <em>select</em>
                                    </MenuItem>
                                    { users.map(e=>(
                                    <MenuItem value={e._id}>{e.username}</MenuItem>
                                    ))}
                                    </Select>
                                    </FormControl>
                                    {errors.user && <p>User is required</p>}

                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Insurance Expire Date"
                                value={value}
                                onChange={(newValue) => {
                                setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" {...register(`insurance_expire`,{ required: true })}/>}
                            />
                        </LocalizationProvider>
                        { errors?.insurance_expire  && <p style={ hStyle }>Insurace Expire is required</p>}

                    </Grid>

                   

                
                </Grid>
            </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ handleSubmit(onsubmit)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}