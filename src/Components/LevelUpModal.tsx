import { useContext } from 'react'
import { Challengescontext } from '../Contexts/ChallengesContext'
import styles from '../Styles/components/LevelUpModal.module.css'
export function LevelUpModal(){

    const {level,fechaModal} = useContext(Challengescontext)

    return(
        <div className = {styles.overlay}>
            <div className = {styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>
                <button type = "button" onClick = {fechaModal}>
                    <img src="/icons/close.svg" alt="Fechar modal"/>
                </button>
            </div>
        </div>
    )


}