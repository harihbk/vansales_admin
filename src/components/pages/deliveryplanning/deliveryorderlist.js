import React, { useCallback, useMemo, useRef, useState  } from 'react';
import { useLocation} from 'react-router-dom';
import {  TextField, Grid , Typography } from "@material-ui/core";
import Box from '@mui/material/Box';
import axios from 'axios';
import {  IconButton  } from "@material-ui/core";
import { HiOutlinePencil  } from "react-icons/hi";


import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from '@mui/material';
import Addorder from './addorder';

import ClickAwayListener from '@mui/material/ClickAwayListener';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Drawer from '@mui/material/Drawer';








export default function Deliveryorderlist() {
    const [ tripdata , setTripdata ] = React.useState(null)
    const [ addorderpopup , setAddorderpopup ] = React.useState(false)
    const [ drawer , setDrawer ] = React.useState(false);

    const {state} = useLocation();
     const { id } = state; 

     React.useEffect(()=>{

        axios.get(`${process.env.REACT_APP_BASE_URL}/trip/${id}`)
        .then(d=>{
            console.log(d);

            setTripdata(d.data[0])
        })
        .catch(e=>{
          console.log(e.response);
         
           
        })

     },[]);

    const headerInner =  {
        backgroundColor : '#5f615e',
        paddingHorizontal : '30px',
        paddingTop : '13px',
        paddingBottom : '10px'
      }



     
        const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
        const [rowData, setRowData] = useState();
        const [columnDefs, setColumnDefs] = useState([
          { field: 'athlete', rowDrag: true },
          { field: 'country' },
          { field: 'year', width: 100 },
          { field: 'date' },
          { field: 'sport' },
          { field: 'gold' },
          { field: 'silver' },
          { field: 'bronze' },
        ]);
        const defaultColDef = useMemo(() => {
          return {
            width: 200,
            sortable: true,
            filter: true,
          };
        }, []);



      
       


        const [rowDatadd] = useState([
            {SNo : 1 , Order_No: "345783", Customer_Name: "John",Customer_City : 'Ambattur', Mobile_No: 123123},
            {SNo : 2 ,Order_No: "345884", Customer_Name: "william",Customer_City : 'usa', Mobile_No: 32000},
            {SNo: 3 ,Order_No: "345885", Customer_Name: "Boxter", Customer_City : 'africa', Mobile_No: 72000},
            {SNo: 4 ,Order_No: "345885", Customer_Name: "smith", Customer_City : 'Londan', Mobile_No: 72000}
        ]);




        const list = (anchor) => (
          <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 , paddingTop :  12}}
            role="presentation"
           
          >
          <div style={{ display : 'flex' , justifyContent:'end' , paddingRight : 12}}>  <Button variant="outlined"  onClick={()=> setDrawer(false) } sx={{ textAlign : 'right'}}>Close</Button> </div>
                
                <Box component="div" sx={{ paddingLeft: 2 }}>
                      <Card
                        style={{
                          width: 400,
                         marginBottom : 4,
                          backgroundColor: "#18cb5c",
                        }}
                      >
                        <CardContent>
                          <Typography
                            style={{ fontSize: 14 }}
                            color="textSecondary"
                            gutterBottom
                          >
                            Item 1
                          </Typography>
                          <Typography variant="h5" component="h2">
                            Product 1
                          </Typography>
                          <Typography
                            style={{
                              marginBottom: 12,
                            }}
                            color="textSecondary"
                          >
                            QTY 10
                          </Typography>
                          <Typography variant="body2" component="p">
                            Stay Happy
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Stay Safe.....</Button>
                        </CardActions>
                      </Card>


                      <Card
                        style={{
                          width: 400,
                          backgroundColor: "#18cb5c",
                        }}
                      >
                        <CardContent>
                          <Typography
                            style={{ fontSize: 14 }}
                            color="textSecondary"
                            gutterBottom
                          >
                            Item 2
                          </Typography>
                          <Typography variant="h5" component="h2">
                          Product 2
                          </Typography>
                          <Typography
                            style={{
                              marginBottom: 12,
                            }}
                            color="textSecondary"
                          >
                            QTY 20
                          </Typography>
                          <Typography variant="body2" component="p">
                            Stay Happy
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Stay Safe.....</Button>
                        </CardActions>
                      </Card>
                </Box>
          </Box>
        );






        const clickdrawer = () => {
          alert('ds')
        }
     
        const [columnDefsdd] = useState([
            { field: 'SNo', headerName : 'S.No' , rowDrag: true },
            { field: "Order_No" ,headerName : 'Order No' },
            { field: "Customer_Name",headerName : 'Customer Name' },
            { field: "Customer_City",headerName : 'Customer City' },
            { field: "Mobile_No" ,headerName : 'Mobile No'},
            { field: "" ,headerName : 'Action' , cellRendererFramework:(params)=>{
              return  <div className="actionBtnGrp">
                         <IconButton className="edit">
                           <HiOutlinePencil className="editIcon" onClick={ () => setDrawer(!drawer) }  size={15}></HiOutlinePencil>
                         </IconButton>
                        
                         
                       </div>
                     }
                    },

        ]);    

     const childorderids = (data) => {
       console.log(data);

     }


  return (
    <div>
        <>
          <div className="custCard">
              <Grid container alignItems="center">
                <Grid item xs={8}>  
                  <h2 style={{textAlign : 'left', marginTop : 0}}>Delivery Planing</h2>
                </Grid>
                <Grid item xs={4}>
                  <Typography style={{ color : 'blue' , textAlign : 'right', marginBottom: 20}} >
                    <Button className="addOrderBtn" variant="outlined"  onClick={()=> setAddorderpopup(true)  }>
                      + Add Order
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
              { addorderpopup && <Addorder _addorderpopup={addorderpopup} _setAddorderpopup={setAddorderpopup} _childorderids={childorderids}/> }
              <Box sx={{ flexGrow: 1 }} style={ headerInner }>
                <Grid container spacing={2}>
                    <Grid item xs={2} key={0}>
                      <Typography style={{ color : '#fff', fontSize : '1.15rem'}}>Trip id</Typography>
                      <Typography style={{ color : '#fff', fontWeight : 'bold', fontSize : '1.2rem' }}>{ tripdata?.tripid }</Typography>
                    </Grid>
                    <Grid item xs={2} key={1}>
                      <Typography style={{ color : '#fff', fontSize : '1.15rem'}}>Truck Name</Typography>
                      <Typography style={{ color : '#fff', fontWeight : 'bold', fontSize : '1.2rem' }}>{ tripdata?.truckdata[0]?.truckname }</Typography>
                    </Grid>
                    <Grid item xs={2} key={2}>
                      <Typography style={{ color : '#fff', fontSize : '1.15rem'}}>Driver Name:</Typography>
                      <Typography style={{ color : '#fff', fontWeight : 'bold', fontSize : '1.2rem' }}> { tripdata?.driver[0]?.username } </Typography>
                    </Grid>
                    <Grid item xs={2} key={3}>
                      <Typography style={{ color : '#fff', fontSize : '1.15rem'}}>Load Man Name:</Typography>
                      <Typography style={{ color : '#fff', fontWeight : 'bold', fontSize : '1.2rem' }}> { tripdata?.loadman[0]?.username } </Typography>
                    </Grid>
                </Grid>
              </Box>

            
              <div className="ag-theme-alpine" style={{height: 300, width: '100%'}}>
                <AgGridReact
                  className="tripDetailList"
                  rowDragManaged={true}
                  animateRows={true}
                    rowData={rowDatadd}
                    columnDefs={columnDefsdd}>
                </AgGridReact>
            </div>

              <div className="modalAction1">
                <Button className="saveBtn" variant="contained" style={{ marginRight : 5}}> Save </Button>
                <Button className="printBtn"  variant="contained"> Print Loading Sheet </Button>
              </div>
          </div>


          {/* <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() => alert('d') }
      > */}

          <Drawer
            anchor={'right'}
            open={drawer}
            PaperProps={{
              sx: { width: "80%" },
            }}
          >
            { list('top') }
          </Drawer>
          {/* </ClickAwayListener> */}



        </>
    </div>
  )
}
