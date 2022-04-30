import './App.css';
import DisplayTodos from './components/DisplayTodos';
import Todos from './components/Todos';

function App() {
  return (
    <div className='App'>
      <Todos />
      <DisplayTodos />
    </div>
  );
}

export default App;
