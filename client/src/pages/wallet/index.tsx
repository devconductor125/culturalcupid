import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Translate from "../../common/translate/Translate";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Wallet = () => {
  const navigate = useNavigate();
  const { data } = useQuery(["getUserInfo"], () => getUserInfo(), {
    select: ({ data }) => data,
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axiosInstance.get(URL + "/transactions/all").then((res) => {
      setTransactions(res.data);
    });
  }, []);

  return (
    <Box>
      <Box justifyContent={"center"} width={"100%"} display={"flex"}>
        <Button
          sx={{ marginRight: 10 }}
          variant="contained"
          onClick={() => navigate("/stripe")}
        >
          <Translate>Add Card</Translate>
        </Button>
        <Button
          color="warning"
          variant="contained"
          onClick={() => navigate("/charge")}
        >
          {" "}
          <Translate>+ Charge Wallet</Translate>
        </Button>
      </Box>

      <Card sx={{ maxWidth: 275, m: 5 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            <Translate>Wallet</Translate>
          </Typography>
          <Typography variant="h5" component="div">
            <Translate>My Balance</Translate>
          </Typography>
          <Typography variant="body2">{data && data?.wallet} USD</Typography>
        </CardContent>
      </Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <h1>
          <Translate>Transactions</Translate>{" "}
        </h1>
        <TableContainer component={Paper} sx={{ width: "80%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="transactions table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>User ID</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  <Translate>Amount</Translate>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  <Translate>Type</Translate>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  <Translate>Description</Translate>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  <Translate>Date</Translate>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map((transaction: any) => (
                <TableRow key={transaction?.id}>
                  <TableCell component="th" scope="row">
                    {transaction?.id}
                  </TableCell>
                  <TableCell>{transaction?.userId}</TableCell>
                  <TableCell align="right">{transaction?.amount}</TableCell>
                  <TableCell align="right">{transaction?.type}</TableCell>
                  <TableCell align="right">
                    {transaction?.description}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(transaction?.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default Wallet;
