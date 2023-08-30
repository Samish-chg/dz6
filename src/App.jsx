import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import AddPost from "./components/AddPost.jsx";
import Post from "./components/Post.jsx";

function App() {

    const [customPosts, setCustomPosts] = useState([])
    const [customCatImage,setCustomCatImage] = useState("")
    const [customUsedImages, setcustomUsedImages] = useState([])

    useEffect(()=> {
        axios.get('https://cataas.com/cat')
            .then(({data:newImage})=>{
                setCustomCatImage(newImage)
            })
            .catch(Error=>{
                console.error("Ошибка при загрузке картинки",Error)
            })
    },[])

    const AddCustomPost = (newPost,newImage)=>{
        setCustomPosts(posts => [...posts,newPost]);
        setCustomCatImage(newImage)
        setcustomUsedImages(images=>[...images,newImage])
    }


    const editCustomPost=(postId,updatedPost) =>{
        setCustomPosts(posts=>
            posts.map(post=>
                post.id===postId ? {...post,...updatedPost}:post))

    }

    const deleteCustomPost = postId=>{
        setCustomPosts(posts=>posts.filter(post=>post.id!==postId))
    }

    return (
        <>
            <h1>Cats Api Homework</h1>
            <AddPost
                onAddPost={AddCustomPost}
                currentCatImage={customCatImage}
                setCurrentCatImage={setCustomCatImage}
                usedImages={customUsedImages}

            />
            <div>
                {customPosts.map(post=>(
                    <Post
                        key={post.id}
                        post={post}
                        currentCatImage={post.image}
                        description={post.description}
                        onEditPost={editCustomPost}
                        onDeletePost={deleteCustomPost}

                    />
                ))}
            </div>
        </>
    )
}

export default App
