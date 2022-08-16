import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm } from "react-hook-form";
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
    width : '-webkit-fill-available',
    marginTop : '15px'
  },
  buttonwidth:{
    width : '45%',
    marginTop : '22px'
  }
  }),
);


export default function Add(props) {
  const { _open , _setopen ,_childsubmit , _editdata  , _setEditdata } = props;
  const { register , handleSubmit , formState : {errors} , reset} = useForm();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');
  const [role , setRole] = React.useState([]);
  const [rolevalue , setRolevalue] = React.useState('');
  const [passwordvalid , setPasswordvalid] = React.useState(true);
  const [ designation , setDesignation ] = React.useState([])
  const [designationvalue , setDesignationvalue] = React.useState('');

  


  // Bind Edit Record
  React.useEffect(()=>{
    if(_editdata){
      setPasswordvalid(false)
      
      var newState = Object.assign({}, _editdata);
      delete newState.role;
      delete newState.designation;

    reset(newState);
    //  setRolevalue(_editdata.role._id)
    //  setDesignationvalue(_editdata.designation?._id )

  
    }
 },[_editdata])


  const onsubmit = (data) => {
    
    _childsubmit(data)
    _setEditdata(null)
    _setopen(false)
  }

  const classes = useStyles();

  return (
    
    <div>
      
      <Dialog
        open={_open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper : classes.dialogPaper}}
      >
       <Grid container justifyContent="center" alignItems="center" direction="column">
      <DialogTitle>Add User</DialogTitle>
       <DialogContent className={classes.content} >
                        <form>
                            <Grid container direction="column" spacing={0}>
                                       
                                        <Grid item> 
                                            <TextField
                                                {...register('vehicletype', { required: true })}
                                                type="text"
                                                placeholder="Vehicle Type"
                                                fullWidth
                                                name="vehicletype"
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-name"
                                                label="Vehicle Type"
                                                autoFocus
                                            />
                                              {errors.vehicletype && <p>Please check the Vehicle Type</p>}

                                        </Grid>
                                        <Grid item> 
                                            <TextField
                                                {...register('description')}
                                                type="text"
                                                placeholder="description"
                                                fullWidth
                                                name="description"
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-name"
                                                label="description"
                                                autoFocus
                                            />

                                        </Grid>


                                        <Grid item justifyContent='space-between' alignItems='center' style={{ 'display':'flex','alignContent':'center',alignItems:'center',marginTop:'6%'}}>
                                          
                                          <Button variant="contained" color="primary"  className={classes.buttonwidth} size="medium" onClick={ handleSubmit(onsubmit) }>
                                            Submit
                                          </Button>
                                          <Button variant="outlined" className={classes.buttonwidth} size="medium" onClick={ () => _setopen(false) }>
                                            Cancel
                                          </Button>
                                          </Grid>
                                     
                                       

                            </Grid>
                        </form>
    </DialogContent>
        </Grid>
        <DialogActions>

    </DialogActions>
      </Dialog>
    </div>
  );
}
