import { useContext } from 'react';
import { Challengescontext } from '../Contexts/ChallengesContext';
import styles from '../Styles/components/Profile.module.css'

export function Profile(){
    const {level} = useContext(Challengescontext)
    return (
        <div className = {styles.profileContainer}>
            <img src="https://github.com/JLucasM-eng.png" alt="jose"/>
            <div>
                <strong>José Lucas</strong>
                
                <p><img src="icons/level.svg" alt="level-image"/> Level {level}</p>
            </div>
        </div>
    );
}