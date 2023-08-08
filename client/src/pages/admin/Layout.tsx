import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "../../context/Auth";
// import axiosInstance from "../../api/axiosInstance";
import SidebarAdmin from "./components/AdminSidebar";
import { getUserInfo } from "../../api/auth";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (!auth?.isAuthenticated && !auth?.user?.isAdmin) {
      window.location.href = "/";
    }
  }, [auth]);

  useEffect(() => {
    (async () => {
      const u = await getUserInfo();
      setUser(u?.data);
    })();
  }, []);

  const pages = {
    home: "/admin/home",
    webContent: "/admin/web-content",
    storage: "/admin/storage",
    smtp: "/admin/smtp",
    payments: "/admin/payments",
    keys: "/admin/keys",
    analytics: "/admin/analytics",
    uploads: "/admin/uploads",
    manageCategories: "/admin/categories",
    theme: "/admin/theme",
    plans: "/admin/plans",
    trash: "/admin/trash",
    ads: "/admin/ads",
  };

  const pageNames: any = Object.entries(pages).reduce(
    (obj, [key, value]) => ({ ...obj, [value]: key }),
    {}
  );

  const currentPageName = pageNames[window.location.pathname];

  useEffect(() => {
    if (!(window.location.pathname === "/admin")) {
      if (Object.keys(user).length > 0) {
        if (
          auth?.user?.isAdmin &&
          auth?.user?.adminType === "JUNIOR" &&
          !user[currentPageName]
        ) {
          window.location.href = "/admin";
        }
      }
    }
  }, [auth, user, currentPageName]);

  return (
    <div style={{ display: "flex" }}>
      {auth?.user?.adminType === "JUNIOR" && (
        <Sidebar pvs={user} allowed={auth?.user?.adminType === "JUNIOR"} />
      )}
      {auth?.user?.adminType === "SENIOR" && <SidebarAdmin />}
      <div
        style={{
          padding: "15px",
          width: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
