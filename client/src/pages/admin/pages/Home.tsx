import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout";
import {
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import axiosInstance from "../../../api/axiosInstance";
import { Checkbox } from "antd";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [newUserModal, setNewUserModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUserName, setNewUsername] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const [newTelephone, setNewTelephone] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isJuniorAdmin, setIsJuniorAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(URL + "/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(URL + `/users/${id}`);
      setUsers(users.filter((user: any) => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (user: any) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (newUserName && newEmail) {
      await axios
        .put(URL + `/users/${editingUser.id}`, {
          username: newUserName ? newUserName : editingUser?.username,
          email: newEmail ? newEmail : editingUser?.email,
          name: newName ? newName : editingUser?.name,
          address: newAddress ? newAddress : editingUser?.address,
          telephone: newTelephone ? newTelephone : editingUser?.telephone,
        })
        .then(() => {
          setModalOpen(false);
          setTimeout(() => {
            (window as Window).location.reload();
          }, 1000);
        });
    }
  };

  const suspendUser = async (id: number) => {
    try {
      await axios.get(URL + `/users/suspend/${id}`).then(() => {
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    } catch (err) {
      console.error(err);
    }
  };
  const activateUser = async (id: number) => {
    try {
      await axios.get(URL + `/users/activate/${id}`).then(() => {
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "telephone", headerName: "Telephone", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "ip", headerName: "IP", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "juniorAdmin",
      headerName: "JuniorAdmin",
      width: 200,
      renderCell: (params: any) => {
        const updateAdminStatus = async (s: any) => {
          await axios
            .put(URL + `/users/${params.row.id}`, {
              isAdmin: s,
              adminType: "JUNIOR",
            })
            .then(() => {
              setModalOpen(false);
              setTimeout(() => {
                (window as Window).location.reload();
              }, 1000);
            });
        };
        return (
          <div>
            <Switch
              defaultChecked={params.row?.isAdmin}
              onChange={(e) => updateAdminStatus(e.target.checked)}
              id="juniorAdmin"
            />
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 125,
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const onClickDelete = () => {
          handleDelete(params.row.id);
        };

        const onClickUpdate = () => {
          handleUpdate(params.row);
        };
        return (
          <div>
            <IconButton aria-label="edit" onClick={onClickUpdate}>
              <EditIcon sx={{ color: "#fff" }} />
            </IconButton>
            <IconButton aria-label="delete" onClick={onClickDelete}>
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
            {!(params.row?.status === "ACTIVE") ? (
              <IconButton onClick={() => activateUser(params.row.id)}>
                <AddIcon sx={{ color: "green" }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => suspendUser(params.row.id)}>
                <RemoveIcon sx={{ color: "yellow" }} />
              </IconButton>
            )}
          </div>
        );
      },
    },
  ];
  const formik = useFormik({
    initialValues: {
      username: editingUser?.username,
      email: editingUser?.email,
      name: editingUser?.name,
      address: editingUser?.address,
      telephone: editingUser?.telephone,
      home: editingUser?.home,
      webContent: editingUser?.webContent,
      storage: editingUser?.storage,
      smtp: editingUser?.smtp,
      payments: editingUser?.payments,
      keys: editingUser?.keys,
      analytics: editingUser?.analytics,
      uploads: editingUser?.uploads,
      manageCategories: editingUser?.manageCategories,
      theme: editingUser?.theme,
      plans: editingUser?.plans,
      trash: editingUser?.trash,
      ads: editingUser?.ads,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await axios.put(URL + `/users/${editingUser.id}`, values).then(() => {
        setModalOpen(false);
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    },
  });

  const modalBody = (
    <Box
      sx={{
        position: "absolute",
        width: 400,
        bgcolor: "#fff",
        border: "2px solid #000",
        boxShadow: 24,
        p: 1,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "20px",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <TextField
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        name="username"
      />
      <TextField
        label="Email"
        value={formik.values.email}
        sx={{ marginTop: 1 }}
        onChange={formik.handleChange}
        name="email"
      />
      <TextField
        label="Name"
        value={formik.values.name}
        sx={{ marginTop: 1 }}
        onChange={formik.handleChange}
        name="name"
      />
      <TextField
        label="Address"
        value={formik.values.address}
        sx={{ marginTop: 1 }}
        onChange={formik.handleChange}
        name="address"
      />
      <TextField
        label="Telephone"
        value={formik.values.telephone}
        sx={{ marginTop: 1 }}
        onChange={formik.handleChange}
        name="telephone"
      />
      {editingUser?.isAdmin && (
        <>
          <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>Permissions</h3>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Home:{" "}
            <Checkbox
              defaultChecked={formik.values.home}
              onChange={formik.handleChange}
              id="home"
              checked={formik.values.home}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Web Content:{" "}
            <Checkbox
              defaultChecked={formik.values.webContent}
              onChange={formik.handleChange}
              id="webContent"
              checked={formik.values.webContent}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Storage:{" "}
            <Checkbox
              defaultChecked={formik.values.storage}
              onChange={formik.handleChange}
              id="storage"
              checked={formik.values.storage}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            SMTP:{" "}
            <Checkbox
              defaultChecked={formik.values.smtp}
              onChange={formik.handleChange}
              id="smtp"
              checked={formik.values.smtp}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Payments:{" "}
            <Checkbox
              defaultChecked={formik.values.payments}
              onChange={formik.handleChange}
              id="payments"
              checked={formik.values.payments}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Keys:{" "}
            <Checkbox
              defaultChecked={formik.values.keys}
              onChange={formik.handleChange}
              id="keys"
              checked={formik.values.keys}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Analytics:{" "}
            <Checkbox
              defaultChecked={formik.values.analytics}
              onChange={formik.handleChange}
              id="analytics"
              checked={formik.values.analytics}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Uploads:{" "}
            <Checkbox
              defaultChecked={formik.values.uploads}
              onChange={formik.handleChange}
              id="uploads"
              checked={formik.values.uploads}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Manage Categories:{" "}
            <Checkbox
              defaultChecked={formik.values.manageCategories}
              onChange={formik.handleChange}
              id="manageCategories"
              checked={formik.values.manageCategories}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Theme:{" "}
            <Checkbox
              defaultChecked={formik.values.theme}
              onChange={formik.handleChange}
              id="theme"
              checked={formik.values.theme}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Plans:{" "}
            <Checkbox
              defaultChecked={formik.values.plans}
              onChange={formik.handleChange}
              id="plans"
              checked={formik.values.plans}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Trash:{" "}
            <Checkbox
              defaultChecked={formik.values.trash}
              onChange={formik.handleChange}
              id="trash"
              checked={formik.values.trash}
            />
          </div>
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontFamily: "monospace",
              // margin: "30px 0px",
            }}
          >
            Ads:{" "}
            <Checkbox
              defaultChecked={formik.values.ads}
              onChange={formik.handleChange}
              id="ads"
              checked={formik.values.ads}
            />
          </div>
        </>
      )}
      <Button
        onClick={formik.handleSubmit as any}
        variant="contained"
        sx={{ m: 2 }}
      >
        Save
      </Button>
    </Box>
  );
  const handleAddNewUser = async () => {
    if (username && email && password) {
      await axios
        .post(URL + "/user", {
          username,
          email,
          password,
          address,
          name,
          telephone,
          isJuniorAdmin,
        })
        .then(() => {
          setNewUserModal(false);
          setTimeout(() => {
            (window as Window).location.reload();
          }, 1000);
        });
    }
  };
  const modalBodyAddNewUser = (
    <Box
      sx={{
        position: "absolute",
        width: 400,
        bgcolor: "#fff",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "20px",
      }}
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        sx={{ marginTop: 4 }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Address"
        value={address}
        sx={{ marginTop: 4 }}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        label="Name"
        value={name}
        sx={{ marginTop: 4 }}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Telephone"
        value={telephone}
        sx={{ marginTop: 4 }}
        onChange={(e) => setTelephone(e.target.value)}
      />
      <TextField
        label="Password"
        value={password}
        sx={{ marginTop: 4 }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <span>Make junior admin</span>
        <Switch
          checked={isJuniorAdmin}
          onChange={(e) => setIsJuniorAdmin(e.target.checked)}
          id="juniorAdmin"
        />
      </div>
      <Button onClick={handleAddNewUser} variant="contained" sx={{ m: 2 }}>
        Create
      </Button>
    </Box>
  );

  const [loading, setLoading] = useState(false);
  // const [pvs, setPvs] = useState<any>({});
  // const formik = useFormik({
  //   initialValues: {
  //     home: pvs?.home,
  //     webContent: pvs?.webContent,
  //     storage: pvs?.storage,
  //     smtp: pvs?.smtp,
  //     payments: pvs?.payments,
  //     keys: pvs?.keys,
  //     analytics: pvs?.analytics,
  //     uploads: pvs?.uploads,
  //     manageCategories: pvs?.manageCategories,
  //     theme: pvs?.theme,
  //     plans: pvs?.plans,
  //   },
  //   enableReinitialize: true,
  //   onSubmit: async (vals) => {
  //     setLoading(true);
  //     await axiosInstance.patch(URL + "/priviliges", vals).then(() => {
  //       setLoading(false);
  //     });
  //   },
  // });

  // React.useEffect(() => {
  //   (async () => {
  //     await axiosInstance.get(URL + "/priviliges").then((resp) => {
  //       setPvs(resp.data);
  //     });
  //   })();
  // }, []);

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>Manage Users</span>
          <span onClick={() => setNewUserModal(true)}>
            <AddCircleIcon
              sx={{ color: "#fff", marginLeft: 4, cursor: "pointer" }}
            />
          </span>
        </h1>

        <div
          style={{
            height: 400,
            width: "90%",
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            hideFooterPagination
            sx={{
              color: "#fff",
            }}
          />
        </div>

        {/* <div>
          <h3 style={{ color: "#fff" }}>Junior Admin Priviliges</h3>

          <Button
            onClick={formik.handleSubmit as any}
            variant="contained"
            sx={{ mx: 20, my: 2 }}
            disabled={loading}
          >
            Save
          </Button>
        </div> */}
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalBody}
      </Modal>
      <Modal
        open={newUserModal}
        onClose={() => setNewUserModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalBodyAddNewUser}
      </Modal>
    </AdminLayout>
  );
};

export default AdminHome;
