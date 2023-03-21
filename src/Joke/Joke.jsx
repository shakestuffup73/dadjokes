import { useState } from "react";
import styles from './Joke.module.css'

const Joke = ({ joke }) => {

  const [votes, setVotes] = useState(joke.votes)

  const handleClick = (amount) => {
    setVotes((votes) => votes + amount)
  }

  return ( 
    <div className={styles.jokeDiv}>
      <div>
        <button onClick={() => handleClick(-1)}>-</button>
        <p>{votes}</p>
        <button onClick={() => handleClick(1)}>+</button>
      </div>
      <p id='jokeP'>{joke.joke}</p>
    </div>
  );
}

export default Joke;