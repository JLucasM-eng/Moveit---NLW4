import { useContext, useState } from 'react';
import { useEffect } from 'react';
import styles from '..//Styles/components/Countdown.module.css'
import { Challengescontext } from '../Contexts/ChallengesContext';
import { CountdownContext } from '../Contexts/CountdownContext';


export function Countdown() {

   
    const {minutes,
         seconds, 
         hasfinished, 
         Isactive, 
         startCountdown,
         resetCountdown
        } = useContext(CountdownContext)
    //pegando agora os minutos e os segundos separado
    //Primeiro eu transformo em string
    /* Depois eu verifico se existe realmente 2 caracteres pra ter um left e right
    usando a função padStart(2,'0') eu verifico se tem 2 caracteres, se n tiver ele preenche
    com o 0.*/
    //Depois eu faço o split pra salvar cada um dos valores
    const [minuteleft, minuteright] = String(minutes).padStart(2, '0').split('')
    const [secondleft, secondright] = String(seconds).padStart(2, '0').split('')

   

    return (
        <div>
            <div className={styles.CountdownContainer}>
                <div>
                    <div>
                        <span>{minuteleft}</span>
                        <span>{minuteright}</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{secondleft}</span>
                        <span>{secondright}</span>
                    </div>
                </div>
            </div>

            {hasfinished ? (
                <button disabled className={styles.countdownButton}>
                    Ciclo finalizado! &#xFE0F;
                </button>) : (
                    <>
                        {Isactive ? (
                            <button type='button' className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
                                Abandonar o ciclo
                            </button>
                        ) : (
                                <button type='button' className={styles.countdownButton} onClick={startCountdown}>
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>

                )}
        </div>

    );
}