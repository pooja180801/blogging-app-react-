import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import DataContext from './context/DataContext';

const EditPost = () => {
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id);
    const {posts,handleEdit,editBody,editTitle,setEditBody,setEditTitle}=useContext(DataContext)

    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditBody,setEditTitle])
    

  return (
    <main className='post-body'>
        {post && 
        <>
        <h2>Edit Post</h2>
        <form className='new-post-form' onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="postTitle">Edit Title:</label>
          <input type="text"
          id='postTitle'
          required
          value={editTitle}
          onChange={(e)=>setEditTitle(e.target.value)}
          />

          <label htmlFor="postBody">Edit Post:</label>
            <textarea id="postBody"
            required
            value={editBody}
            onChange={(e)=>setEditBody(e.target.value)}
            >
            </textarea>
          <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>

        </form>
        </>
        }

     {!post &&
      <main className='missing'>
      <h2>Page not found</h2>
      <p>Well,that's disappointing</p>
      <p><Link to="/">Visit Our HomePage</Link></p>
      </main>
        }

    </main>
  )
}

export default EditPost
