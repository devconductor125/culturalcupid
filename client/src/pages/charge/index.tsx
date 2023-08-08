import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { ChargeStripeCard } from "../../api/wallet";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { getUserInfo } from "../../api/auth";
import Translate from "../../common/translate/Translate";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Charge = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState<any>({});
  const [value, setValue] = useState<number>(0);
  const { mutate } = useMutation(
    (amount: number) => ChargeStripeCard(amount, card?.id),
    {
      onSuccess: () => navigate("/wallet"),
    }
  );
  const paymentAmount = useRef<number>(0);
  const handleInputChange = (event: any) => {
    const newValue = +event.target.value;
    setValue(newValue);
    paymentAmount.current = newValue;
  };
  const paypal: any = useRef();
  const payWithPaypal = () => {
    (window as any).paypal
      .Buttons({
        createOrder: (data: any, actions: any, err: any) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Wallet Charge",
                amount: {
                  currency_code: "USD",
                  value: paymentAmount.current,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          await axiosInstance
            .post(URL + "/paypal-success", {
              orderID: order?.orderID,
            })
            .then(() => {
              () => navigate("/wallet");
            })
            .catch((err) => {
              alert(err);
            });
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  };
  useEffect(() => {
    payWithPaypal();
  }, []);

  const { data } = useQuery(["userInfo"], () => getUserInfo(), {
    select: (data) => data.data,
  });

  console.log(card);

  const handleChange = (e: any) => {
    setCard(e.target.value);
  };

  return (
    <Box
      justifyContent={"center"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Paper elevation={24} sx={{ display: "grid", width: "600px" }}>
        <Typography m={2} component={"div"}>
          <Translate>Charge your wallet</Translate>
        </Typography>
        <TextField
          sx={{ width: "300px", m: 2 }}
          variant="outlined"
          onChange={handleInputChange}
          placeholder="place amount here in USD"
        />
        <label htmlFor="" style={{ margin: "0px 12px" }}>
          <Translate>Select Card</Translate>
        </label>
        <Select
          sx={{ width: "80%", margin: "10px 15px" }}
          placeholder="Card"
          onChange={handleChange}
          value={card}
        >
          {data?.Cards?.map((card: any, idx: number) => {
            return (
              <MenuItem key={idx} value={card}>
                {card?.name} - {card?.cardNumber}
              </MenuItem>
            );
          })}
        </Select>
        {/* <Button
          disabled={value <= 0}
          sx={{}}
          variant="contained"
          onClick={() => mutate(value)}
        >
          {" "}
          Submit{" "}
        </Button> */}
      </Paper>
      <div
        style={{
          cursor: value === 0 ? "not-allowed" : "unset",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          pointerEvents: value === 0 ? "none" : "all",
          zIndex: 999,
        }}
      >
        <Typography m={2} component={"h2"} sx={{ color: "#fff" }}>
          <Translate>Charge with</Translate>
        </Typography>
        <div ref={paypal}></div>
        <Typography m={2} component={"h4"} sx={{ color: "#fff" }}>
          Or
        </Typography>
        <Button variant="contained" onClick={() => mutate(value)}>
          {" "}
          <Translate>+Charge With Stripe</Translate>
        </Button>
      </div>
    </Box>
  );
};

export default Charge;
