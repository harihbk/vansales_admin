import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {  TextField, Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFields( {...props} ) {
    const { _addfield , _setAddfield } = props;
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = React.useState([{ modulename: "", slugname : "", fields : [ { field : ""} ] }])

    const { register , unregister ,handleSubmit , formState : {errors} , reset} = useForm();

   
  
    const handleClose = () => {
        let obj = {
            status : false,
            rowData : {}
        }
        _setAddfield(obj);
    };

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }

     let handleinnerChange = (innerindex , outerindex , e) => {
        let newFormValues = [...formValues];
        newFormValues[outerindex].fields[innerindex][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }

    let addFormFields = () => {
        setFormValues([...formValues, { modulename: "", slugname: "" , fields : [ { field : ""} ] }])

     }

     let addinnerFormFields = (index) => {
        let newFormValues = [...formValues];
        console.log(newFormValues);
        newFormValues[index]['fields'].push({ field : ""})
          
        setFormValues(newFormValues)

     }


    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)

        // unregister form of index
        unregister(`test.${i}`);

    }

    let removeinnerFormFields = (innerindex , outerindex ) => {
        let newFormValues = [...formValues];
        newFormValues[outerindex].fields.splice(innerindex,1)
        setFormValues(newFormValues)

    }


    // let handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(JSON.stringify(formValues));
    // }
  
     let onsubmit = (data) => {
      console.log(data);
     }

     const hStyle = { color: 'red' };


    return (
      <div>
        
        <Dialog
          fullScreen
          open={_addfield.status}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Add TextFields for { _addfield.rowData.name }
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>

        
     
   
          <form >
        {
            formValues?.map((element,index)=>(
                <>
                 <List sx={{  bgcolor: 'background.paper' }}>
                        <ListItem disableGutters>
                            <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                                <Grid container direction="row" spacing={2}  xs={12} justifyContent="center" style={{ marginBottom : '12px' }}>
                                    <Grid item  >
                                        <TextField variant="outlined" label="Module Name"   {...register(`test.${index}.modulename`,{ required: true })}   ></TextField>
                                        { errors?.['test']?.[index]?.['modulename']  && <p style={ hStyle }>Module Name is required</p>}

                                    </Grid>  
                                    <Grid item >
                                        <TextField variant="outlined" label="Slug Name"  {...register(`test.${index}.slugname`,{ required: true })} ></TextField>
                                        { errors?.['test']?.[index]?.['slugname']  && <p style={ hStyle }>Slug is required</p>}

                                    </Grid>   
                                
                                    <Grid item style={{ display:'flex' }} justifyContent="center" alignItems="center">
                                        <Button variant="outlined" color="error" onClick={ () => removeFormFields(index) }>Remove</Button>
                                    </Grid> 
                                </Grid>   

                                { element?.fields?.map((e,i)=>(
                                    <>
                                        <Grid container style={{ maxwidth : '108%'}} direction="row" spacing={1} xs={12} justifyContent="center" style={{ marginBottom : '12px' }}>
                                            <Grid item>
                                                <TextField variant="outlined" label="Field Name" {...register(`test.${index}.fields.${i}.field`,{ required: true })} ></TextField>
                                                { errors?.['test']?.[index]?.['fields']?.[i]?.['field']  && <p style={ hStyle }>Slug is required</p>}

                                            </Grid>
                                            <Grid item style={{ display:'flex' }} justifyContent="center" alignItems="center">
                                                <Button variant="outlined" color="error" onClick={ () => removeinnerFormFields(i , index) }>Remove</Button>
                                            </Grid> 
                                        </Grid>       
                                    </>
                                    ))
                                }
                                   
                                <Grid item style={{ display:'flex' }} justifyContent="center" alignItems="center">
                                    <Button variant="contained" onClick={ () => addinnerFormFields(index) }>Add</Button>
                                </Grid> 

                            </Grid> 
                        </ListItem>

                      
                                    
                </List>
                </> 
            ))
        }

             <Grid item style={{ display:'flex' }} justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={ () => addFormFields() }>Add</Button>
            </Grid> 

            <Button variant="outlined" onClick={ handleSubmit(onsubmit) }>Submit</Button>
        </form>
        </Dialog>
      </div>
    );

}