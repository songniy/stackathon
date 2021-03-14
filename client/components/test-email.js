import React from 'react'
import axios from 'axios'

export class TestEmail extends React.Component{
  constructor(){
    super()
    this.state={email:'',template:'applicationApproved'}
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }
  handleSubmit(evt){
    evt.preventDefault
    axios.post(`/api/mailing?email=${this.state.email}&template=${this.state.template}`)
    this.setState({email:'',template:''})
  }
  handleChange(evt){
    this.setState({[evt.target.name]:evt.target.value})
  }
  render(){
    console.log(this.state)
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='email'>Email to Spam</label>
        <input type='text' value={this.state.email} name='email' onChange={this.handleChange}/>
        <div>
        <label htmlFor='template'>Choose a Template</label>
        <select onChange = {this.handleChange} name="template" >
          <option value="applicationApproved">Application Approved</option>
          <option value="applicationSubmitted">Application Submitted</option>
          <option value="scheduleReference">Schedule Reference</option>
        </select>
        </div>
        <button>Spam Now</button>
      </form></div>
    )
  }
}
