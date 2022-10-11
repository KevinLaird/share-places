import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      image:
        "https://images.unsplash.com/photo-1655803242400-c74124e94ecb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=692&q=80",
      name: "Kevin Laird",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};
export default Users;
