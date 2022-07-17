import './styles.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { GrAscend, GrDescend } from 'react-icons/gr';

const Home = ({ games, setGames, isLoading }) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [searchedGames, setSearchedGames] = useState([]);

    const handleSubmit =  () => {
        if(searchTitle.length === 0) {
            toast.error('Please enter a game title!');
            return;
        }
        const filteredGames = games.filter(
            (game) => game.title.toLowerCase().includes(searchTitle.toLowerCase())
        )

        setSearchedGames(filteredGames);
        // navigate('/search', { state: { games, searchedGames, searchTitle } });
    } 

    const handleCompare = (a, b) => {
        a = selectedSort === 'score' ? a[selectedSort] : a[selectedSort].toLowerCase();
        b = selectedSort === 'score' ? b[selectedSort] : b[selectedSort].toLowerCase();

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

    const handleSort = (type) => {
        console.log('selected option', selectedSort);
        
        if (!selectedSort || selectedSort.length === 0) {
            toast.error('Please select a sort option!');
            return;
        }
        
        const sortedGames = searchedGames.length > 0 ? [...searchedGames] : [...games]; // to re-render possible
        
        if (type === 'ascending') {
            sortedGames.sort(handleCompare);
            console.log('ascending', sortedGames)
            if(searchedGames.length > 0) {
                setSearchedGames(sortedGames);
            }
            else {
                setGames(sortedGames);
            }
        } else {
            sortedGames.sort(handleCompare).reverse();
            console.log('descending', sortedGames)
            if(searchedGames.length > 0) {
                setSearchedGames(sortedGames);
            }
            else {
                setGames(sortedGames);
            }
        }

        selectedSort('');
    }

    // useEffect(() => {
    //     setSearchedGames(games);
    // }, [])


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
            <div className='sorting-options'>
                <h4>Sort by: </h4>
                <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
                    <option value=''>Choose an option</option>
                    <option value='title'>Title</option>
                    <option value='platform'>Platform</option>
                    <option value='score'>Score</option>
                    <option value='genre'>Genre</option>
                </select>
                <div className="sorting-btns">
                <button onClick={() => handleSort('ascending')} >
                    <GrAscend  />
                </button>
                <button onClick={() => handleSort('descending')}>
                    <GrDescend />
                </button>
                </div>  

            </div>
            <div className="search-result">
                {isLoading && <h2 className='search-not-found'>Loading...</h2>}
                {/* {games?.map((game, idx) => (
                    <div className='user-info' key={`${idx}-${game.title}`}>
                        <h4 title='title'>{game.title}</h4>
                        <p title='platform'>{game.platform}</p>
                        <p title='score'>{game.score}</p>
                        <p title='genre'>{game.genre || 'nil'}</p>
                        <p title='editors_choice'>{game.editors_choice}</p>
                    </div>
                ))}               */}
                {
                    (searchTitle.length > 0) ? (
                        searchedGames.length > 0 ? (
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
                            <h2 className='search-not-found'>No results found!</h2>
                        )
                    ) : (
                        games.map((game, idx) => (
                            <div className='user-info' key={`${idx}-${game.title}`}>
                                <h4 title='title'>{game.title}</h4>
                                <p title='platform'>{game.platform}</p>
                                <p title='score'>{game.score}</p>
                                <p title='genre'>{game.genre || 'nil'}</p>
                                <p title='editors_choice'>{game.editors_choice}</p>
                            </div>
                        ))
                    )
                }
            </div>  
        </div>
    );
}

export default Home;