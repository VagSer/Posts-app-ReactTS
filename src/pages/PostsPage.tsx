import '../style/App.scss';
import React, { useState, useEffect, useMemo } from 'react';
import PostList from '../components/PostList';
import {IPost} from '../types/types';
import SearchInput from '../components/SearchInput';
import PostService from '../API/PostService';
import Header from '../components/Header'
import Pagination from '../components/Pagination';
import {useParams} from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

function PostsPage() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSort, setSelectedSort] = useState('id')
  const [sortedPosts, setSortedPosts] = useState([...posts])
  const [totalPages, setTotalPages] = useState(0)
  const limit = 10
  const {number} = useParams()
  const [page, setPage] = useState(Math.abs(Number(number)) || 1) 

  const changePage = (page: number) => {
    setPage(page)
}
  
  async function fetchPosts() {
    setIsLoading(true)
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    setSortedPosts(response.data)
    const totalCount = +response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
    setIsLoading(false)
  }

  let pagesArray = []
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1)
  }

  function SortPosts(sortOption: string) {
    if (selectedSort === sortOption)
      setSortedPosts([...sortedPosts].reverse())
    else {
      setSelectedSort(sortOption)
      switch(sortOption) {
        case 'id':
          setSortedPosts([...sortedPosts].sort((a, b) => a.id - b.id));
          break;
        case 'title':
          setSortedPosts([...sortedPosts].sort((a, b) => a.title.localeCompare(b.title)));
          break;
        case 'body':
          setSortedPosts([...sortedPosts].sort((a, b) => a.body.localeCompare(b.body)));
          break;
      }
    }
  }

  function getPageCount(totalPages : number, limit: number) : number {
    if (Number(number) > Math.ceil(totalPages / limit)) setPage(Math.ceil(totalPages / limit))
    return Math.ceil(totalPages / limit)
}

  useEffect(() => {
    fetchPosts()
  }, [page])

  const sortedAndSeachedPosts = useMemo( () => {
    return sortedPosts.filter(post => post.id === +searchQuery || post.id.toString().includes(searchQuery) || post.title.includes(searchQuery) || post.body.includes(searchQuery))
  }, [searchQuery, sortedPosts])

  return (
    <div className="App">
      <SearchInput 
        type='text'
        value={searchQuery}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        placeholder='Поиск'
      />
      <Header SortPosts={SortPosts}/>
      {isLoading
        ? <div className='Loader'> <TailSpin color="#7EBC3C" height={100} width={100} /> </div>
        : <div>
          {sortedAndSeachedPosts.length === 0? 
      <h2>Постов нет :(</h2> 
      : 
      <PostList posts={sortedAndSeachedPosts} />}
      <Pagination pagesArray={pagesArray} changePage={changePage} page={page} totalPages={totalPages}/>
          </div>
        
        
        }
    </div>
  );
}

export default PostsPage;