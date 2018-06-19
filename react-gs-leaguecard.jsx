const Card = (props) => {
	return (
  <div style={{margin:'1em'}}>
		<img width="75" 
    	src = {"http://ddragon.leagueoflegends.com/cdn/8.10.1/img/profileicon/" +props.profileIconId + ".png"}/>
    <div style={{display:'inline-block',marginLeft:10}}>
    	<div style={{fontSize:'1.25em', fontWeight:'bold'}}>
        {props.name}
      </div>
      <div>{props.summonerLevel}</div>
    </div>
  </div>
  );
};

const CardList = (props) => {
	return(
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
};

class Form extends React.Component {
    state = {userName : '',
             apiKey : '------'}
  
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${this.state.userName}?api_key=${this.state.apiKey}`)
    	.then(resp => {
      	this.props.onSubmit(resp.data);
        this.setState({userName : ''});
      });
  };
  
	render() {
  	return(
    	<form onSubmit={this.handleSubmit}>
      	<input type="text" 
        	value={this.state.userName}
          onChange = { (event) => this.setState({userName: event.target.value})}
        	placeholder="League Username" required/>
        <button type="submit">Add card</button>
    	</form>
    );
  }
};

class App extends React.Component {
	state= {
  	cards : []
  };
  
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards : prevState.cards.concat(cardInfo)
    }));
  };
  
	render() {
  	return(
    	<div>
    	  <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards} />
    	</div>
    );
  }
}

ReactDOM.render(<App />, mountNode);