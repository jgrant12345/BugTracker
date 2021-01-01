import React from 'react';

class BugReport extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Completed: 0,
            Description: "",
            Title: ""

        }
    }

    handleChangeTitle = (event) => {
        this.setState({Title: event.target.value});
    }

    handleChangeDescription = (event) => {
        this.setState({Description: event.target.value})
    }

    handleSubmit = (event) => {
    var data = {Title: this.state.Title,
                    Description: this.state.Description,
                Completed: 0}
    
        console.log(data)
    
        // where I should put my fetch 
        fetch('/send',{
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


        event.preventDefault();
    }


    render(){
        return(
           <form onSubmit = {this.handleSubmit}>
               <label>
                   Title
                   <input type = "text" value = {this.state.Title} onChange = {this.handleChangeTitle} />
               </label>
               <label>
                   Description
                   <input type = "text" value = {this.state.Description} onChange = {this.handleChangeDescription} />
               </label>
               <input type = "submit" value = "Submit" />
           </form>
        )
    }
}
export default BugReport;