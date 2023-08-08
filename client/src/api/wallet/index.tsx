import axios from "axios";
// import { UserType } from "../../context/Auth";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;
// || import.meta.env.VITE_LOCAL_DOAMIN

import axiosInstance from "../axiosInstance";
import { WalletProps } from "../../pages/Stripe";

export const AddCreditCard = async ({
  cvc,
  expiry,
  focused,
  issuer,
  name,
  number,
}: WalletProps) => {
  try {
    const val = expiry?.split("/");
    if (val) console.log(+val[0]);

    const { data } = await axiosInstance({
      method: "POST",
      url: URL + "/createCard",
      data: {
        cardName: issuer,
        cardNo: number,
        cvc: cvc,
        expMonth: val && +val[0],
        expYear: val && +val[1],
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ChargeStripeCard = async (amount: number, cardId: any) => {
  try {
    const { data } = await axiosInstance({
      method: "POST",
      url: URL + "/stripeCharge",
      data: {
        amount,
        cardId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
