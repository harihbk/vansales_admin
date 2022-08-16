import { Grid } from '@material-ui/core'
import React from 'react'
import customerImg from '../../assets/images/icons/customer.png';
import collectionManage from '../../assets/images/icons/collection_management.png';
import deliveryPlaning from '../../assets/images/icons/delivery_planing.png';
import enquiry from '../../assets/images/icons/enquiry.png';
import material from '../../assets/images/icons/material.png';
import returns from '../../assets/images/icons/returns_management.png';
import route from '../../assets/images/icons/route.png';
import spotPurchase from '../../assets/images/icons/spot_purchase.png';
import spotsale from '../../assets/images/icons/spotsale.png';
import truck from '../../assets/images/icons/truck.png';
import user from '../../assets/images/icons/user.png';
import spotpurchase from '../../assets/images/icons/spot_purchase.png';
import truckimg from '../../assets/images/truck-img.png';
import './home.css';

export default function Home() {
  return (
    <div className>
      <div className="boxWrapper" >
        <img className="truckImg" src={truckimg} />
        <Grid container className="innerBox d-none">
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={customerImg}></img>
              </div>
              <div className="textCol">
                Customer Management
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={deliveryPlaning}></img>
              </div>
              <div className="textCol">
                Delivery Planing
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={collectionManage}></img>
              </div>
              <div className="textCol">
                Collection Management
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={enquiry}></img>
              </div>
              <div className="textCol">
                Enquiry
              </div>
            </div>
          </Grid>
          
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={material}></img>
              </div>
              <div className="textCol">
                Material Management
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={returns}></img>
              </div>
              <div className="textCol">
                Reurns Management
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={route}></img>
              </div>
              <div className="textCol">
                Route
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={spotPurchase}></img>
              </div>
              <div className="textCol">
                Spot Purchase
              </div>
            </div>
          </Grid>
          
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={spotsale}></img>
              </div>
              <div className="textCol">
                Spot Sale
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={truck}></img>
              </div>
              <div className="textCol">
                Truck Management
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={user}></img>
              </div>
              <div className="textCol">
                User Management
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="tileView">
              <div className="iconCol">
                <img src={spotPurchase}></img>
              </div>
              <div className="textCol">
                Spot Purchase
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
