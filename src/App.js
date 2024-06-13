import { Route, Routes } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { useState } from "react";


function App() {
  const [posts,setPosts]=useState([
    {
      id:1,
      title:"my first post",
      datetime:"hjhcfc",
      body:"hello i completed my project today"
    },
    {
      id:2,
      title:"my first post",
      datetime:"hjhcfc",
      body:"hello i completed my project today"
    },
    {
      id:3,
      title:"my first post",
      datetime:"hjhcfc",
      body:"hello i completed my project today"
    },
    {
      id:4,
      title:"my first post",
      datetime:"hjhcfc",
      body:"hello i completed my project today"
    }
  ])
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  return (
    <div className="App">
  
      <Header title={"social-media-app"} />
      <Nav search={search} setSearch={setSearch}/>
      <Home posts={posts}/>
      <NewPost/>
      <PostPage/>
      <About/>
      <Missing/>
      <Footer/>
    </div>
  );
}

export default App;
