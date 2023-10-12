import Avatar from "../components/Avatar";
import { ErrorMessage } from "../components/ErrorComponents";
import { IconTrophy } from "../components/Icons";
import { LoadingSpinnerMessage } from "../components/Loading";
import { useUserData } from "../functions/customHook";
import PongApp from "../pong/PongApp";

function DisplayPlayer({
  name,
  right = false,
}: {
  name: string;
  right?: boolean;
}) {
  const { data: user, isLoading, isError } = useUserData(name);

  if (isLoading) {
    return <LoadingSpinnerMessage message={"Loading player : " + name} />;
  }

  if (isError) {
    <ErrorMessage message={"Error : cannot load player " + name} />;
  }

  return (
    <div
      className={
        "h-30 flex w-80 rounded-full border-b-4 bg-stone-50 py-1 px-2 shadow-md " + (right ? " flex-row-reverse " : "")
      }
    >
      <img
        src={user?.avatar}
        alt={user?.login42}
        className={"h-20 w-20 rounded-full self-center" + (right ? " " : "")}
      />
      <div className={"flex justify-center flex-col p-5 grow" + (right ? " items-end " : "")}>
        <p className="">{user?.name}</p>
        <div className="flex items-center">
          <p className="">{user?.elo}</p>
          <IconTrophy/>
        </div>
      </div>
    </div>
  );
}

export default function PlayPong({player1, player2}:{player1: string, player2: string}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden px-12 pt-5">
      <div className="absolute left-auto right-auto h-full opacity-30 w-0.5 bg-stone-300"></div>
      <div className="flex w-full text-slate-600 font-bold text-xl">
        <div className="flex">
          <DisplayPlayer name={player1} />
        </div>
        <div className="flex grow justify-center items-end">
          <div className="flex gap-3 text-5xl">
            <p className="">10</p>
            <div className="w-1 bg-slate-600"></div>
            <p className="">10</p>
          </div>
        </div>
        <div className="flex">
          <DisplayPlayer name={player2} right={true} />
        </div>
      </div>
      <div className="flex justify-center items-center grow pb-14 pt-3">
        <div className="h-fit w-fit rounded-xl border-2 border-stone-600 bg-stone-700 text-sky-200 shadow-2xl ">
          <PongApp width={858} height={525} />
        </div>
      </div>
    </div>
  );
}

// for resizing
// https://codesandbox.io/s/resizing-canvas-with-react-hooks-gizc5?file=/src/index.js
