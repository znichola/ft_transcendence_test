import { useEffect, useState } from "react";
import { UserData } from "../interfaces";
import { api } from "../utils";
import { Avatar } from "../Profile";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState<UserData[]>();
  useEffect(() => {
    let ignore = false;
    api<UserData[]>("http://localhost:3000/user/").then((result) => {
      if (!ignore) {
        setUsers(result);
      }
    });
    console.log(users);
    return () => {
      ignore = true;
    };
  }, []);

  console.log(users);

  if (users === undefined)
    return (
      <>
        <h1>No users fetched</h1>
      </>
    );
  else
    return (
      <>
        {users.map((u) => (
          <UserInfo user={u} url={"/" + u.login42} key={u.login42} />
        ))}
      </>
    );
}

export function UserInfo({ user, url }: { user: UserData; url: string }) {
  return (
    <div className="m-4 flex bg-red-100 shadow ">
      <Avatar
        size="m-2 mb-3 mt-3 w-16 h-16"
        alt={user?.name}
        status={user?.status}
        img={user?.avatar}
      />

      <div className="flex flex-col content-center justify-center ">
        <p className="font-semibold text-slate-700">{user?.name}</p>
        <Link to={"/users/" + user.login42} className="text-slate-400">{"@" + user?.login42}</Link>
      </div>
    </div>
  );
}
