import { useEffect, useRef, useState } from "react";
import PongApp from "./PongApp.tsx";

export default function ResponsiveAppPong() {
    const [dim, setDim] = useState({ x: 858, y: 525 });
    const pong = useRef<HTMLDivElement>(null);
    function handleResize() {
        if (pong.current) {
            setDim({ x: pong.current.offsetWidth, y: pong.current.offsetHeight });
        }
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div ref={pong} className={`h-[40rem] w-full`}>
            < PongApp width={dim.x} height={dim.y} />
        </div>
    );
}