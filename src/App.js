import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import api from './api/posts';
import EditPost from "./EditPost";



function App() {
  const navigate=useNavigate();
  const [posts,setPosts]=useState([])
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')

  useEffect(()=>{
    const fetchProducts=async()=>{
      try {
        const response=await api.get('/posts')
        setPosts(response.data)
      } catch (error) {
        if(error.response){
        console.log(error.response.data)
        console.log(error.response.status)
        }else{
          console.log(`Error: ${error.message}`)
        }
      }
    }
    fetchProducts();
  },[])

  useEffect(()=>{
    const filteredResults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
  );

  setSearchResults(filteredResults.reverse())
  },[posts,search])

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const id=posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime=format(new Date(), 'MMM dd, yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody}
    try{
    const response=await api.post('/posts',newPost)
    const allPosts=[...posts,response.data]
    console.log(allPosts)
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
    }catch (error) {
      if(error.response){
      console.log(error.response.data)
      console.log(error.response.status)
      }else{
        console.log(`Error: ${error.message}`)
      }
    }
  }
  

  const handleDelete = async (id) => {
    try {
        console.log("Deleting post with ID:", id);
        await api.delete(`/posts/${id}`);
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate('/');
    } catch (error) {
      if(error.response){
      console.log(error.response.data)
      console.log(error.response.status)
      }else{
        console.log(`Error: ${error.message}`)
      }
    }
};

  const handleEdit=async(id)=>{
    const datetime=format(new Date(), 'MMM dd, yyyy pp');
    const updatedPost={id,title:editTitle,datetime,body:editBody}
    try {
      const response=await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post=>post.id===id ? {...response.data} : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
      
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }

  }

  return (
    <div className="App">
  <Header title={"social-media-app"}/>
  <Nav search={search} setSearch={setSearch}/>
  <Routes >
      <Route path="/" element={<Home posts={searchResults}/>}/>
      <Route path="post" >
      <Route index element={ <NewPost 
      handleSubmit={handleSubmit} 
      postBody={postBody} 
      setPostBody={setPostBody} 
      postTitle={postTitle} 
      setPostTitle={setPostTitle}/>}
      />
      <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/> }/>
      </Route>

      <Route path="/edit/:id" element={<EditPost 
      posts={posts} 
      handleEdit={handleEdit}
      editBody={editBody} 
      setEditBody={setEditBody} 
      editTitle={editTitle} 
      setEditTitle={setEditTitle}
      />}/>

      <Route path="about" element={<About/>}/>
      <Route path="*" element={<Missing/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
