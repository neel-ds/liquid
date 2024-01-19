import { User } from "@/views";
import { useState } from "react";
import { useContractRead } from "wagmi";
import { contractAddress } from "../contract/address";
import ABI from "../contract/ABI.json";
interface UserAccount {
  image: string;
  userName: string;
  name: string;
  description: string;
  email: string;
  lens: string;
  github: string;
  twitter: string;
  address: string;
}

export const getServerSideProps = async (context: any) => {
  const username = context.query.username;
  return {
    props: {
      username: username,
    },
  };
};

export default function Profile({ username }: { username: string }) {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: ABI,
    functionName: "getProfile",
    args: [username],
    onSuccess: (data: any) => {
      console.log("Data", data);
      fetchData(data.cid);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const fetchData = async (metaDataUrl: string) => {
    const response = await fetch(`${metaDataUrl}/metadata.json`);
    console.log("Response", response);
    const data = await response.json();
    console.log("Data", data);
    setParsedData(data);
  }
  const [parsedData, setParsedData] = useState<UserAccount>();

  return <User parsedData={parsedData} />;
}
