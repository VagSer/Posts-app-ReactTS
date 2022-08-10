import '../style/Pagination.scss'
import { Link } from 'react-router-dom'

function Pagination({pagesArray, changePage, page, totalPages} : any){
    return (
        <div className='Pagination'>
          <Link to={`/${page-1}`}
            className='TextButton'
            onClick={() => changePage(page-1)}
            style={page===1? {visibility: 'hidden'} : {visibility: 'visible'}}
            >Назад
          </Link>
          <div className='Buttons'>
          {pagesArray.map((p:number) => 
          <Link to={`/${p}`} 
            className={p === page? 'CurrentPageButton' : 'PageButton'}
            key={p}
            onClick={() => changePage(p)}
          >{p}</Link>)}
          </div>
          <Link to={`/${page+1}`}
            className='TextButton'
            style={page===totalPages? {visibility: 'hidden'} : {visibility: 'visible'}}
            onClick={() => changePage(page+1)}
          >Далее
          </Link>
        </div>
    )
}

export default Pagination