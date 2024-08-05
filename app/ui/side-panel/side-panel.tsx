import { useIsLoggedIn } from "@/app/lib/hooks";
import { CurrentRound } from "../current-round";
import { SpeedSlider } from "../speed-slider/speed-slider";
import { Register } from "./register";
import { UserInput } from "./user-input";

export const SidePanel = () => {
    const isLoggedIn = useIsLoggedIn();

    return (
        <>
            {
                isLoggedIn ?
                    <>
                        <UserInput />
                        <CurrentRound />
                        <SpeedSlider />
                    </>
                    : <Register />
            }
        </>
    )
}