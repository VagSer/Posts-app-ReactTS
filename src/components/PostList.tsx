import { IPost } from "../types/types"
import Post from './Post'
import '../style/Post.scss';

interface PostListProps {
    posts: IPost[]
}
function PostList({posts}: PostListProps){
    return (
        <div>
            {posts.map(post => 
                <Post key={post.id} id={post.id} title={post.title} body={post.body}/>
                )}
        </div>
    )
}

export default PostList