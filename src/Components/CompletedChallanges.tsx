import { useContext } from 'react';
import { Challengescontext } from '../Contexts/ChallengesContext';
import styles from '../Styles/components/CompletedChallanges.module.css'

export function CompletedChallanges(){

    const {challengesCompleted} = useContext(Challengescontext); 

    return(
        <div className = {styles.CompletedChallangesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}