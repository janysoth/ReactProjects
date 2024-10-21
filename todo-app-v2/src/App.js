import './App.css';
import AddNewTodo from './components/AddNewTodo';
import Calendar from './components/Calendar';
import EditToDo from './components/EditTodo';
import Header from './components/Header';
import Main from './components/Main';
import Projects from './components/Projects';
import Todos from './components/Todos';
import User from './components/User';

function App() {
  return (
    <div className='App'>
      <Header>
        <User />
        <AddNewTodo />
        <Calendar />
        <Projects />
      </Header>
      <Main>
        <Todos />
        <EditToDo />
      </Main>
    </div>
  );
}

export default App;
