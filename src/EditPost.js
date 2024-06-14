import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const EditPost = ({posts,handleEdit,editBody,editTitle,setEditBody,setEditTitle}) => {
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id);

    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditBody,setEditTitle])
    

  return (
    <main className='post-body'>
        {editTitle && 
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

     {!editTitle &&
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
