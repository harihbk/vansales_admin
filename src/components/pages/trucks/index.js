import React , { useState , useRef , useMemo , useEffect , useCallback} from 'react'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, IconButton  } from "@material-ui/core";
import Button from '@mui/material/Button';
import axios from 'axios';
import CustomizedSnackbars from "../../common/CustomizedSnackbars";
import { FaPencilAlt , FaTrashAlt  } from "react-icons/fa";
import { HiOutlinePencil  } from "react-icons/hi";
import { BsTrash  } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import Add from './add';

export const columnCentered = {
    headerClass: 'text-center',
    cellStyle: {
      textAlign: 'center',
     
    }
  }


export default function Index() {

    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [gridApi, setGridApi] = useState(null);
    
    const [open, setOpen] = React.useState(false);
    const [ add , setAdded ] = React.useState(0);
    const [ editdata , setEditdata ] = React.useState(null);
    const [snackbar, setSnackbar] = React.useState({
        status : false,
        text  : null,
        severity : null,
      });
      const perPage = 5;


      const onEdit = useCallback((params) => {
        let data = params.data;
        setEditdata(data)
        setOpen(true)
      })

      const onDelete = useCallback((params) => {
          
    })

    
    const [columnDefs] = useState([
        { field: 'truckname' , headerName: 'Truck Name' , ...columnCentered},
        { field: 'truckno' , headerName: 'Truck No' , ...columnCentered},
        { field: 'vehicletype.vehicletype' , headerName: 'Vehicle Type' , ...columnCentered},
        { field: 'insurance_expire' , headerName: 'Insurance Expire' , ...columnCentered},
        { field: 'users.fullname' , headerName: 'Default Driver' , ...columnCentered},
        { field: 'vehicle_no' , headerName: 'Vehicle No' , ...columnCentered},
        { field: 'owned_by' , headerName: 'Owned By' , ...columnCentered},


        { field: 'Action',...columnCentered,
        cellRendererFramework:(params)=>{
       return  <div className="actionBtnGrp">
                  <IconButton className="edit">
                    <HiOutlinePencil className="editIcon" onClick={()=>{onEdit(params)}} size={15}></HiOutlinePencil>
                  </IconButton>
                  <IconButton className="del">
                    <BsTrash className="deleteIcon" onClick={()=>{onDelete(params)}} size={15}></BsTrash>
                  </IconButton>
                  
                </div>
              }
            },

    ])



   

      const onGridReady = (params) => {
        setGridApi(params.api);
    };

    useEffect(() => {
        if (gridApi) {
          const dataSource = {
            getRows: (params) => {
              const page = params.startRow === 0 ? 0 : params.startRow ;
                 axios.get(`${process.env.REACT_APP_BASE_URL}/truck?$skip=${page}`)
                .then(res => {
                  params.successCallback(res.data.data, res.data.total);
                }).catch(err => {
                  params.successCallback([], 0);
                });
            }
          }
          gridApi.setDatasource(dataSource);
        }
      }, [gridApi,snackbar]);




      const childsubmit = (data) => {
        if (data['_id']){
          axios.patch(`${process.env.REACT_APP_BASE_URL}/truck/${data['_id']}`,data).then(d=>{
            // toogle state chage to trigger useeffect
            setAdded(!add)
            setSnackbar((state)=>{
              return {
                status : true,
                text   : 'truck Edited Successfully',
                severity : 'success'
              }
            })
          }).catch(e=>{
            console.log(e.response);
            if(e.response.status == 409){
              setSnackbar((state)=>{
                return {
                  status : true,
                  text   : `${e.response.data.message}`,
                  severity : 'info'
                }
              })
            }
        })
  
        } else {
  
        axios.post(`${process.env.REACT_APP_BASE_URL}/truck`,data).then(d=>{
          // toogle state chage to trigger useeffect
          setAdded(!add)
          setSnackbar((state)=>{
            return {
              status : true,
              text   : "truck Record Successfully saved.",
              severity : 'success'
            }
          })
        }).catch(e=>{
          console.log(e);
        })
  
        }
      }

      const fnFromParent = (message,status) => {
        setAdded(!add)
        setSnackbar((state)=>{
            return {
              status : true,
              text   : message,
              severity : status
            }
          })
    }


  return (

    <>
    { snackbar?.status &&  <CustomizedSnackbars snackbaralert={snackbar} snackbarstate={setSnackbar}/>}
    { open && <Add _open={open} _setopen={setOpen} _fnFromParent={fnFromParent}  _editdata={editdata} _setEditdata={setEditdata}/>}

 
       <div className="custCard">
         <Grid container justifyContent ="flex-end" alignItems="center">
           <Grid item xs={10} justifyContent="left">
             <h2 style={{textAlign: 'left'}}>Vehicle List</h2>
           </Grid>
           <Grid item xs={2} >
               <Button
                 variant="outlined"
                 color="success"
                 type="submit"
                 className="button-block addButton"
                 style={{ marginBottom:10 }}
                 onClick={()=>{setOpen(true)}}
                 >
                 <BiPlus /> 
                 Add
                 </Button>
           </Grid>
         </Grid>
         <Grid  alignItems="center"  container
         justifyContent="center" className="userTable">
             <Grid container justifyContent = "flex-end" >
                 <Grid item container justifyContent = "center">
                   <div className="ag-theme-alpine"  style={{minHeight: 350,height: '100%', width : '100%', justifyContent : 'center'}}  >
                       <AgGridReact
                       pagination={true}
                       rowModelType={'infinite'}
                       serverSideStoreType={'partial'}
                       paginationPageSize={perPage}
                       cacheBlockSize={perPage}
                       onGridReady={onGridReady}
                       rowHeight={60}
                       defaultColDef={{ flex: 1, justifyContent : 'center' }}
                       columnDefs={columnDefs}
                       >
                       </AgGridReact>
                   </div>
                 </Grid>
             </Grid>
         
         </Grid>
       </div>
     </>

   
   


  )
}
