import React, { useEffect } from 'react'
import MaterialTable from 'material-table';
import axios from 'axios';
import AddTruck from './add';
import CustomizedSnackbars from "../../common/CustomizedSnackbars";





export default function Truck() {
    const tableRef = React.createRef();
    const [ open , setopen ] = React.useState(false);
    const [ add , setAdded ] = React.useState(0);

    const [snackbar, setSnackbar] = React.useState({
        status : false,
        text  : null,
        severity : null,
      });


    const fnFromParent = (message,status) => {
        setAdded(!add)
        // tableRef.current && tableRef.current.onQueryChange()
        setSnackbar((state)=>{
            return {
              status : true,
              text   : message,
              severity : status
            }
          })
    }

    useEffect(()=>{
        tableRef.current.onQueryChange();
    },[add])
 
    return (
        <>
          <div className="custCard">
            { snackbar?.status &&  <CustomizedSnackbars snackbaralert={snackbar} snackbarstate={setSnackbar}/>}

            { open && <AddTruck _open={open} _setopen={setopen} _fnFromParent={fnFromParent}/>}
            <MaterialTable        
              title="Truck List"
              tableRef={tableRef}
              columns={[
                { title: 'Truck Name', field: 'truckname' },
                { title: 'Truck Number', field: 'truckno' },
                { title: 'Truck Type', field: 'trucktype' },
                { title : 'Driver' , field: "users.username", grouping: true},
                { title: 'Expire Date', field: 'insurance_expire' }
              ]}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = `${process.env.REACT_APP_BASE_URL}/truck`;
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
              actions={[
              
                {
                  icon: 'refresh',
                  tooltip: 'Refresh Data',
                  isFreeAction: true,
                  onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                },
                {
                    icon: 'add',
                    onClick: (event, rowData) => {
                        setopen(true);
                    },
                    isFreeAction: true,
                  }
              ]}
            />
          </div>
        </>
      );

}
