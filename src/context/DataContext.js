import { createContext,useState,useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize"
import useAxiosFetch from "../hooks/useAxiosFetch";
import { format } from 'date-fns';
import api from '../api/posts';
import { useNavigate } from "react-router-dom";

const DataContext=createContext({})

export const DataProvider=({children})=>{
  const navigate=useNavigate();
  const [posts,setPosts]=useState([])
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const {width}=useWindowSize()
  const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:3500/posts')


  // useEffect(()=>{
  //   const fetchProducts=async()=>{
  //     try {
  //       const response=await api.get('/posts')
  //       setPosts(response.data)
  //     } catch (error) {
  //       if(error.response){
  //       console.log(error.response.data)
  //       console.log(error.response.status)
  //       }else{
  //         console.log(`Error: ${error.message}`)
  //       }
  //     }
  //   }
  //   fetchProducts();
  // },[])

  useEffect(()=>{
    const filteredResults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
  );

  setSearchResults(filteredResults.reverse())
  },[posts,search])


  useEffect(()=>{
    setPosts(data)
  },[data])

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

    return(
        <DataContext.Provider value={{
            width,search,setSearch,searchResults,fetchError,isLoading,handleSubmit,postTitle,setPostTitle,postBody,setPostBody,posts,handleDelete
            ,handleEdit,editBody,editTitle,setEditBody,setEditTitle

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext