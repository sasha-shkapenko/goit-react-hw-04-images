import { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        query: '',
    }
    onFormInput = (e) => {
        this.setState({ query: e.currentTarget.value });
    }
    formSubmit = (e) => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            toast.warning('Enter your query');
            return;
        }
        this.props.onSubmit(this.state.query);
        this.setState({ query: "" });
    }
    render() {
        return (
            <header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={this.formSubmit}>
                    <button type="submit" className={s.SearchFormButton}>
                        <AiOutlineSearch />
                        <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        onChange={this.onFormInput}
                        className={s.SearchFormInput}
                        type="text"
                        name='query'
                        value={this.state.query}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }

}
export default Searchbar;