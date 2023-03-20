const Joke = ({ joke }) => {

  return ( 
    <div>
      <div>
        <button>-</button>
        <p>votes</p>
        <button>+</button>
      </div>
      <p id='jokeP'>{joke.joke}</p>
    </div>
  );
}

export default Joke;