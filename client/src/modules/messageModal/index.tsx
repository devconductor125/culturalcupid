import { Avatar, Box, TextField, Typography } from "@mui/material";
import Minimize from "../../assets/icons/minimize.png";
import close from "../../assets/icons/close.png";
import importImg from "../../assets/icons/import.png";
import mic from "../../assets/icons/mic.png";
import gif from "../../assets/icons/gif.png";
import exportImg from "../../assets/icons/export.png";
import emoji from "../../assets/icons/emoji.png";
import { AuthContext } from "../../context/Auth";
import React, { useContext, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useFormik } from "formik";

interface MessageModalProps {
  open: boolean;
  onClose: (flag: boolean) => void;
  receiver: any;
}

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const MessageModal = ({ onClose, open, receiver }: MessageModalProps) => {
  const handleClose = () => {
    onClose(false);
  };
  const [messages, setMessages] = useState([]);
  const authContext = useContext(AuthContext);
  const senderId = authContext?.user?.id;

  React.useEffect(() => {
    axiosInstance
      .get(URL + `/message/${senderId}/${receiver?.id}`)
      .then((res) => {
        setMessages(res.data);
      });
  }, [receiver, senderId]);
  console.log(messages, authContext);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async (values) => {
      await axiosInstance
        .post(URL + "/message", {
          content: values.content,
          senderId,
          receiverId: receiver?.id,
        })
        .then(() => {
          formik.setFieldValue("content", "");
          axiosInstance
            .get(URL + `/message/${senderId}/${receiver?.id}`)
            .then((res) => {
              setMessages(res.data);
            });
        });
    },
  });

  console.log(messages);
  return (
    <Box
      position={"fixed"}
      right={10}
      bottom={0}
      width={"306px"}
      height={"440px"}
      sx={{
        background: "white",
        zIndex: 2,
        display: open ? "block" : "none",
      }}
    >
      <Box
        display={"flex"}
        sx={{
          width: "100%",
          height: "72px",
          background: "#6A6F77",
          borderRadius: "10px",
          marginRight: 0,
          alignItems: "center",
        }}
      >
        <Avatar sx={{ marginLeft: 1 }} />
        <Typography
          component={"span"}
          marginLeft={3}
          color={"white"}
          fontWeight={700}
          fontSize={"20px"}
        >
          {receiver?.username}
        </Typography>
        <Typography
          display={"flex"}
          component={"div"}
          marginLeft={"auto"}
          color={"white"}
          fontWeight={700}
          fontSize={"20px"}
          marginRight={3}
        >
          <Box>
            <img src={Minimize} />
          </Box>
          <Box marginLeft={2} onClick={handleClose}>
            <img src={close} />
          </Box>
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {messages?.map((msg: any, idx) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: msg?.senderId === senderId ? "end" : "start",
                margin: "5px 0px",
              }}
              key={idx}
            >
              <div
                style={{
                  width: "fit-content",
                  background:
                    msg?.senderId === senderId ? "#EE5C61" : "#343537",
                  padding: "4px",
                  color: msg?.senderId === senderId ? "#fff" : "#fff",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </Box>
      <Box position={"fixed"} bottom={0} width={"100%"}>
        <Box width={"20%"} sx={{ padding: "15px" }}>
          <TextField
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.content}
            id="content"
            onKeyDown={(e) =>
              e.key === "Enter" ? formik.handleSubmit() : null
            }
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
          width={"306px"}
          marginBottom={"17px"}
        >
          <Typography component={"img"} src={importImg} />
          <Typography component={"img"} src={mic} />
          <Typography component={"img"} src={gif} />
          <Typography component={"img"} src={exportImg} />
          <Typography component={"img"} src={emoji} />
        </Box>
      </Box>
    </Box>
  );
};

export default MessageModal;
