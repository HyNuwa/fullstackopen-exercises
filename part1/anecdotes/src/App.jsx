import { useState } from 'react'
import './App.css'
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints]=useState(new Uint8Array(anecdotes.length))
  const [mostVote, setMostVote]=useState(0)
  const handleClickNext =()=>{
    const randomNumber = Math.floor(Math.random() * anecdotes.length)  
    setSelected(randomNumber) 
  }

  const handleClickVote=()=>{
    const copy = [...points]
    // increment the value in position 2 by one
    copy[selected] += 1
    setPoints(copy)

    if (copy[selected] > copy[mostVote]) {
      setMostVote(selected);
    }           
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickNext}>next anecdote</button>
      <h1>anecdote with most votes</h1>
      <p>Anecdote with the most votes:</p>
      {anecdotes[mostVote]}
      <p>has {points[mostVote]} votes</p>
    </div>
  )
}

export default App