import { useState } from 'react'

const RandomAnecdote = ({ anecdotes, setSelected }) => {
  const random = (mn, mx) => {
    return Math.random() * (mx - mn) + mn
  }

  const getValueFromRange = (anecdotes) => {
    return Math.floor(random(0, anecdotes.length))
  }

  return (
    <button onClick={() => setSelected(getValueFromRange(anecdotes))}>
      Next anecdote
    </button>
  )
}

const VoteButton = ({ selected, points, setPoints }) => {
  const castVote = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  return <button onClick={() => castVote(selected)}>Vote</button>
}

const MostVoted = ({ anecdotes, points }) => {
  if (Math.max(...points) === 0) {
    return <p>No votes casted yet...</p>
  }

  const mostVoted = Math.max(...points)
  const mostVotedIndex = points.findIndex((point) => point === mostVoted)

  return <p>{anecdotes[mostVotedIndex]}</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <RandomAnecdote setSelected={setSelected} anecdotes={anecdotes} />
      <VoteButton selected={selected} points={points} setPoints={setPoints} />

      <h2>Anecdote with most votes</h2>
      <MostVoted anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App
