import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { Grid } from '@material-ui/core';

import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";

import { MultiSelect } from "react-multi-select-component";




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    color: 'blue'
  },
  dialogPaper: {
      minHeight: '30vh',
      maxHeight: '30vh',
      minWidth : '80vh',
      maxWidth : '80vh'
  },
}));

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

  
export default function Addorder({...props}) {
    const { _addorderpopup , _setAddorderpopup , _childorderids } = props;    
    const [ orderdata , setOrderdata ] = React.useState([]);  
    const [ orderno , setOrderno ] = React.useState('');   
    const [ option , setOption ] = React.useState([]);   
    const [selected, setSelected] = React.useState([]);

    const classes = useStyles();
    const [personName, setPersonName] = React.useState([]);


  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };
 
    const { register , handleSubmit , setValue , formState : {errors} , reset} = useForm();

    
    React.useEffect(()=>{
      
      axios.get(`${process.env.REACT_APP_BASE_URL}/order`)
      .then(d=>{
        let _data = d.data.map(e=>(
          {
            value : e._id,
            label : e.orderno
          }
        ))
        setOrderdata(_data)
         
      })
      .catch(e=>{
        console.log(e.response);
       
         
      })
          },[_addorderpopup])
    
    const handleClose = () => {
        _setAddorderpopup(false)
    }


    const onSubmit = (data) => {
   // console.log(selected);
    _childorderids(selected)
    _setAddorderpopup(false)
    }

  return (
    <div>
     
      <Dialog
        className="custModal"
        open={_addorderpopup}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper : classes.dialogPaper}}
      >
        <DialogTitle className="modalTitle">{"Use Google's location service?"}</DialogTitle>
        <DialogContent style={{paddingTop : 20}}>
          <Box sx={{ width: '100%' }}>
            <Grid spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-around" alignItems="center">
                <Grid item xs={12}>
                  <MultiSelect
                  options={orderdata}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select" />
                </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions className="modalAction">
          <Button className="cancelBtn" onClick={handleClose}>Cancel</Button>
          <Button className="submitBtn"  onClick={handleSubmit(onSubmit)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
