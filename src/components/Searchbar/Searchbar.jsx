import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
    const [query, setQuery] = useState('');

    const onFormInput = (e) => {
        setQuery(e.currentTarget.value);
    }
    const formSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.warning('Enter your query');
            return;
        }
        onSubmit(query);
        setQuery('');
    }

    return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={formSubmit}>
                <button type="submit" className={s.SearchFormButton}>
                    <AiOutlineSearch />
                    <span className={s.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    onChange={onFormInput}
                    className={s.SearchFormInput}
                    type="text"
                    name='query'
                    value={query}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )

}
