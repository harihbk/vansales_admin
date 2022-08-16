import React from 'react'
import MaterialTable from 'material-table';
import axios from 'axios';
import AddSubRole from "./addsubrole";
import CustomizedSnackbars from "../../common/CustomizedSnackbars";
import AddFields from "./addfields";
import { FaPencilAlt , FaTrashAlt , FaAddRow } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { HiOutlinePencil  } from "react-icons/hi";
import { BsTrash  } from "react-icons/bs";
import { Grid, IconButton  } from "@material-ui/core";
import './subrole.css'

  
export default function Subrole() {
    const tableRef = React.useRef();
    const [ open , setOpen ] = React.useState(false);
    const [ editdata , setEditdata ] = React.useState(null);


    const [ addfield , setAddfield ] = React.useState({
      status : false,
      rowData  : {}
    });

    const [snackbar, setSnackbar] = React.useState({
      status : false,
      text  : null,
      severity : null,
    });

    const Onsubmit = (data) => {

      if (data['_id']){

        axios.patch(`${process.env.REACT_APP_BASE_URL}/subrole/${data['_id']}`,data)
        .then(d=>{
          setSnackbar((state)=>{
            return {
              status : true,
              text   : 'SubRole Updated Successfully',
              severity : 'success'
            }
          })
          console.log(d);
        })
        .catch(e=>{
          setSnackbar((state)=>{
            return {
              status : true,
              text   : 'Server Error',
              severity : 'error'
            }
          })
        })

      } else {

        axios.post(`${process.env.REACT_APP_BASE_URL}/subrole`,data)
        .then(d=>{
          setSnackbar((state)=>{
            return {
              status : true,
              text   : 'SubRole Created Successfully',
              severity : 'success'
            }
          })
          console.log(d);
        })
        .catch(e=>{
          setSnackbar((state)=>{
            return {
              status : true,
              text   : 'Server Error',
              severity : 'error'
            }
          })
        })


      }

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

    const onEdit = (rowData) => {
      setOpen(true)
      setEditdata(rowData)
    } 

    const onDelete = (rowData) => {

    } 

    const checkExistingData =  (rowData) => {
      return new Promise((resolve,reject)=>{
         axios.get(`${process.env.REACT_APP_BASE_URL}/modulepermission`,{ params: { role : rowData.role._id , subrole : rowData._id  } }).then(res=>{
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    }

    const _AddFields = (rowData) => {

      checkExistingData(rowData).then(res=>{
        if(res?.data.length > 0){
  // if data exist
        let obj = {
        status : true,
        rowData : rowData,
        edit : true,
        modulepermission : res?.data
      }
       setAddfield(obj)

        } else {

  // if data does not exist
       let obj = {
        status : true,
        rowData : rowData,
        edit : false
      }
      setAddfield(obj)

        }
      }).catch(err=>{
        console.log(err);
      })
     


      // let obj = {
      //   status : true,
      //   rowData : rowData
      // }
      // setAddfield(obj)
    }

  return (
      <>
      <div className="custCard">
      { snackbar?.status &&  <CustomizedSnackbars snackbaralert={snackbar} snackbarstate={setSnackbar}/>}

      { addfield.status && <AddFields _addfield={addfield} _setAddfield={setAddfield} _childfunction={childfunction}/> }

        { open && <AddSubRole _open={open} _setOpen={setOpen} _Onsubmit={Onsubmit} _editdata={editdata} _setEditdata={setEditdata}/> }
        <MaterialTable
          title="Sub Role"
          tableRef = {tableRef}
          actions={[
            {
              icon: 'add',
              onClick: (event, rowData) => {
                setOpen(true);
                
              },
              isFreeAction: true,
             
            },
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => {
                tableRef.current.onQueryChange()
              },
            }
          ]}
          columns={[
            { title: 'SubRole', field: 'name' },
            { title: "Role", field: "role.slug", grouping: true,
            render: rowData => {
              return rowData['role']['slug']
            } } ,

            {
              title : 'Action' , render : rowData => (
                <>

              <IconButton>
                      <HiOutlinePencil className="editIcon" onClick={()=>{onEdit(rowData)}} size={15}></HiOutlinePencil>
              </IconButton>
              <IconButton>
                      <BsTrash className="deleteIcon" onClick={()=>{onDelete(rowData)}} size={15}></BsTrash> 
              </IconButton>  
              <IconButton>        
                      <FcAddRow className="deleteIcon" onClick={()=>{_AddFields(rowData)}} size={20}></FcAddRow>   
              </IconButton>

                </>
              )
            }

          ]}
    
          data={query =>
            new Promise((resolve, reject) => {
              let url = `${process.env.REACT_APP_BASE_URL}/subrole`;
              var p = parseInt(query.page) ;
              url += `?page=${p}&limit=${query.pageSize}`;
              axios(url)
                .then(result => {
                  resolve({
                    data: result.data.data,
                    page: result.data.skip ,
                    totalCount: result.data.total,
                  })
                })
            })
          }
        />
      
        </div>
      </>
    
  )
}
