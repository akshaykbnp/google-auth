import './App.css'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'

function App() {

  return (
    <>
      <h1>Implementing Google OAuth in MERN</h1>
      <div className="center">
        <Login />
      </div>
      <div className="center">
        <Logout />
      </div>

    </>
  )
}

export default App
