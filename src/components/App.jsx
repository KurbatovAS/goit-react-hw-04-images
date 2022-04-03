import {useState} from 'react';
import { ToastContainer } from 'react-toastify';
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

function App () {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);

  function searchHandler (searchQuery, page) {
    setSearchQuery(searchQuery);
    setPage(page);
  }

    return (
      <div className={s.App}>
        <Searchbar onSubmit={searchHandler} />
        <ImageGallery searchQuery={searchQuery} page={page} setPage={setPage} pictures={pictures} setPictures={setPictures} />        
        <ToastContainer autoClose={3000} />
      </div>
    );
}

export default App;