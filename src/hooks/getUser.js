import { useEffect } from "react";
import { userServiceApi } from "@/apis/user";

export const getUser = () => {
  useEffect(() => {
    getUSer()
  }, [])

  const getUSer = () => {
    userServiceApi.getUser()
    .then(res => {
      console.log(res);
    })
  }
};
