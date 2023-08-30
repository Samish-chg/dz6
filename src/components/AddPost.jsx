import React, {useState} from "react";
import axios from "axios";



const AddPost =({onAddPost,currentCatImage,setCurrentCatImage,usedImages})=>{
const [customTitle,setCustomTitle]=useState("")
    const handleAddClick=()=>{
    axios.get('https://cataas.com/cat')
        .then(response=>{
            const newImage=response.data
            if (!usedImages.includes(newImage)) {
                setCurrentCatImage(newImage)
                const newPost={
                    id:Date.now(),
                    title:customTitle,
                    description:"",
                    image:newImage
                }
                onAddPost(newPost,newImage)
                setCustomTitle('')
            }else {
                alert("Эта картина используется.Выбери другую")
            }

        })
        .catch(error=>{
            console.error("Ошибка", error)})
    }

const handleTitleChange=e=>{
    setCustomTitle(e.target.value)
    setCurrentCatImage('https://cataas.com/cat')
}

    return(
        <>
<div>
    <input value={customTitle } onChange={handleTitleChange} type="text"/>
    <div>
        <img src={currentCatImage} alt=""/>
    </div>
    <button onClick={handleAddClick}> Add post </button>

</div>

        </>
    )
}
export default AddPost;