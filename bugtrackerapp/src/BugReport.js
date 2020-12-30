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
    var JSONObject = {Title: this.state.Title,
                    Description: this.state.Description}
        console.log(JSONObject)

        // where I should put my fetch 
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