const [questions,setQuestions] = useState([]);
const [questionNumber, setQuestionNumber] = useState(1);
const [turn, setTurn] = useState(0);
useEffect(() => {
   fetch('http://localhost:3001/trivia')
   .then(response => response.json())
   .then(res => {
    setQuestions(res);
   })
   .catch(err => console.log(err));
},[]);

return (
  <Board data={questions} questionNumber={questionNumber}/>
);