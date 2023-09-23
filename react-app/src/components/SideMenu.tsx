import { useQuery } from "@tanstack/react-query";
import {
  IconBashShell,
  IconDownChevron,
  IconGroupChatBubble,
  IconHomeComputer,
  IconNewspaper,
  IconPeople,
  IconUser,
  IconAddPulse,
  IconWorld,
  IconUserGroup,
  IconMegaphone,
  IconHeart,
  IconBolt,
  IconBrain,
  IconFire,
  IconFingerPrint,
} from "./Icons";
import axios from "axios";
import { UserData } from "../interfaces";
import { LoadingSpinnerMessage } from "./Loading.tsx";
import Avatar from "../components/Avatar.tsx";
import { Link } from "react-router-dom";
import NavFriends from "./SideNaveFriendsList.tsx";
import ProfileElo from "./ProfileElo.tsx";
import { getCurrentUser } from "../Api-axios.tsx";

export default function SideMenu() {
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    initialData: "default42",
  });

  const {
    data: currentUserData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["UserData", user],
    queryFn: () => axios.get<UserData>("/user/" + user).then((res) => res.data),
  });

  if (isLoading)
    return <LoadingSpinnerMessage message="Fetching user profile" />;
  if (isError) return <p>Error fethcing data</p>;

  return (
    <div className="h-screen w-80">
      <div className="flex h-full flex-grow flex-col overflow-y-auto overflow-x-hidden rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
        <CurrentUserStats />
        <div className="h-8" />
        <CurrentUserEloStats />
        <div className="mt-3 flex flex-1 flex-col">
          <div className="">
            <Category name="User" />
            <NavHighlight
              name="Play a game of Pong"
              to="/play"
              icon={IconHomeComputer}
            />
            <Nav name="My Profile" to={"/user/" + user} icon={IconUser} />
            <Nav name="Issue a new pong" to="/pong" icon={IconMegaphone} />
            <Nav name="Global Ranking" to="/ranking" icon={IconWorld} />
            <Category name="Social" />
            <NavExpandable name="Messages" icon={IconGroupChatBubble}>
              <Nav
                name="Start a new conversation"
                to="/message"
                icon={IconAddPulse}
              />
              <Nav name="Funky Dude 42" icon={IconUser} />
              <Nav name="😎 Cool Gal 69" icon={IconUser} />
            </NavExpandable>
            <NavExpandable name="Chat Channels" icon={IconUserGroup}>
              <Nav
                name="Start and new chatroom"
                to="/chatroom"
                icon={IconAddPulse}
              />
              <Nav name="Only 1337 pongers" icon={IconBashShell} />
              <Nav name="Noobish helpdesk" icon={IconBashShell} />
            </NavExpandable>
            <NavExpandable name="Friends" icon={IconPeople}>
              <Nav name="Find new friends" to="friend" icon={IconAddPulse} />
              <NavFriends currentUser={currentUserData} />
            </NavExpandable>

            <Category name="Temporay links for dev" />
            <Nav name="auth" to="/auth" icon={IconFingerPrint} />
            <Nav name="login" to="/login" icon={IconFire} />

            <Category name="External Links" />
            <Nav name="Dev log" to="/ttt" icon={IconNewspaper} />
            <Nav name="Hart on github" icon={IconHeart} />
            <Nav
              name="Complain about ... the css"
              to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              icon={IconBolt}
            />
          </div>

          <TheMasterminds />
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}

function Category({ name }: { name: string }) {
  return (
    <span className="block p-2 pt-10 text-xs  text-slate-400">{name}</span>
  );
}

export function Nav({
  name,
  to,
  icon: Icon,
}: {
  name: string;
  to?: string;
  icon: ({
    className,
    strokeSize,
  }: {
    className?: string;
    strokeSize?: number;
  }) => JSX.Element;
}) {
  return (
    <nav className="flex-1">
      <Link
        to={to || "#"}
        className="flex cursor-pointer items-center border-l-rose-600 px-4 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4"
      >
        {Icon && <Icon />}
        <p className="pl-4">{name}</p>
      </Link>
    </nav>
  );
}

export function NavHighlight({
  name,
  to,
  icon: Icon,
}: {
  name: string;
  to?: string;
  icon: ({
    className,
    strokeSize,
  }: {
    className?: string;
    strokeSize?: number;
  }) => JSX.Element;
}) {
  return (
    <nav className="flex-1 px-1">
      <Link
        to={to || "#"}
        className="bg-size-200 flex cursor-pointer items-center rounded-md bg-gradient-to-tl from-fuchsia-600 via-orange-500 to-purple-600 px-4 py-2 text-sm font-medium text-slate-100 shadow-md outline-none transition-all duration-100 ease-in-out hover:bg-right-bottom focus:bg-right-bottom"
      >
        {Icon && <Icon />}
        <p className="py-1 pl-4">{name}</p>
      </Link>
    </nav>
  );
}

function NavExpandable({
  name,
  icon: Icon,
  children,
}: {
  name: string;
  icon: ({
    className,
    strokeSize,
  }: {
    className?: string;
    strokeSize?: number;
  }) => JSX.Element;
  children?: JSX.Element[];
}) {
  return (
    <div className="relative flex-1 transition">
      <input
        className="peer hidden"
        type="checkbox"
        id={`menu-${name}`}
        defaultChecked={false}
      />
      <label
        htmlFor={`menu-${name}`}
        className="relative flex h-full w-full cursor-pointer items-center border-l-rose-600 text-sm font-medium text-slate-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4"
      >
        <div className="item-center flex border-l-rose-600 px-4 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
          {Icon && <Icon />}
          <p className="pl-4">{name}</p>
        </div>
      </label>
      <IconDownChevron className="pointer-events-none absolute right-0 top-4 h-4 -rotate-90 px-5 text-slate-600 transition peer-checked:rotate-90 peer-hover:text-rose-600" />
      <ul className="duration-400 m-2 flex max-h-0 flex-col overflow-y-auto rounded bg-rose-50 font-medium shadow-sm transition-all duration-300 peer-checked:max-h-96">
        {children}
      </ul>
    </div>
  );
}

function CurrentUserStats() {
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    initialData: "default42",
  });

  const {
    data: currentUserData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["UserData", user],
    queryFn: () => axios.get<UserData>("/user/" + user).then((res) => res.data),
  });

  if (isLoading)
    return <LoadingSpinnerMessage message="Fetching user profile" />;
  if (isError) return <p>Error fethcing data</p>;
  return (
    <>
      <div className="flex">
        <Avatar
          size="m-2 mb-3 mt-3 w-16 h-16"
          alt={currentUserData.name}
          status={currentUserData.status}
          img={currentUserData.avatar}
        />

        <div className="flex flex-col content-center justify-center ">
          <p className="font-semibold text-slate-700">{currentUserData.name}</p>
          <p className="text-slate-400">{"@" + currentUserData.login42}</p>
        </div>
      </div>
    </>
  );
}

function CurrentUserEloStats() {
  return (
    <>
      <div className="flex justify-center p-2">
        <div className="h-40 rounded-xl bg-stone-50 p-4 shadow-inner">
          <ProfileElo data={[1201, 1190, 991, 1249, 1176, 1298, 1495, 1587]} />
        </div>
      </div>
    </>
  );
}

function TheMasterminds() {
  return (
    <Link
      to="/"
      className="group mt-auto flex flex-col items-center justify-center px-4"
    >
      <IconBrain className="h-10 w-10 fill-slate-600 drop-shadow group-hover:fill-red-500" />
      <span className="italic text-slate-600 drop-shadow group-hover:text-red-500">
        les Masterminds
      </span>
    </Link>
  );
}
