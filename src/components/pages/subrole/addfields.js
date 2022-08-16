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
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFields( {...props} ) {
    const { _addfield , _setAddfield , _childfunction} = props;
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = React.useState([{ modulename: "", slugname : "", fields : [ { field : ""} ] }]);

    const { register , unregister , remove ,handleSubmit , getValues ,setValue, formState : {errors} , reset} = useForm();

   
  
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
        newFormValues[index]['fields'].push({ field : ""})
        setFormValues(newFormValues)
     }


    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
        // unregister form of index
        unregister(`test.${i}`);

    }

    let removeinnerFormFields = (innerindex , outerindex ) => {
     
        let newFormValues = [...formValues];
        newFormValues[outerindex].fields.splice(innerindex,1);

       // console.log([ outerindex , innerindex ]);
       // console.log( newFormValues[outerindex].fields );
      console.log(getValues(`test.${outerindex}.fields.${innerindex}`)) 
       unregister(`test.${outerindex}.fields.${innerindex}`);

       setFormValues(newFormValues);
       console.log(newFormValues[outerindex].fields);
    }


     let onsubmit = (data) => {
      let _data = data['test'];
   console.log(data);

      if(_addfield.edit){
       axios.patch(`${process.env.REACT_APP_BASE_URL}/modulepermission/update`,_data)
      .then(d=>{   

        _childfunction("Module Permission Updated Successfully","success");
        _setAddfield({status : false})
        

      })
      .catch(e=>{
        _childfunction("Module Permission Not Updated","error");
        _setAddfield({status : false})
      })
      } else {
      axios.post(`${process.env.REACT_APP_BASE_URL}/modulepermission`,_data)
      .then(d=>{   
        _childfunction("Module Permission create Successfully","success");
        _setAddfield({status : false})
       console.log(d);
        
      })
      .catch(e=>{
        _childfunction("Module Permission Not Create","error");
        _setAddfield({status : false})
         console.log(e);
      })

      }


     }

     React.useEffect(()=>{
       // data from parent 
     if(_addfield.edit){
         let modulepermission =  _addfield.modulepermission;
         setFormValues(modulepermission)
         for (let x in modulepermission) {
          setValue(`test.${x}.modulename`, modulepermission[x].modulename)
          setValue(`test.${x}.slugname`, modulepermission[x].slugname)
          setValue(`test.${x}.role`, modulepermission[x].role)
          setValue(`test.${x}.subrole`, modulepermission[x].subrole)
          setValue(`test.${x}._id`, modulepermission[x]._id)

           let fields = modulepermission[x].fields;
           for (let xx in fields ) {
            setValue(`test.${x}.fields.${xx}.field`,fields[xx].field)
            setValue(`test.${x}.fields.${xx}._id`,fields[xx]._id)
           }
        }
     }
     },[_addfield])


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

        
     
   
          <form>
        {
            formValues?.map((element,index)=>(
                <>
                <div {...setValue(`test.${index}.role`, _addfield.rowData.role._id)}></div>
                <div {...setValue(`test.${index}.subrole`, _addfield.rowData._id)}></div>

                 <List sx={{  bgcolor: 'background.paper' }} key={index}>
                        <ListItem disableGutters>
                            <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                                <Grid container direction="row" spacing={2}  xs={12} justifyContent="center" style={{ marginBottom : '12px' }}>
                                    <Grid item  >
                                        <TextField variant="outlined" label="Module Name"   {...register(`test.${index}.modulename`,{ required: true })} ></TextField>
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
                                            {/* <TextField variant="outlined" label="Field Name"  name="field" value={e.field || ""}  onChange={e => handleinnerChange(i ,index, e)} ></TextField> */}
                                                <TextField variant="outlined" label="Field Name"  { ...register(`test.${index}.fields.${i}.field`,{ required: true }) }  ></TextField>
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