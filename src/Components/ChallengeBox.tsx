import { useContext } from 'react';
import { Challengescontext } from '../Contexts/ChallengesContext';
import { CountdownContext } from '../Contexts/CountdownContext';
import styles from '../Styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const {activeChallenge, resetChallenge, completeChallenge} = useContext(Challengescontext);
    const {resetCountdown} = useContext(CountdownContext)

    function handleChallengeSucceeded(){
        resetCountdown();
        completeChallenge();
    }

    function handleChallengeFalied(){
        resetChallenge();
    }
    return(
        <div className = {styles.challengeBoxContainer}>

            {activeChallenge ? ( 
                <div className = {styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        type = 'button'
                        className = {styles.challengeFailButton}
                        onClick = {handleChallengeFalied}
                        >Falhei</button>

                        <button
                         type = 'button'
                         className = {styles.challengeSucceededButton}
                         onClick = {handleChallengeSucceeded}
                         >Completei</button>
                    </footer>

                </div> 
            ) : (
                <div className = {styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p><img src="icons/level-up.svg" alt="level-up"/>Avance de level completando desafios</p>
            </div>
            )}

            

        </div>
    );
}