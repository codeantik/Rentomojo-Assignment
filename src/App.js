import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Header from './components/header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


export const config = {
    baseUrl: 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json',
}

const App = () => {

  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGames = async () => {
    setIsLoading(true);
      try {
          const response = await axios.get(`${config.baseUrl}`);
          console.log(response.data);
          setGames(response.data.slice(1, response.data.length));
          setIsLoading(false);
          toast.success('Games fetched successfully!');
      }
      catch (error) {
          setIsLoading(false);
          console.log(error);
          toast.error('Could not fetch games!');
      }
  }

  useEffect(() => {
      console.log(config)
      getGames()
  }, []);

    return (
        <div>
            <Header />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route 
                  exact 
                  path="/" 
                  element={
                  <Home        
                    games={games}
                    setGames={setGames} 
                    isLoading={isLoading} 
                    />
                  } 
                />
                <Route exact path="/about" element={<About />} />
                <Route path="*" element={<h1 className='not-found'>Not Found</h1>} />
            </Routes>
        </div>
    );
}

export default App;