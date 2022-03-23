import React from 'react'
import { useForm } from "react-hook-form";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {  TextField, Grid } from "@material-ui/core";
import { createStyles , makeStyles , Theme} from '@material-ui/core/styles';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

  const useStyles = makeStyles((theme)=>
  createStyles({
    dialogPaper: {
      minHeight: '50vh',
      maxHeight: '50vh',
      minWidth : '70vh',
      maxWidth : '70vh'
  },
  heading : {
    textAlign : 'center'
  },
  fullWidth : {
    width : '-webkit-fill-available',
    marginTop : '15px'
  },
  })
  )

export default function AddSubRole(props) {
  const { _open , _setOpen , _Onsubmit ,_editdata , _setEditdata } = props
  const { register , handleSubmit , formState : { errors } ,reset } = useForm();
  const [role , setRole] = React.useState([]);
  const [rolevalue , setRolevalue] = React.useState('');


  const handleClose = () => {
    _setOpen(false)
  }

  React.useEffect(()=>{
    // get role
    axios.get(`${process.env.REACT_APP_BASE_URL}/_role`)
    .then(r=>{
      setRole(r.data);
    })
    .catch(e=>{
      console.log(e);
    })

  },[])

  React.useEffect(()=>{
  if(_editdata){
    var newState = Object.assign({}, _editdata);
    delete newState.role;
    reset(newState);
   setRolevalue(_editdata['role']['_id'])
  }
  },[_editdata])

  const Oncancel = () => {
    _setOpen(false)
  }

  const onsubmit = (data) =>{
    _Onsubmit(data)
    _setOpen(false)
    _setEditdata(null)


  }

  const classes = useStyles();

  return (
    <>

    <Dialog
    open={_open}
    TransitionComponent={Transition}
    aria-describedby="alert-dialog-slide-description"
    classes={{ paper : classes.dialogPaper}}

  >
    <Grid container direction="column"  justifyContent="center"  alignItems="center">
  <form>
    <DialogContent >
    <DialogTitle>Add User</DialogTitle>
               <Grid container direction="column" spacing={2}>
                    <Grid item >
                      <TextField variant="outlined" label="Name" {...register('name', { required: true })}/>
                      {errors.name && <p>Email is required</p>}
                    </Grid>
                    <Grid item >
                    <FormControl className = { classes.fullWidth} >
                                          <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                                          <Select
                                               fullWidth
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={rolevalue}
                                                label="Role"
                                                {...register('role', { required: true })}
                                                  onChange = {e=>setRolevalue(e.target.value)}
                                              >
                                                <MenuItem value="">
                                                  <em>select</em>
                                                </MenuItem>
                                               { role.map(e=>(
                                                <MenuItem value={e._id}>{e.slug}</MenuItem>
                                               ))}
                                              </Select>
                                              </FormControl>
                                              {errors.role && <p>Role is required</p>}

                    </Grid>
                </Grid>
    </DialogContent>
</form>
  
    </Grid>
    <DialogActions>
      <Button onClick={handleSubmit(onsubmit)}>Submit</Button>
      <Button onClick={Oncancel}>cancel</Button>
    </DialogActions>
  </Dialog>
</>
  )
}
