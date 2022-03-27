import React , { useState ,useEffect , useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid  } from "@material-ui/core";
import Button from '@mui/material/Button';
import AddRole from "../role/addrole"
import axios from 'axios';
import CustomizedSnackbars from "../../common/CustomizedSnackbars";
import { FaPencilAlt , FaTrashAlt  } from "react-icons/fa";
import { FcAutomatic } from "react-icons/fc";
import  Rolepermission  from "./rolepermission";

import "./style.scss";


export const columnCentered = {
  headerClass: 'text-center',
  cellStyle: {
    textAlign: 'center',
    // Add the following if you are using .ag-header-cell-menu-button 
    // and column borders are set to none.
    // marginLeft: '-16px'
  }
}

export default function Role() {
    const [open, setOpen] = React.useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [editrow , setEditrow] = useState({});
    const [deleterow , SetDeleterow] = useState({});
    const [permission , setPermission] = useState(false);
    const [selectedrole , setSelectedrole] = useState('');


    const [snackbar, setSnackbar] = React.useState({
      status : false,
      text  : null,
      severity : null,
    });

    const perPage = 5;
    
    const onGridReady = (params) => {
        setGridApi(params.api);
    };

   const onEdit = useCallback((params) => {
     let data = params.data;
     setEditrow(data)
     setOpen(true)
     console.log(data);
   },[]);

   const onDelete = useCallback((params) => {
     console.log(params);
  },[]);

 


  const [columnDefs] = useState([
    { field: 'name' ,...columnCentered},
    { field: 'slug',...columnCentered},
    { field: 'description',...columnCentered},
    { field: 'Action',...columnCentered,
    cellRendererFramework:(params)=>{
   return  <div><FaPencilAlt className="editIcon" onClick={()=>{onEdit(params)}} size={15}></FaPencilAlt>
                <FaTrashAlt className="deleteIcon" onClick={()=>{onDelete(params)}} size={15}></FaTrashAlt>
                <FcAutomatic className="deleteIcon" onClick={()=>{onPermission(params)}} size={15}></FcAutomatic>
            </div>
  }
  },

  ]);

 
  useEffect(() => {
    if (gridApi) {
      const dataSource = {
        getRows: (params) => {
          const page = params.startRow === 0 ? 0 : params.startRow ;
          console.log(page);
             axios.get(`${process.env.REACT_APP_BASE_URL}/role?$skip=${page}`)
            .then(res => {
              params.successCallback(res.data.data, res.data.total);
            }).catch(err => {
              params.successCallback([], 0);
            });
        }
      }
      console.log(dataSource);
      gridApi.setDatasource(dataSource);
    }
  }, [gridApi,snackbar]);


  const getsubmitData = (data)=>{
    if(Object.entries(editrow).length !== 0 ){
      let _id = editrow['_id'];
      axios.patch(`${process.env.REACT_APP_BASE_URL}/role/${_id}`,data).then(res=>{
        setSnackbar((state)=>{
          return {
            status : true,
            text   : 'Role Edited Successfully',
            severity : 'success'
          }
        })
      }).catch((e)=>{
         

        if(e.response.status == 409 && e.response.statusText == "Conflict"){
          setSnackbar((state)=>{
            return {
              status : true,
              text   : e.response.data.message,
              severity : 'error'
            }
          })
         } else {

          setSnackbar((state)=>{
            return {
              status : true,
              text   : "server error",
              severity : 'error'
            }
          })
         }
       
     
      });
      setEditrow({})
    } else {

      axios.post(`${process.env.REACT_APP_BASE_URL}/role`,data).then(res=>{
        setSnackbar((state)=>{
          return {
            status : true,
            text   : 'Role Created Successfully',
            severity : 'success'
          }
        })
      }).catch((e)=>{
        console.log(e.response);
        if(e.response.status == 409 && e.response.statusText == "Conflict"){
          setSnackbar((state)=>{
            return {
              status : true,
              text   : e.response.data.message,
              severity : 'error'
            }
          })
         } else {

          setSnackbar((state)=>{
            return {
              status : true,
              text   : "server error",
              severity : 'error'
            }
          })

         }
       
      });
    }
  }

  const onPermission = (params) => {
    setSelectedrole(params.data._id);
    setPermission(true);
    
  }
  const onPermissioncatchstatus = (response) => {
   console.log(response);
  }



  return (
    <>
   { snackbar?.status &&  <CustomizedSnackbars snackbaralert={snackbar} snackbarstate={setSnackbar}/>}

   {  permission &&  <Rolepermission  _permission={permission} _setpermission={setPermission} _selectedrole={selectedrole}/>}


    <Grid  alignItems="center"  container
     justifyContent="center">
        <Grid container justifyContent = "center" direction="column" style={{ width: 1000 }}>
            <Grid container justifyContent = "flex-end" >
                                 <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="button-block"
                                    style={{ width: 10,marginBottom:10 }}
                                    onClick={()=>{setOpen(true)}}
                                    >
                                    Add
                                    </Button>
                                 {open && <AddRole onfromchildsubmit={getsubmitData.bind(this)} closemodel={setOpen} snackbar={setSnackbar} editdata={editrow}/>}  
<div>
</div>
      
            </Grid>
            <Grid item container justifyContent = "center">
            <div className="ag-theme-alpine"  style={{height: 400, width: 1000}}  >
                    <AgGridReact
                pagination={true}
                rowModelType={'infinite'}
                serverSideStoreType={'partial'}
                paginationPageSize={perPage}
                cacheBlockSize={perPage}
                onGridReady={onGridReady}
                rowHeight={60}
                defaultColDef={{ flex: 1 }}
                columnDefs={columnDefs}
                >
                </AgGridReact>
            </div>
            </Grid>
        </Grid>
     
    </Grid>
    </>
  
  )
}


