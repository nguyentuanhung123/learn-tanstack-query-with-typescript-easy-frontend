import '~/App.css'

const App = () => {
  const handleLogin = () => {
    alert('Login')
  }

  return (
    <div>
      <h1>App is running</h1>
      <button onClick={handleLogin}>Click</button>
    </div>
  )
}

export default App
