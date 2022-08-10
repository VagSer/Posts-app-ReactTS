import '../style/SearchInput.scss';

function SearchInput(props: any) {
    return(<div className="SearchForm">
        <input {...props} 
        className="SearchText"
        />
        <button type="submit" className = 'SearchButton'/>
    </div>)
}

export default SearchInput