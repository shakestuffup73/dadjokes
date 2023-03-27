import { useState } from "react";
import './Joke.css'

const Joke = ({ joke, handleVote }) => {

  const [votes, setVotes] = useState(joke.votes)
  // need to lift state of votes in order to rank votes in JokeList

  const handleVoteClick = (amount) => {
    handleVote(joke.id, amount)
  }

  function getEmoji() {
    if (votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 12) {
      return "em em-laughing";
    } else if (votes >= 9) {
      return "em em-smiley";
    } else if (votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 3) {
      return "em em-neutral_face";
    } else if (votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  return ( 
    <div className='joke'>
      <div className='voteBtns'>
        <i className='voteBtn fa-sharpfa-solid fa-arrow-down' onClick={() => handleVoteClick(-1)}></i>
        <div className='votes'>
        {votes}
        </div>
        <i className='voteBtn fa-sharp fa-solid fa-arrow-up' onClick={() => handleVoteClick(1)}></i>
      </div>
      <div className='joke-text'>{joke.joke}</div>
      <div className='emoji'>
        <i className={getEmoji()} />
      </div>
    </div>
  );
}

export default Joke;