import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List"; 
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useNavigate ,Navigate , Outlet} from "react-router-dom";
import { FcBusinessman , FcCollaboration } from "react-icons/fc";



const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(0deg)"
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(180deg)"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  }
});

const Layouts = (props) => {
    const { classes } = props;
    const [open,setOpen] = useState(false); 
    const [anchorEl, setAnchorEl] = useState(null);
    const _open = Boolean(anchorEl);

    var navigate = useNavigate();


    const handleDrawerOpen = () => {
        setOpen(value => !value)
    };

 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_detail");
      return navigate('/')
     }
  

    return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classes.appBar}
          >
            <Toolbar disableGutters={true}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                className={classes.menuButton}
              >
                <MenuIcon
                  classes={{
                    root: open
                      ? classes.menuButtonIconOpen
                      : classes.menuButtonIconClosed
                  }}
                />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
                noWrap
              >
                Vansales
              </Typography>

            <div>
                <IconButton
                  aria-owns={_open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={_open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>

                </Menu>
            </div>
             
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })
            }}
            open={open}
          >
            <div className={classes.toolbar} />
            <List>
  
            <ListItem button key="Home" onClick={()=>navigate("/home")}>
                  <ListItemIcon>   
                   <FcBusinessman size={30} />
                  </ListItemIcon>
                  <ListItemText primary="User" />
            </ListItem>
  
            <ListItem button key="Role" onClick={()=>navigate("/home/role")}>
                  <ListItemIcon>   
                   <FcCollaboration size={30} />
                  </ListItemIcon>
                  <ListItemText primary="Role" />
            </ListItem>

            <ListItem button key="SubRole" onClick={()=>navigate("/home/subrole")}>
                  <ListItemIcon>   
                   <FcCollaboration size={30} />
                  </ListItemIcon>
                  <ListItemText primary="SubRole" />
            </ListItem>

            <ListItem button key="User" onClick={()=>navigate("/home/user")}>
                  <ListItemIcon>   
                   <FcCollaboration size={30} />
                  </ListItemIcon>
                  <ListItemText primary="User" />
            </ListItem>
            </List>
            {/* <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
          </Drawer>
          
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
          </main>
        </div>
      );
}

export default withStyles(styles, { withTheme: true })(Layouts);
