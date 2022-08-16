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
import { LocalFireDepartment } from '@mui/icons-material';


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
        width : '100%',
        // maxWidth : 400
      }
    }),
    );

export default function AddTruck({...props}) {
  const { _open , _setopen , _fnFromParent , _editdata , _setEditdata } = props 
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [ uservalue, setUservalue] = React.useState('');

  const [ id, setId] = React.useState('');


  const [selectedFile, setSelectedFile] = React.useState();
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const [year, setYear] = React.useState([]);
  const [yearfield, setYearfield] = React.useState("");
  const [ vehicletype , setVehicletype] = React.useState("")
  const [ vehicletypeapi , setVehicletypeapi] = React.useState([])
  const [ ownedby , setOwnedby]= React.useState("")
  const [ registrationdate , setRegistrationdate ] = React.useState("")
  const { register , handleSubmit , formState : {errors} , reset} = useForm();


  function GetYear(){
   const curryear =  new Date().getFullYear()
   const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
   let yy = range(1995,curryear)
   setYear(yy)
    }




  React.useEffect(()=>{
    // get role
    axios.get(`${process.env.REACT_APP_BASE_URL}/getvehicle`)
    .then(r=>{
        console.log(r.data);
      setVehicletypeapi(r.data);
    })
    .catch(e=>{
      console.log(e);
    })
  },[])


  // Bind Edit Record
  React.useEffect(()=>{
    if(_editdata){
      
      var newState = Object.assign({}, _editdata);
    reset(newState);
    console.log(_editdata);
    setId(_editdata?._id)

    setVehicletype(_editdata?.vehicle_type)
    setUservalue(_editdata?.default_driver)
    setValue(_editdata?.insurance_expire)
    setYearfield(_editdata?.year)
    setRegistrationdate(_editdata?.registration_expiry)

    }
 },[_editdata])



  React.useEffect(()=>{
    GetYear()
  },[])


  const classes = useStyles();

  const handleClose = () => {
    _setopen(false);
  };


  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};


  const onsubmit = async (data) => {

    if(id) {

        const formData = new FormData();

        for ( var key in data ) {
        formData.append(key, data[key]);
        }
        formData.append("files" , selectedFile)

    await axios.patch(`${process.env.REACT_APP_BASE_URL}/truck/${id}`,formData)
    .then(r=>{
        _setopen(false);
        _fnFromParent("Truck Updated","success")
    })
    .catch(e=>{
        console.log(e.response);
        _fnFromParent("Truck not Updated","error")
        console.log(e);
    })

   setId('')
   _setEditdata(null)


    } else {


        const formData = new FormData();

        for ( var key in data ) {
        formData.append(key, data[key]);
        }
        formData.append("files" , selectedFile)
    await axios.post(`${process.env.REACT_APP_BASE_URL}/truck`,formData)
    .then(r=>{
        _setopen(false);
        _fnFromParent("Truck Registered Successfully","success")
    })
    .catch(e=>{
        console.log(e.response);
        _fnFromParent("Truck not registered","error")
        console.log(e);
    })

    }
    


    
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
        className="custModal"
        open={_open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper : classes.dialogPaper}}

      >
        <DialogTitle className="modalTitle">{"ADD Truck"}</DialogTitle>
        <DialogContent style={{ paddingTop : 20}}>
          <Grid container alignContent="center" alignItems="center" direction="column" spacing={2}>
          
              <Grid item className = { classes.fullWidth} className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Truck Name" {...register(`truckname`,{ required: true })}/>
                    { errors?.truckname  && <p style={ hStyle }>Truck Name is required</p>}
                  </FormControl>
              </Grid>


              {/* <Grid item  className = { classes.fullWidth}>
                <FormControl  className = { classes.fullWidth}>
                  <TextField variant="outlined" label="Truck No" {...register(`truckno`,{ required: true })}/>
                  { errors?.truckno  && <p style={ hStyle }>Truck Number is required</p>}
                  </FormControl>
              </Grid> */}


              <Grid item  className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Vehicle No" {...register(`vehicle_no`,{ required: true })}/>
                    { errors?.vehicle_no  && <p style={ hStyle }>Vehicle No is required</p>}
                  </FormControl>
              </Grid>


             
              


              <Grid item className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                          <InputLabel id="demo-simple-select-helper-label">Vehicle Type</InputLabel>
                              <Select
                              fullWidth
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={vehicletype}
                              label="Vehicle Type"
                              {...register('vehicle_type', { required: true })}
                                  onChange = {e=>setVehicletype(e.target.value)}
                              >
                              <MenuItem value="">
                                  <em>select</em>
                              </MenuItem>

                              {  vehicletypeapi.map((data) => (
                              <MenuItem value={data._id}>{data.vehicletype}</MenuItem> 

                              )) }
                              
                              {/* <MenuItem value="Al-Anud">Al-Anud</MenuItem>
                              <MenuItem value="Private Vehicle">Private Vehicle</MenuItem> */}

                              
                              </Select>
                              </FormControl>
                              {errors.user && <p>Vehicle Type is required</p>}

              </Grid>





         

              <Grid item  className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Plate No" {...register(`plate_no`,{ required: true })}/>
                    { errors?.plate_no  && <p style={ hStyle }>Plate No is required</p>}
                  </FormControl>
              </Grid>




              <Grid item  className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Make" {...register(`make`,{ required: true })}/>
                    { errors?.make  && <p style={ hStyle }>Make is required</p>}
                  </FormControl>
              </Grid>


              <Grid item  className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Model" {...register(`model`,{ required: true })}/>
                    { errors?.model  && <p style={ hStyle }>Model is required</p>}
                  </FormControl>
              </Grid>




              <Grid item className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                          <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
                              <Select
                              fullWidth
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={yearfield}
                              label="Vehicle Type"
                              {...register('year', { required: true })}
                                  onChange = {e=>setYearfield(e.target.value)}
                              >
                              <MenuItem value="">
                                  <em>select</em>
                              </MenuItem>
                              
                              { year.map(e=>(
                              <MenuItem value={e}>{e}</MenuItem>
                              ))}

                              
                              </Select>
                              </FormControl>
                              {errors.user && <p>Year is required</p>}

              </Grid>




              <Grid item className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                          <InputLabel id="demo-simple-select-helper-label">Owned By</InputLabel>
                              <Select
                              fullWidth
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={ownedby}
                              label="owned_by"
                              {...register('owned_by', { required: true })}
                                  onChange = {e=>setOwnedby(e.target.value)}
                              >
                              <MenuItem value="">
                                  <em>select</em>
                              </MenuItem>
                              <MenuItem value="Al-Anud">Al-Anud</MenuItem>
                              <MenuItem value="Private Vehicle">Private Vehicle</MenuItem>
                              </Select>
                              </FormControl>
                              {errors.owned_by && <p>ownedby is required</p>}

              </Grid>

                
              <Grid item className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
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
                  </FormControl>
              </Grid>

              <Grid item className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Registration Expire Date"
                            value={registrationdate}
                            onChange={(newValue) => {
                            setRegistrationdate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" {...register(`registration_expire`,{ required: true })}/>}
                        />
                    </LocalizationProvider>
                    { errors?.registration_expire  && <p style={ hStyle }>Registration Expire is required</p>}
                  </FormControl>
              </Grid>




            

              <Grid item  className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Vehicle Color" {...register(`vehicle_color`,{ required: true })}/>
                    { errors?.vehicle_color  && <p style={ hStyle }>Vehicle Color is required</p>}
                  </FormControl>
              </Grid>

            


              <Grid item className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                          <InputLabel id="demo-simple-select-helper-label">Default Driver</InputLabel>
                              <Select
                              fullWidth
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={uservalue}
                              label="Default Driver"
                              {...register('default_driver', { required: true })}
                                  onChange = {e=>setUservalue(e.target.value)}
                              >
                              <MenuItem value="">
                                  <em>select</em>
                              </MenuItem>
                              { users.map(e=>(
                              <MenuItem value={e._id}>{e.email} - {e._id}</MenuItem>
                              ))}
                              </Select>
                              </FormControl>
                              {errors.default_driver && <p>Default Driver is required</p>}

              </Grid>



              <Grid item  className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Max Load Capacity" {...register(`max_load_capacity`,{ required: true })}/>
                    { errors?.max_load_capacity  && <p style={ hStyle }>Max Load Capacity is required</p>}
                  </FormControl>
              </Grid>

              <Grid item  className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Min Load Capacity" {...register(`min_load_capacity`,{ required: true })}/>
                    { errors?.min_load_capacity  && <p style={ hStyle }>Min Load Capacity is required</p>}
                  </FormControl>
              </Grid>

              <Grid item  className = { classes.fullWidth}>
                  <FormControl  className = { classes.fullWidth}>
                    <TextField variant="outlined" label="Max Speed" {...register(`max_speed`,{ required: true })}/>
                    { errors?.max_speed  && <p style={ hStyle }>Max Speed is required</p>}
                  </FormControl>
              </Grid>


             











            
              <Grid item className = { classes.fullWidth}>
                      <input type="file"  name="file" onChange={changeHandler} />
                      {isFilePicked ? (
                        <div>
                          <p>Filename: {selectedFile.name}</p>
                          <p>Filetype: {selectedFile.type}</p>
                          <p>Size in bytes: {selectedFile.size}</p>
                          <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <p>Select a file to show details</p>
                      )}
              </Grid>

              

          
          </Grid>
          
        </DialogContent>
        <DialogActions className="modalAction">
          <Button className="cancelBtn" onClick={handleClose}>Cancel</Button>
          <Button  className="submitBtn"  onClick={ handleSubmit(onsubmit)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}