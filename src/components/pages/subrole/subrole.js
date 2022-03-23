import React from 'react'
import MaterialTable from 'material-table';
import axios from 'axios';
import AddSubRole from "./addsubrole";
import CustomizedSnackbars from "../../common/CustomizedSnackbars";
import AddFields from "./addfields";
import { FaPencilAlt , FaTrashAlt , FaAddRow } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";


  
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

    const onEdit = (rowData) => {
      setOpen(true)
      setEditdata(rowData)
    } 

    const onDelete = (rowData) => {

    } 

    const _AddFields = (rowData) => {
      let obj = {
        status : true,
        rowData : rowData
      }
      setAddfield(obj)
    }

  return (
      <>
      <div>
      { snackbar?.status &&  <CustomizedSnackbars snackbaralert={snackbar} snackbarstate={setSnackbar}/>}

      { addfield.status && <AddFields _addfield={addfield} _setAddfield={setAddfield}/> }

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
                      <FaPencilAlt className="editIcon" onClick={()=>{onEdit(rowData)}} size={15}></FaPencilAlt>
                      <FaTrashAlt className="deleteIcon" style={{ marginRight:'10px' }} onClick={()=>{onDelete(rowData)}} size={15}></FaTrashAlt>   
                      <FcAddRow className="deleteIcon" onClick={()=>{_AddFields(rowData)}} size={20}></FcAddRow>   

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
