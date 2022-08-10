import '../style/Post.scss';
import { IPost } from '../types/types';

function Post({id, title, body}: IPost) {
    return (
      <div className="Post">
        <div className='Id'>{id}</div>
        <div className='Text'>{title}</div>
        <div className='Text'>{body}</div>
      </div>
    );
  }
  
export default Post;
  