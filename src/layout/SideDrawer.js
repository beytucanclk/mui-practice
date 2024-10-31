import { Link } from "react-router-dom";
import {
  Hidden,
  styled,
  Toolbar,
  Drawer,
  List,
  Typography,
  Avatar,
  Box,
} from "@material-ui/core";

// icons & images
import userAvatar from "../images/avatar_default.jpg";
import getMoreAvatar from "../images/illustration_avatar.png";
import { ImPieChart } from "react-icons/im";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { GiHazardSign } from "react-icons/gi";
import {
  RiShoppingBag3Fill,
  RiClipboardFill,
  RiLoginCircleFill,
  RiLogoutBoxFill
} from "react-icons/ri";

import { drawerWidth } from "./DashboardLayout";
import CustomListItem from "../components/Drawer/CustomListItem";
import { useEffect, useState } from "react";

const NavDrawerStyle = styled("nav")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

const LogoStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.green.darker,
  margin: 0,
}));

const UserCardStyle = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "inherit",
  backgroundColor: theme.palette.gray.light,
  margin: "12px",
  padding: "14px 12px",
  borderRadius: theme.spacing(1.5),
  textDecoration: "none",
  "& .MuiTypography-root": {
    marginLeft: theme.spacing(1.5),
  },
}));

const ListStyle = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const GetMoreStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.gray.lighter,
  margin: "40px 12px 16px",
  padding: "60px 12px 14px 12px",
  borderRadius: theme.spacing(1.5),
  textAlign: "center",
  position: "relative",

  "& img": {
    position: "absolute",
    top: 0,
    left: "50%",
    width: theme.spacing(12.5),
    transform: "translate(-40%, -40%)",
    transition: "all 0.3s ease-in",
  },
  "& h5": {
    margin: "10px 0",
  },
  "& a": {
    textDecoration: "none",
    fontWeight: 500,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.green.darker,
    display: "block",
    padding: "6px",
    borderRadius: "inherit",
    transition: "background 0.3s ease-in",
    boxShadow: "0px 5px 5px white",
    "&:hover": {
      backgroundColor: theme.palette.green.dark,
    },
  },

  "&:hover": {
    "& img": {
      transform: "translate(-40%, -50%)",
    },
  },
}));

// links for the side nav
const links = [
  
  { id: "L0", path: "/user", icon: <FaUserFriends />, title: "User" },

  { id: "L1", path: "/login", icon: <RiLoginCircleFill />, title: "Login" },
  { id: "L2", path: "/register", icon: <FaUserPlus />, title: "Register" },
  { id: "L3", path: "/", icon: <RiLogoutBoxFill />, title: "Logout" },

];

const SideDrawer = (props) => {
  const [isLogin, setIsLogin] = useState(false)

  
  const handleLogout = () => {
    localStorage.removeItem("user")

  }
  useEffect(()=>{
    let user = localStorage.getItem('user')
    if(!user){
      setIsLogin(false);

      return
    }
    setIsLogin(true);
    
  }, [])
  const drawerContent = (

    
    <>
      {/* Logo */}
      <Toolbar>
        <LogoStyle variant="h6" component="h2">
          Employee Manager
        </LogoStyle>
      </Toolbar>

     
      {/* List of links */}
      <ListStyle>
        {links.map((el) => {
          if(el.id === "L3"){
           return  <CustomListItem
              key={el.id}
              path={el.path}
              icon={el.icon}
              title={el.title}
              onClick={handleLogout}
            />
          }else{
            
             
            
          return <CustomListItem
            key={el.id}
            path={el.path}
            icon={el.icon}
            title={el.title}
            onClick={props.onClose}
          />
          }
          
        })}
      </ListStyle>

      

      {/* get more card */}
      
    </>
  );

  return (
    <NavDrawerStyle aria-label="Navigation Panel">
      {/* Hidden 01 for sm size */}
      <Hidden smUp implementation="css">
        <Drawer
          container={props.container}
          variant="temporary"
          //anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.toggleMenu}
          onClose={props.onClose}
          classes={{ paper: props.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {/* Drawer Component */}
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Hidden 02 for big size*/}
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open classes={{ paper: props.drawerPaper }}>
          {drawerContent}
        </Drawer>
      </Hidden>
    </NavDrawerStyle>
  );
};

export default SideDrawer;
