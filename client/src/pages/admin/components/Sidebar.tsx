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
import { ArrowBack } from "@mui/icons-material";

const Sidebar = ({ pvs, allowed }: any) => {
  return (
    <ProSidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem>
          <h1
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>Corner Stone Admin</span>
          </h1>{" "}
        </MenuItem>
        <Link to={"/"} style={{ color: "#000", fontWeight: 800 }}>
          <MenuItem icon={<ArrowBack />}>Back to Website</MenuItem>
        </Link>
        {allowed && pvs?.home && (
          <Link to={"/admin/home"} style={{ color: "#000", fontWeight: 800 }}>
            <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
          </Link>
        )}
        {allowed && pvs?.webContent && (
          <Link
            to={"/admin/web-content"}
            style={{ color: "#000", fontWeight: 800 }}
          >
            <MenuItem icon={<WebIcon />}> Web Content</MenuItem>
          </Link>
        )}
        {allowed && pvs?.storage && (
          <Link
            to={"/admin/storage"}
            style={{ color: "#000", fontWeight: 800 }}
          >
            <MenuItem icon={<StorageIcon />}>Storage</MenuItem>
          </Link>
        )}
        {allowed && pvs?.smtp && (
          <Link to={"/admin/smtp"} style={{ color: "#000", fontWeight: 800 }}>
            <MenuItem icon={<AttachEmailIcon />}>SMTP</MenuItem>
          </Link>
        )}
        {allowed && pvs?.payments && (
          <Link
            to={"/admin/payments"}
            style={{ color: "#000", fontWeight: 800 }}
          >
            <MenuItem icon={<PaymentsIcon />}>Payments</MenuItem>
          </Link>
        )}
        {allowed && pvs?.keys && (
          <Link to={"/admin/keys"} style={{ color: "#000", fontWeight: 800 }}>
            <MenuItem icon={<KeyIcon />}>Keys</MenuItem>
          </Link>
        )}
        {allowed && pvs?.analytics && (
          <Link
            to={"/admin/analytics"}
            style={{ color: "#000", fontWeight: 800 }}
          >
            <MenuItem icon={<EqualizerIcon />}>Analytics</MenuItem>
          </Link>
        )}
        {allowed && pvs?.uploads && (
          <Link
            to={"/admin/uploads"}
            style={{ color: "#000", fontWeight: 800 }}
          >
            <MenuItem icon={<CloudUploadIcon />}>Uploads</MenuItem>
          </Link>
        )}
        {allowed && pvs?.manageCategories && (
          <Link
            to={"/admin/categories"}
            style={{ color: "#000", fontWeight: 800 }}
          >
            <MenuItem icon={<CategoryIcon />}>Manage Categories</MenuItem>
          </Link>
        )}
        {allowed && pvs?.theme && (
          <Link to={"/admin/theme"} style={{ color: "#000", fontWeight: 800 }}>
            <MenuItem icon={<BrushIcon />}>Theme</MenuItem>
          </Link>
        )}
        {allowed && pvs?.plans && (
          <Link to={"/admin/plans"} style={{ color: "#000", fontWeight: 800 }}>
            <MenuItem icon={<FormatListNumberedIcon />}>Plans</MenuItem>
          </Link>
        )}
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
