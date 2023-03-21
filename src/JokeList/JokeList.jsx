import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Joke from "../Joke/Joke";
import styles from './JokeList.module.css'

const JokeList = () => {
  
  // const [joke, setJoke] = useState([])
  const [jokesArray, setJokesArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const api = 'https://icanhazdadjoke.com/'

  // useEffect(() => {
  //   const initialJokes = async () => {
  //     try {
  //       const newJokes = await Promise.all([...Array(10)].map(fetchJoke))
  //       setJokesArray(newJokes)
  //     } 
  //     catch (error) {
  //       console.log('this is error in the useEffect', error)
  //       return 'Yikes'
  //     }
  //   }
  //   initialJokes()
  // }, [])

  useEffect(() => {
    const initialJokes = async () => {
      try {
        const newJokes = []
        for (let i = 0; i <  10; i++){
          setIsLoading(true)
          let joke = await fetchJoke()
          if (newJokes.some(newJoke => newJoke.id === joke.id)){
            joke = await fetchJoke()
            newJokes.push(joke)
          }
          newJokes.push(joke)
        }
        setIsLoading(false)
        setJokesArray(newJokes)
      }
      catch (error) {
        console.log('this is error in useEffect', error)
        return 'No jokes for you'
      }
    }
    initialJokes()
  }, [])

  const fetchJoke = async () => {
    try {
      const config = {headers: {Accept: 'application/json'}}
      const res = await axios.get(api, config)
      
      // console.log('this is res', res.data.joke);
      let newJoke = res.data
      newJoke.votes = 0
      return newJoke
      // console.log('this is newJoke', newJoke)
    }
    catch(error) {
      console.log('this is error in fetchJoke', error)
    }
  }

  const handleClick = async () => {
    const joke = await fetchJoke()
    setJokesArray([...jokesArray, joke])
  }


  const jokesList = jokesArray.map(joke => (
    <Joke key={uuidv4()} joke={joke}/>
  ))

  return ( 
    <div>
      <button onClick={() => handleClick()}>Add Joke</button>
      {isLoading ? <div className={styles.loader} /> : jokesList}
    </div>
  );
}

export default JokeList;