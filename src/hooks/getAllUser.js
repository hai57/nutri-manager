import { useEffect } from "react";
import { userServiceApi } from "@/api/user";

export const getAllUser = () => {
  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = () => {
    userServiceApi.getAllUser()
    .then(res => {
      console.log(res);
    })
  }
};
