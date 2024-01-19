import { User } from "@/views";
import { useState } from "react";

interface UserAccount {
  profileImage: string;
  userName: string;
  name: string;
  bio: string;
  email: string;
  lens: string;
  githubUrl: string;
  twitterUrl: string;
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
  const [parsedData, setParsedData] = useState<UserAccount>();

  return <User parsedData={parsedData} />;
}
