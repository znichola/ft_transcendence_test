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
} from "./Icons";
import axios from "axios";
import { UserData } from "../interfaces";
import { LoadingSpinnerMessage } from "../components";
import { Avatar } from "../Profile";
import { TheMasterminds } from "../routes/Root";

export default function SideMenu() {
  return (
    <div className="h-screen w-80">
      <div className="flex h-full flex-grow flex-col overflow-y-auto overflow-x-hidden rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
        <CurrentUserStats />
        <div className="h-8"/>
        <CurrentUserEloStats />
        <div className="mt-3 flex flex-1 flex-col">
          <div className="">
            <Category name="User" />
            <NavSimple name="Play Pong" icon={IconHomeComputer} />
            <NavSimple name="My Profile" icon={IconUser} />
            <NavSimple name="Issue a new pong" icon={IconMegaphone} />
            <NavSimple name="Global Ranking" icon={IconWorld} />
            <Category name="Social" />
            <NavExpandable name="Messages" icon={IconGroupChatBubble}>
              <NavSimple name="Start a new conversation" icon={IconAddPulse} />
              <NavSimple name="Funky Dude 42" icon={IconUser} />
              <NavSimple name="😎 Cool Gal 69" icon={IconUser} />
            </NavExpandable>
            <NavExpandable name="Chat Channels" icon={IconUserGroup}>
              <NavSimple name="Start and new channel" icon={IconAddPulse} />
              <NavSimple name="Only 1337 pongers" icon={IconBashShell} />
              <NavSimple name="Noobs helpdesk" icon={IconBashShell} />
            </NavExpandable>
            <NavExpandable name="Friends" icon={IconPeople}>
              <NavSimple name="Find new friends" icon={IconAddPulse} />
              <NavSimple name="Funky Dude 42" icon={IconUser} />
              <NavSimple name="😎 Cool Gal 69" icon={IconUser} />
            </NavExpandable>
            <Category name="External Links" />
            <NavSimple name="Dev log" icon={IconNewspaper} />
            <NavSimple name="Hart on github" icon={IconHeart} />
            <NavSimple name="Complain about ... the css" icon={IconBolt} />
          </div>

          <TheMasterminds />
          <div className="h-4"/>
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

function NavSimple({
  name,
  icon: Icon,
}: {
  name: string;
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
      <a
        href="#"
        className="flex cursor-pointer items-center border-l-rose-600 px-4 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4"
      >
        {Icon && <Icon />}
        <p className="pl-4">{name}</p>
      </a>
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
      <button className="peer relative flex w-full items-center border-l-rose-600 text-sm font-medium text-slate-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4">
        <NavSimple name={name} icon={Icon} />
        {/* {Icon && <Icon />} */}
        {/* <div className="w-4" /> */}
        {/* {name} */}
        <label
          htmlFor={`menu-${name}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        />
      </button>
      <IconDownChevron className="absolute right-0 top-4 h-4 -rotate-90 px-5 text-slate-600 transition peer-checked:rotate-90 peer-hover:text-rose-600" />
      <ul className="duration-400 m-2 flex max-h-0 flex-col overflow-y-auto rounded bg-slate-50 shadow-sm font-medium transition-all duration-300 peer-checked:max-h-96">
        {children}
      </ul>
    </div>
  );
}

function CurrentUserStats() {
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser", "default42"],
    queryFn: () =>
      axios.get<UserData>("/user/default42").then((res) => res.data),
  });
  if (isLoading)
    return <LoadingSpinnerMessage message="Fetching user profile" />;
  if (isError) return <p>Error fethcing data</p>;
  return (
    <>
      <div className="flex">
        <Avatar
          size="m-2 mb-3 mt-3 w-16 h-16"
          alt={currentUser.name}
          status={currentUser.status}
          img={currentUser.avatar}
        />

        <div className="flex flex-col content-center justify-center ">
          <p className="font-semibold text-slate-700">{currentUser.name}</p>
          <p className="text-slate-400">{"@" + currentUser.login42}</p>
        </div>
      </div>
    </>
  );
}

function CurrentUserEloStats() {
  return (
    <>
      <div className="h-40 bg-slate-100"></div>
    </>
  );
}

