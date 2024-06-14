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



function App() {
  const navigate=useNavigate();
  const [posts,setPosts]=useState([
    {
      id:1,
      title:"my first post",
      datetime:"Jun 13, 2024 6:36:44 PM",
      body:"hello i completed my project today"
    },
    {
      id:2,
      title:"my first post",
      datetime:"Jun 13, 2024 6:43:44 PM",
      body:"hello i completed my project today"
    },
    {
      id:3,
      title:"my first post",
      datetime:"Jun 13, 2024 6:23:44 PM",
      body:"hello i completed my project today"
    },
    {
      id:4,
      title:"my first post",
      datetime:"Jun 13, 2024 6:13:44 PM",
      body:"hello i completed my project today"
    }
  ])
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')

  useEffect(()=>{
    const filteredResults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
  );

  setSearchResults(filteredResults.reverse())
  },[posts,search])

  const handleSubmit=(e)=>{
    e.preventDefault()
    const id=posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime=format(new Date(), 'MMM dd, yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody}
    const allPosts=[...posts,newPost]
    console.log(allPosts)
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }


  return (
    <div className="App">
  <Header title={"social-media-app"}/>
  <Nav search={search} setSearch={setSearch}/>
  <Routes>
      <Route path="/" element={<Home posts={searchResults}/>}/>
      <Route path="post" />
      <Route index element={ <NewPost 
      handleSubmit={handleSubmit} 
      postBody={postBody} 
      setPostBody={setPostBody} 
      postTitle={postTitle} 
      setPostTitle={setPostTitle}/>}
      />
      <Route path="id" element={<PostPage />}/>

      <Route path="about" element={<About/>}/>
      <Route path="*" element={<Missing/>}/>
      {/* <PostPage/>   */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
