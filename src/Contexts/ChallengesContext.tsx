import { kMaxLength } from 'buffer';
import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import { LevelUpModal } from '../Components/LevelUpModal';

interface challenge {
    type: 'body' | 'eye'
    description: string;
    amount: number;
}

interface ChallangesContextData{
    level: number; 
    currentExperience : number;
    challengesCompleted :number;
    activeChallenge:challenge;
    experienceToNextLevel: number;
    completeChallenge: ()=>void;
    resetChallenge: () => void;
    levelUp: ()=>void;
    fechaModal: () => void;
    startNewChallenge: ()=>void;

}

interface ChallangesProviderProps {
    children : ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const Challengescontext = createContext({} as ChallangesContextData);

export function ChallangesProvider({
    children, 
    ...rest
}:ChallangesProviderProps){

    const  [level,setLevel] = useState(rest.level ?? 1);
    const [currentExperience,setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted,setChallangesCompleted] = useState(rest.challengesCompleted ?? 0);

    function levelUp(){
      setLevel(level + 1);
      setIsLevelUpModalOpen(true)

    }
    function fechaModal(){
        setIsLevelUpModalOpen(false)
    }
    
    const [activeChallenge,setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen,setIsLevelUpModalOpen] = useState( false)
    
    const experienceToNextLevel = Math.pow((level +1)*4,2)

    useEffect(() => {
        Notification.requestPermission()
    },[])

    useEffect(()=>{
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challengesCompleted',String(challengesCompleted));
    },[level, currentExperience,challengesCompleted])

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/Notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body:`Valendo ${challenge.amount}xp!`
            })
        }
    }

    

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge) {
            return;
        }
        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount;
        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallangesCompleted(challengesCompleted+1)

    }

    return(
        <Challengescontext.Provider value={{level, 
        currentExperience,
        activeChallenge,
        experienceToNextLevel,
        challengesCompleted,
        completeChallenge,
        levelUp, 
        resetChallenge,
        fechaModal,
        startNewChallenge}}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </Challengescontext.Provider>
    );
}