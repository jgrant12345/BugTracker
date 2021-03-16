import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import BugReport from '../BugReport'
import React, {useState} from 'react'


function handleSubmit(title,description) {
  var data = {Title: title,
              Description: description,
              Completed: 0}
  

      // where I should put my fetch 
      fetch('/posts',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
      })
      .catch((error) => {
          console.error("Error: ", error)
      })
      console.log(title)
     
   
     
  }









function MyVerticallyCenteredModal(props) {
  const [completed, setCompleted] = useState(0);
  const [description, setDescription] = useState(0);
  const [title,setTitle] = useState(0);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Submit a Bug
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          <form onSubmit = {handleSubmit}>
        <label className = "TitleInputBox">
            Title
            <input type = "text"  value = {title} onChange = {(event) => {setTitle(event.target.value)}} />
        </label>
        <label>
            Description
            <textarea  className = "DescriptionSize" value = {description} onChange = {(event) => {setDescription(event.target.value)}} />
        </label>
        <input type = "submit" value = "Submit" />
         </form>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide
        }>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  function Example() {
    const [show, setShow] = useState(false);
    const [completed, setCompleted] = useState(0);
    const [description, setDescription] = useState("");
    const [title,setTitle] = useState("");
    const handleClose = () => {
      handleSubmit()
      setShow(false);}
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit = {handleSubmit}>
        <label className = "TitleInputBox">
            Title
            <input type = "text"  value = {title} onChange = {(event) => {setTitle(event.target.value)}} />
        </label>
        <label>
            Description
            <textarea  className = "DescriptionSize" value = {description} onChange = {(event) => {setDescription(event.target.value)}} />
        </label>
        <input type = "submit" value = "Submit" />
         </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShow(false);
              handleSubmit(title,description);
            }}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default Example;