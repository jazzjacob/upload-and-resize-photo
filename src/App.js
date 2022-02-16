import styles from './app.module.css'
import { useRef,  useState } from 'react'
import Resizer from 'react-image-file-resizer'

function App() {
  const [selectedImage, setSelectedImage] = useState('')
  const inputRef = useRef()

  function fileChangedHandler(event) {
    let fileInput = false
    if (event.target.files[0]) {
      fileInput = true
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          1000,
          1000,
          'JPEG',
          100,
          0,
          (uri) => {
            console.log(uri)
            setSelectedImage(uri)
          },
          'base64',
          200,
          200
        )
      } catch (err) {
        console.log(err)
      }
    }
  }

  function resetInput() {
    setSelectedImage('')
    inputRef.current.value = null
  }

  function handleSubmit(e) {
    // Send to backend here
    e.preventDefault()
    alert('Image uri data to backend: ' + selectedImage)
    resetInput()
  }
  
  return (
    <>
      <form className={styles.newSolutionContainer} onSubmit={handleSubmit}>
        <p>Select a photo to upload</p>
        <input ref={inputRef} type='file' onChange={fileChangedHandler} accept='image/*' />
        {selectedImage && (
          <>
            <button
              style={{ color: 'red', fontWeight: 'bold' }}
              onClick={resetInput}
            >Remove</button>

            <div className={styles.imageContainer}>
              <img src={selectedImage} alt='Uploaded image' className={styles.image} />
            </div>
            <button
              style={{ color: 'green', fontWeight: 'bold' }}
            >Upload and continue</button>
          </>
        )}
      </form>
    </>
  );
}

export default App;
