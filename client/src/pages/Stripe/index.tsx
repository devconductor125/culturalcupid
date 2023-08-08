import { Box, Typography, Button, Alert } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards, { CallbackArgument } from "react-credit-cards-2";
import {
  formatCVC,
  formatCreditCardNumber,
  formatExpirationDate,
} from "./chargeUtils";
import { StyledInput, CardInfo } from "./styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCreditCard } from "../../api/wallet";
import { getUserInfo } from "../../api/auth";
import Translate from "../../common/translate/Translate";

export type WalletProps = {
  name?: string;
  number?: string;
  expiry?: string;
  cvc?: string;
  focused?: string;
  issuer?: string;
};

const Stripe = () => {
  const [values, setValues] = useState<WalletProps>({
    cvc: "",
    expiry: "",
    focused: "",
    issuer: "",
    name: "",
    number: "",
  });
  // const [ disabled, setDisabled ] = useState<boolean>(true)

  const { data } = useQuery(["userInfo"], () => getUserInfo(), {
    select: (data) => data.data,
  });

  console.log(data);

  const handleCallback = useCallback(
    ({ issuer }: CallbackArgument, isValid: boolean) => {
      if (isValid) {
        setValues({ ...values, issuer });
      }
    },
    []
  );

  const { mutate } = useMutation(() => AddCreditCard(values), {
    onSuccess: (data) => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  const handleInputFocus = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      focused: target.name,
    });
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setValues({ ...values, [target.name]: target.value });
  };

  const handleSubmit = () => {
    mutate();
  };

  const disabled = useMemo(() => {
    if (values.cvc && values.expiry && values.number) {
      return false;
    }
    return true;
  }, [values]);

  return (
    <Box>
      <div key="Payment">
        <div className="App-payment">
          <Cards
            cvc={values.cvc !== undefined ? values.cvc : ""}
            expiry={values.expiry ? values.expiry : ""}
            name={values.name ? values.name : ""}
            number={values.number ? values.number : ""}
            callback={handleCallback}
          />

          <form
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <CardInfo>
              <div>
                <Typography color={"white"} fontWeight={700} component={"div"}>
                  <Translate>Name on card</Translate>
                </Typography>

                <StyledInput
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  pattern="[a-z A-Z-]+"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-group">
                <Typography color={"white"} fontWeight={700} component={"div"}>
                  <Translate>Card Number</Translate>
                </Typography>

                <StyledInput
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  maxLength={19}
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>

              <div className="form-group">
                <Typography color={"white"} fontWeight={700} component={"div"}>
                  <Translate>Expiration Date</Translate>
                </Typography>

                <StyledInput
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-group">
                <Typography color={"white"} fontWeight={700} component={"div"}>
                  CVC
                </Typography>

                <StyledInput
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-actions">
                <Button
                  disabled={disabled}
                  onClick={handleSubmit}
                  variant="contained"
                >
                  <Translate>Submit</Translate>
                </Button>
              </div>
            </CardInfo>
          </form>
        </div>
        <h1 style={{ padding: "0px 15px", color: "#fff" }}>Your cards</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {data?.Cards?.map((card: any, idx: number) => {
            return (
              <div
                style={{
                  margin: "10px 0px",
                }}
              >
                <Cards
                  cvc={card?.cvc}
                  expiry={card?.expiry}
                  name={card?.name}
                  number={card?.cardNumber}
                  callback={handleCallback}
                  key={idx}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
};

export default Stripe;
