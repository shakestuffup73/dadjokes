import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Joke from "../Joke/Joke";
import './JokeList.css'

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
          else {
            newJokes.push(joke)
          }
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
    let newJoke = await fetchJoke()
    if (jokesArray.some(joke => joke.id === newJoke.id )) {
      newJoke = await fetchJoke()
      setJokesArray([...jokesArray, newJoke])
    }
    else {
      setJokesArray([...jokesArray, newJoke])
    }
  }

  const handleVote = (id, amount) => {
    const updatedJokesArray = jokesArray.map(joke => {
      if (joke.id === id){
        // take prev joke object, set the votes to joke.votes with the +1 or -1 added to it
        return {...joke, votes: joke.votes + amount}
      } else {
        return joke
      }
    })
    setJokesArray(updatedJokesArray)
  }
  
  const sortedJokes = jokesArray.sort((a, b) => {
    return b.votes-a.votes
  })

  const jokesList = sortedJokes.map(joke => (
    <Joke key={uuidv4()} joke={joke} handleVote={handleVote}/>
  ))
  
  

  return ( 
    <div className='jokeListBody'>     
      {isLoading ? <div className='loader'></div>
      : 
      <div className='jokeList'>
        <div className='sidebar'>
          <h2 className='title'>Dad Jokes</h2>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="smiley emoji" />
          <button className='sidebarBtn' onClick={() => handleClick()}>Add Joke</button>
        </div>
        <div className='jokesContainer'>
          {jokesList} 
        </div>
      </div> 
      }
    </div>
  );
}

export default JokeList;