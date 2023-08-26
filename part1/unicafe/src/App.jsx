import { useState } from 'react';

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>
const StatisticLine = (props)=> {
  return(
  <table className='table-statistics'>
    <tbody>
      <tr> 
        <th>{props.text}:</th> 
        <td>{props.value}</td> 
      </tr>
    </tbody>
  </table>
  )
}
const Statistics = ({good,bad,neutral, total}) => {
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
  <>
    <StatisticLine text='good' value={good}/>
    <StatisticLine text='neutral' value={neutral}/>
    <StatisticLine text='bad' value={bad}/>
    <StatisticLine text='all' value={total}/>
    <StatisticLine text='average' value={(good-bad)/total}/>
    <StatisticLine text='positive' value={`${(good/total)*100} %`}/>
  </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClickGood =()=> {
    const updatedGood = good+1
    setGood(updatedGood)
    setTotal(updatedGood+neutral+bad)
  }
  const handleClickNeutral =()=> {
    const updatedNeutral=neutral+1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral+good+bad)
  }
  const handleClickBad =()=> {
    const updatedBad=bad+1
    setBad(updatedBad)
    setTotal(updatedBad+good+neutral)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text='Good'/>
      <Button handleClick={handleClickNeutral} text='Neutral'/>
      <Button handleClick={handleClickBad} text='Bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
    </div>
  )
}

export default App