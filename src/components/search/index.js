import './styles.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import GameCard from '../gamecard';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [games, setGames] = useState([]);
    const [searchedGames, setSearchedGames] = useState([]);
    const location = useLocation();

    const handleSubmit =  () => {
        setSearchedGames(games.filter(
            (game) => game.title.toLowerCase().includes(searchTitle.toLowerCase())
        ));
        // if(searchedGames.length === 0) {
        //     toast.error('No games found!');
        // }
    }

    useEffect(() => {
        console.log(location)
        if (location.state) {
            setGames(location.state.games);
            setSearchedGames(location.state.searchedGames);
            setSearchTitle(location.state.searchTitle);
        }
    }, [location]);


    return (
        <div className="home">
            <div className="search-bar">
                <input 
                    type="search"   
                    placeholder='Type game' 
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <button
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </div>
            <div className="search-result">
                {
                    (searchedGames.length > 0) ? (
                        searchedGames.map((game, idx) => (
                            <div className='user-info' key={`${idx}-${game.title}`}>
                                <h4 title='title'>{game.title}</h4>
                                <p title='platform'>{game.platform}</p>
                                <p title='score'>{game.score}</p>
                                <p title='genre'>{game.genre || 'nil'}</p>
                                <p title='editors_choice'>{game.editors_choice}</p>
                            </div>
                        ))
                    ) : (
                        <h1>No Games Found {`:(😭`}</h1>
                    )
                            
                }                
            </div>  
        </div>
    );
}

export default Search;