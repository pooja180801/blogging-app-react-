import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

const PostPage = () => {
  const {id}=useParams();
  const post=posts.find(post=>(post.id).toString()===id);
  const {posts,handleDelete}=useContext(DataContext)
  return (
    <main className='postPage'>
      <article className='post'>
        {post &&
        <>
        <h2>{post.title}</h2>
        <p className='postDate'>{post.datetime}</p>
        <p className='postBody'>{post.body}</p>
        <Link to={`/edit/${post.id}`}><button className='edit'>Edit Post</button></Link>
        <button className='delete' onClick={()=>handleDelete(post.id)}>Delete Post</button>
        </>
        }

        {!post &&
      <main className='missing'>
      <h2>Page not found</h2>
      <p>Well,that's disappointing</p>
      <p><Link to="/">Visit Our HomePage</Link></p>
      </main>
        }

      </article>
        
    </main>
  )
}

export default PostPage
