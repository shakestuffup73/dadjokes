import './Joke.css'

const Joke = ({ joke, handleVote }) => {

  const handleVoteClick = (amount) => {
    handleVote(joke.id, amount)
  }

  function getEmoji() {
    if (joke.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (joke.votes >= 12) {
      return "em em-laughing";
    } else if (joke.votes >= 9) {
      return "em em-smiley";
    } else if (joke.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (joke.votes >= 3) {
      return "em em-neutral_face";
    } else if (joke.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  function getColor() {
    if (joke.votes >= 15) {
      return '#4CAF50';
    } else if (joke.votes >= 12) {
      return '#8BC34A';
    } else if (joke.votes >= 9) {
      return '#CDDC39';
    } else if (joke.votes >= 6) {
      return '#FFEB3B';
    } else if (joke.votes >= 3) {
      return '#FFC107';
    } else if (joke.votes >= 0) {
      return '#FF9800';
    } else {
      return '#F44336';
    }
  }

  return ( 
    <div className='joke'>
      <div className='voteBtns'>
        <i className='voteBtn fa-sharp fa-solid fa-arrow-down' onClick={() => handleVoteClick(-1)}></i>
        <div className='votes' style={{borderColor: getColor(), borderWidth: '5px'}}>
        {joke.votes}
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