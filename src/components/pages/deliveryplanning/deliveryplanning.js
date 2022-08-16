import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createStyles , makeStyles , Theme} from '@material-ui/core/styles';
import {  TextField, Grid } from "@material-ui/core";
import { AiOutlinePlus } from "react-icons/ai";
import Add from './add';
import CustomizedSnackbars from "../../common/CustomizedSnackbars";
import axios from 'axios';
import { useNavigate ,Navigate , Outlet} from "react-router-dom";
import './delivery.css'

const useStyles = makeStyles({
    root: {
      color: 'blue'
    },
  });

export default function DeliveryPlanning() {
    const [ open ,setOpen ] = React.useState(false)
    const [snackbar, setSnackbar] = React.useState({
      status : false,
      text  : null,
      severity : null,
    });
     const [ tripdata , setTripdata ] = React.useState([]);
     var navigate = useNavigate();
    const addtrip = () => {
        setOpen(true)
    }


    const childfunction = (message,status) => {

      setSnackbar((state)=>{
        return {
          status : true,
          text   : message,
          severity : status
        }
      })

    }

    React.useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BASE_URL}/trip`)
      .then(d=>{
        setTripdata(d.data)
      })
      .catch(e=>{
        console.log(e.response);
       
         
      })
    },[])


    const classes = useStyles();

  return (
    <> 
          { snackbar?.status &&  <CustomizedSnackbars snackbaralert={snackbar} snackbarstate={setSnackbar}/>}

           { <Add _open={open} _setOpen={setOpen} _childfunction={childfunction}/> }
            <Grid
                container
                spacing={2}
                direction="row"
            >

              { tripdata && tripdata.map(e =>(

                  <Card className="tripCard" onClick={()=>navigate("/home/deliveryorderlist",{ state: { id: e._id } })}>
                    <CardContent style={{paddingTop: 25}}>
                      <Typography className="cardLabel" color="text.secondary"  variant="body2">
                        Trip ID
                      </Typography>

                      <Typography className="cardVal">
                      { e.tripid }
                      </Typography>

                      <Typography className="cardLabel" color="text.secondary"  variant="body2">
                          Truck No
                      </Typography>

                      <Typography className="cardVal">
                      { e.truckdata[0]?.truckno }
                      </Typography>

                      <Typography className="cardLabel" color="text.secondary"  variant="body2">
                          Created Date
                      </Typography>

                      <Typography className="cardVal">
                        { e.createdate }
                      </Typography>
                    </CardContent>
                  </Card>

              ))}
          

          <Card className="tripCardAdd" onClick={()=>addtrip()}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom variant="body2">
                  <AiOutlinePlus size={50}/>
              </Typography>
              <Typography >
                  Create trip
              </Typography>
              </Grid>
            </Grid>
          </Card>

      </Grid>
           
    </>
  )
}
