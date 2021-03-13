import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Challengescontext } from "./ChallengesContext";

interface CountdownProviderProps {
    children : ReactNode;
}


interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasfinished: boolean;
    Isactive: boolean;
    startCountdown: ()=> void;
    resetCountdown: ()=> void; 
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeount: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps ){

    const {startNewChallenge} = useContext(Challengescontext);

    const [time, setTime] = useState(25 * 60);
    const [Isactive, setIsActive] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [hasfinished, setHasfinished] = useState(false)

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeount)
        setIsActive(false);
        setTime(0.1 * 60);
        setHasfinished(false);
    }

    useEffect(() => {
        if (Isactive && time > 0) {
            countdownTimeount = setTimeout(() => {
                setTime(time - 1)
            }, 1000)//Quero executar uma função depois de um periodo de tempo
        } else if (Isactive && time === 0) {
            setHasfinished(true);
            setIsActive(false);
            setTime(0.1 * 60);
            startNewChallenge();
        }
    }, [Isactive, time])

    return (
        <CountdownContext.Provider value = {{
            minutes,
            seconds,
            hasfinished,
            Isactive,
            startCountdown,
            resetCountdown,

        }}>
            {children}
        </CountdownContext.Provider>
    )
}