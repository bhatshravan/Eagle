
import { useApiCall } from "../Utils/api";
import { Button, LoadingOverlay } from "@mantine/core";


export default function Limits() {
  const sheetsQuery = useApiCall(
    ["positions"],
    "get",
    "https://trade.bitstreak.in/limits",
    {},
    {
      cacheTime: 0,
    }
  );

  if (sheetsQuery.isLoading) {
    return (
      <div className="text-center mt-20">
        <LoadingOverlay visible={true} overlayBlur={2} />
      </div>
    );
  }
  if (sheetsQuery.isError) {
    return (
      <div className="text-center mt-20">
        <h2>Error</h2>
      </div>
    );
  }
  return (
    <div className="m-2 flex flex-col items-center justify-center align-middle justify-items-center self-center place-items-center">
      
       <Button  color="cyan" className="bg-cyan-900" onClick={()=>{
        sheetsQuery.refetch();
      }}>
        Refresh
      </Button>
      <h3>Premium: {parseFloat(sheetsQuery.data?.premium_d_m)*-1 }</h3>
      {/* <h3>Premium: {parseFloat(sheetsQuery.data?.premium_d_m)*-1 }</h3> */}
      <h3>Brokerage: {parseFloat(sheetsQuery.data?.brkage_d_m) }</h3>
      <h3>Cash: {parseFloat(sheetsQuery.data?.cash) }</h3>
      <h3>Grcoll: {parseFloat(sheetsQuery.data?.grcoll) }</h3>
      <h3>Payin: {parseFloat(sheetsQuery.data?.payin) }</h3>
     
      
    </div>
  );
}
