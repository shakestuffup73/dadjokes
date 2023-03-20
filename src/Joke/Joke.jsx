import { useState } from "react";

const Joke = ({ joke }) => {

  const [votes, setVotes] = useState(joke.votes)

  const handleClick = (amount) => {
    setVotes((votes) => votes + amount)
  }

  return ( 
    <div>
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