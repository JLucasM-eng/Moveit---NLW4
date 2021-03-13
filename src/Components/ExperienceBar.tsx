import { useContext } from 'react';
import { Challengescontext } from '../Contexts/ChallengesContext';
import styles from '../Styles/components/ExperienceBar.module.css'



export function ExperienceBar(){

    const {currentExperience, experienceToNextLevel} = useContext(Challengescontext);
    const percentToNextLevel = Math.round(currentExperience * 100)/experienceToNextLevel
    console.log(`'${experienceToNextLevel}%'`)
    return (
        <header className = {styles.experienceBar}>
            <span>0px</span>
            <div>
                <div style = {{width:`${percentToNextLevel}%`}}/>
                <span className = {styles.currentExperience} style = {{left: `${percentToNextLevel}%`}}>{currentExperience}xp</span>
            </div>
            <span>{experienceToNextLevel}px</span>
        </header>
    );
}