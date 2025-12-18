import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeApi";
import { Spinner } from "../components/Spinner";
import { HandleData } from "./HandleData";

interface HandleViewProps {}

export const HandleView = ({}: HandleViewProps) => {
  const params = useParams();
  const handle = params.handle!;

  const { data, error, isLoading} = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey:['handle', handle],
    retry:1
  })


  if(isLoading) return <Spinner/>;
  if(error) return <Navigate to={'/404'}/>

  if(data) return (
    <HandleData data={data}/>

  )
};
