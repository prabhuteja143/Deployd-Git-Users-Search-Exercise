import React, { Component } from 'react'
import User from './components/User'
import './App.css';
import Loading from './components/Loading'
import Header from './components/Header'
import gitlogo from './images/github-logo.png'
import userIcon from './images/user-icon.png'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false
    }
  }
  getUser = () => {
    this.setState({
      loading: true
    })
    const name = this.refs.name.value;

    setTimeout( () => {
      fetch(`http://api.github.com/users/${name}`)
      .then(response => response.json())
      .then(data => {

        this.setState({
          user: data,
          loading: false
        });

      })
    },1000)
  }
  render() {   
    const name = this.state.user.name 
       let userProfile;
    if( this.state.loading === true)  {
       userProfile = <div className='loading-user-card'><Loading /></div>
    }
    else if(this.state.user.length === 0){
      userProfile = <div className="git-logo"><img src={gitlogo} alt="GitHub Logo" /><p>Welcome to Git User Search</p></div>
    }
    else if(this.state.user.name === null){
      userProfile = <div className="git-logo"><img src={userIcon} alt="No User Found!" /><p>No User Found!</p></div>
    }
    else if (name) {
      userProfile = <User user={this.state.user} />
    }
    return (
      <div className="App">
        <Header/>
        <div className="whole-container">
        <div className="wrapper">
          <div id='search-bar'>
            <input type="text" autoComplete="on" placeholder='Enter user name' ref="name" />
            <button className='searchButton' onClick={this.getUser}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        {userProfile}
        </div>
      </div>
    );
  }
}

export default App;
