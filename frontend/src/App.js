import { useState,useEffect } from 'react'
import axios from 'axios'

import './App.css'

async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    console.log(result.imagePath)
    //It still have bugs here, we want an array of image path to store in the images state
    setImages([result.imagePath, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
    console.log(file)
	}

useEffect(()=>{
  console.log(images)
})

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>
      {images.length===0?<h1>None</h1>:<h2>Have</h2>}

      {images&& images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}

    </div>
  );
}

export default App;
