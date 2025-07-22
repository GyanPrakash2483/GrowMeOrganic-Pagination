import './App.css'
import MainTable from './components/MainTable'

function App() {

  return (
    <>
      <header className='m-4'>
        <h1> GrowMeOrganic Pagination </h1>
      </header>
      <MainTable />
      <footer className='bg-gray-950 w-full p-12'>
        Made by <a href="https://gyanprakash.ct.ws">Gyan Prakash</a>
        <br />
        Contact: <a href="mailto:gyanprakash2483@gmail.com">gyanprakash2483@gmail.com</a>
      </footer>
    </>
  )
}

export default App
