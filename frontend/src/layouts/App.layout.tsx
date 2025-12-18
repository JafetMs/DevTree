
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeApi";
import { DevTree } from "../components/DevTree";

export default function AppLayout() {
  const { data, isError, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 2,
    refetchOnWindowFocus: false,
  });
  if (isLoading) return "Loading......";
//   (data);
  if (isError) {
    return <Navigate to={"/auth/login"} />;
  }
  if (data) return <DevTree data={data} />


}
