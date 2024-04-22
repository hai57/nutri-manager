import { useEffect, useState } from "react";
import { userServiceApi } from "@/api/user";

export const getAllUser = () => {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = () => {
    userServiceApi.getAllUser(offset, limit)
      .then(res => {
        console.log(res);
      })
  }
};
