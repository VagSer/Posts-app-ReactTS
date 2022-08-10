import '../style/Header.scss'

function Header({SortPosts} : any) {
    return (
        <div className="Header">
            <div className='Id'>
                    <button onClick={() => {
                        SortPosts('id')
                        }} className='Header__Button'>
                        ID
                        </button>
            </div>
            <div className='Text'>
            <button onClick={() => {
                        SortPosts('title')
                        }} className='Header__Button'>Заголовок</button>
            </div>
            <div className='Text'>
                    <button onClick={() => {
                        SortPosts('body')
                        }} className='Header__Button'>Описание</button>
            </div>
      </div>
    )
}

export default Header