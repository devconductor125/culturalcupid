import React from "react";
import { Menu, MenuItem, Sidebar as ProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import StorageIcon from "@mui/icons-material/Storage";
import WebIcon from "@mui/icons-material/Web";
import PaymentsIcon from "@mui/icons-material/Payments";
import KeyIcon from "@mui/icons-material/Key";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CategoryIcon from "@mui/icons-material/Category";
import BrushIcon from "@mui/icons-material/Brush";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Link } from "react-router-dom";
import {
  AdsClick,
  ArrowBack,
  Delete,
  ShoppingBasketSharp,
} from "@mui/icons-material";

const SidebarAdmin = () => {
  return (
    <ProSidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem>
          <h1
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Corner Stone Admin
          </h1>{" "}
        </MenuItem>
        <Link to={"/"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<ArrowBack />}>Back to Website</MenuItem>
        </Link>
        <Link to={"/admin/home"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
        </Link>
        <Link
          to={"/admin/web-content"}
          style={{ color: "#000", fontWeight: 800 }}
        >
          <MenuItem icon={<WebIcon />}> Web Content</MenuItem>
        </Link>
        <Link to={"/admin/storage"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<StorageIcon />}>Storage</MenuItem>
        </Link>
        <Link to={"/admin/smtp"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<AttachEmailIcon />}>SMTP</MenuItem>
        </Link>
        <Link to={"/admin/payments"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<PaymentsIcon />}>Payments</MenuItem>
        </Link>
        <Link to={"/admin/keys"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<KeyIcon />}>Keys</MenuItem>
        </Link>
        <Link
          to={"/admin/analytics"}
          style={{ color: "#000", fontWeight: 800 }}
        >
          <MenuItem icon={<EqualizerIcon />}>Analytics</MenuItem>
        </Link>
        <Link to={"/admin/uploads"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<CloudUploadIcon />}>Uploads</MenuItem>
        </Link>
        <Link
          to={"/admin/categories"}
          style={{ color: "#000", fontWeight: 800 }}
        >
          <MenuItem icon={<CategoryIcon />}>Manage Categories</MenuItem>
        </Link>
        <Link to={"/admin/theme"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<BrushIcon />}>Theme</MenuItem>
        </Link>
        <Link to={"/admin/plans"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<FormatListNumberedIcon />}>Plans</MenuItem>
        </Link>
        <Link to={"/admin/trash"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<Delete />}>Trash</MenuItem>
        </Link>
        <Link to={"/admin/ads"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<AdsClick />}>Ads</MenuItem>
        </Link>
      </Menu>
    </ProSidebar>
  );
};

export default SidebarAdmin;
