import {useState} from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar ({onSubmit}) {
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = e => 
    setInputValue(e.target.value.toLowerCase());

  const formSubmitHandler = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return toast.error('Enter your request, please');
    }

    onSubmit(inputValue);
    setInputValue('');
  };

    return (
      <>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={formSubmitHandler}>
            <button type="submit" className={s.SearchFormButton}>
              <RiSearch2Line className={s.SearchFormIcon} />
            </button>

            <input
              className={s.SearchFormInput}
              type="text"
              name="searchInput"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={inputValue}
              onChange={inputChangeHandler}
            />
          </form>
        </header>
      </>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
