import {useState} from 'react';
import { ToastContainer } from 'react-toastify';
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

function App () {
  const [searchQuery, setSearchQuery] = useState('');

    return (
      <div className={s.App}>
        <Searchbar onSubmit={setSearchQuery} />
        <ImageGallery searchQuery={searchQuery} />        
        <ToastContainer autoClose={3000} />
      </div>
    );
}

export default App;