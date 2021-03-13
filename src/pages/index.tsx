

import { ExperienceBar } from "../Components/ExperienceBar";
import next from "next";
import { Profile } from '../Components/Profile';

import styles from '../Styles/pages/Home.module.css'
import { CompletedChallanges } from '../Components/CompletedChallanges';
import { Countdown } from '../Components/Countdown';
import Head from 'next/head'
import {GetServerSideProps} from 'next';
import { ChallengeBox } from "../Components/ChallengeBox";
import { CountdownProvider } from "../Contexts/CountdownContext";
import { ChallangesProvider } from "../Contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  
}

export default function Home(props: HomeProps) {
  return (


    <ChallangesProvider 
    level = {props.level} 
    currentExperience = {props.currentExperience} 
    challengesCompleted = {props.challengesCompleted}
    >
    <div className = {styles.container}>

      <Head>
          <title>Início - Move.it</title>
      </Head>

      <ExperienceBar />
      <CountdownProvider>
      <section>
      <div>
        <Profile />
        <CompletedChallanges />
        <Countdown />
        
      </div>

      <div>
      <ChallengeBox /> 
      </div>
    </section>
    </CountdownProvider>
    </div>
    </ChallangesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { level, currentExperience, challengesCompleted } = req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}; 
