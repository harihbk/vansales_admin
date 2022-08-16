import React , { useState ,useEffect , useCallback , useRef} from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, IconButton  } from "@material-ui/core";
import Button from '@mui/material/Button';
import AddRole from "../role/addrole"
import axios from 'axios';
import CustomizedSnackbars from "../../common/CustomizedSnackbars";
import { FaPencilAlt , FaTrashAlt  } from "react-icons/fa";
import { HiOutlinePencil  } from "react-icons/hi";
import { BsTrash  } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import  Rolepermission  from "./rolepermission";
// import "./style.scss";
import "./role.css";


export const columnCentered = {
  headerClass: 'text-center',
  cellStyle: {
    textAlign: 'center',
   
  }
}

export default function Role() {
  const gridRef = useRef();

    const [open, setOpen] = React.useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [editrow , setEditrow] = useState({});
    const [deleterow , SetDeleterow] = useState({});
    const [permission , setPermission] = useState(false);
    const [selectedrole , setSelectedrole] = useState('');
    const [searchfield , setSearchfield] = useState('');


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

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    }
  };


  const handleChangeProductName = () => {
    let data = document.getElementById('filter-text-box').value
    setSearchfield(data)

  }

  const onFilterTextBoxChanged = useCallback(debounce(handleChangeProductName, 1000), []);


 


  const [columnDefs] = useState([
    { field: 'name',headerName :'Internal Name' ,...columnCentered ,filter: true },
    { field: 'slug',headerName :'External Name',...columnCentered,filter: true },
    // { field: 'description',...columnCentered},
    { field: 'Action',...columnCentered,
    cellRendererFramework:(params)=>{
   return  <div className="actionBtnGrp">
              <IconButton className="edit">
                <HiOutlinePencil className="editIcon" onClick={()=>{onEdit(params)}} size={15}></HiOutlinePencil>
              </IconButton>
              <IconButton className="del">
                <BsTrash className="deleteIcon" onClick={()=>{onDelete(params)}} size={15}></BsTrash>
              </IconButton>
              <IconButton className="info">
                <AiOutlineSetting className="deleteIcon" onClick={()=>{onPermission(params)}} size={15}></AiOutlineSetting>
              </IconButton>
            </div>
          }
        },
  ]);

 
  useEffect(() => {
    if (gridApi) {
      const dataSource = {
        getRows: (params) => {
          console.log(params);

          const page = params.startRow === 0 ? 0 : params.startRow ;
          let par = ""
           if(page >= 0){
            par = `$skip=${page}`
           }
           if(searchfield){
            par = `$skip=${page}&search=${searchfield}`
           }
             axios.get(`${process.env.REACT_APP_BASE_URL}/role?${par}`)
            .then(res => {
              params.successCallback(res.data.data, res.data.total);
            }).catch(err => {
              params.successCallback([], 0);
            });
        }
      }
      gridApi.setDatasource(dataSource);
    }
  }, [gridApi,snackbar,searchfield]);


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

      <div className="custCard">
        <Grid container justifyContent ="flex-end" alignItems="center">
          <Grid item xs={10} justifyContent="left">
            <h2 style={{textAlign: 'left'}}>Role List</h2>
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
              {open && <AddRole onfromchildsubmit={getsubmitData.bind(this)} closemodel={setOpen} snackbar={setSnackbar} editdata={editrow}/>}  
          </Grid>
          <Grid item xs={4}>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
          </Grid>
        </Grid>
        <Grid  alignItems="center"  container
        justifyContent="center" className="userTable">
            <Grid container justifyContent = "flex-end" >
                <Grid item container justifyContent = "center">
                  <div className="ag-theme-alpine"  style={{minHeight: 350,height: '100%', width : '100%', justifyContent : 'center'}}  >
                      <AgGridReact
                      ref={gridRef}
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


