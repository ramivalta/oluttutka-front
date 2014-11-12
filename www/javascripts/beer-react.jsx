/** @jsx React.DOM */

require(['components/react/react-with-addons.js'], function(React) {
	
	'use strict';


	// Display the native navigation bar with the title "Hello World!"
	//steroids.view.navigationBar.show("React");

	// Set the WebView background color to white (effective on iOS only)
	//steroids.view.setBackgroundColor("#eee");


	window.addEventListener("message", function(event) {
		//steroids.logger.log("received message  " + JSON.stringify(event));		
		if (event.data.recipient == "beerView" && event.data.sender == "frontView") {
			//steroids.logger.log("event " + JSON.stringify(event));
			var beer = event.data.beer;
			
			React.render(<OlutInfo beer={beer} />, document.getElementById('content'));			
		}
	});	

	
	//var BEERS;
	
	//var ceres = new Asteroid("oluttutka.meteor.com");
	
	/*var futureValue = ceres.call("beersWithVenues");
	futureValue.result.then(function (values) {
		BEERS = _.sortBy(values, 'name');
	}, function (err) {
	});*/
	




	var OlutInfo = React.createClass({
		getInitialState: function() {
			return {
				beer: ''
			}
		},
		
		handleResults: function(beers, search) {
			/*this.setState({
				foundBeers: beers,
				searchTerms: search
			});*/
		},
		
		render: function() {
			var self = this;
			
			var beer = this.props.beer;

			return (
				<div>
					<div className='list card'>
						<div className='item item-avatar'>
							<img src="" width='240' height='240' alt="logo tai etiketti"></img>
							<h2>
								{beer.name}
							</h2>
						</div>
						<div className='item'>
							<p>
								{beer.style}
							</p>
							<p>
								{beer.brewery}
							</p>
							<p>
								{beer.country}
							</p>
							<p>
								{beer.venue.name}
							</p>
						</div>
					</div>
					
					<div className='row row-center'>
						<div className="col col-center center">
							<i className='icon ion-ios7-pulse-strong big-icon'></i>
						</div>
						<div className="col col-center center">
							<i className='icon ion-ios7-glasses-outline big-icon'></i>
						</div>
						<div className="col col-center center assertive">
							<i className='icon ion-ios7-heart assertive big-icon'></i>
						</div>
					</div>
				
					<div className='list'>
						<div className='item item-divider'>
							Samantyylisiä oluita
						</div>
						<div className='item'>
							Haha ei olee
						</div>
						<div className='item'>
							Haha ei olee
						</div>
						
					</div>
				

					<div className='list'>
						<div className='item item-divider'>
							Ilmoita saatavuudesta
						</div>
						<div className='item'>
							<button className='button button-block button-assertive'>
								Tätä olutta ei enää ole saatavilla
							</button>
						</div>
					</div>
				</div>	
			);
		}
	});
});
	
