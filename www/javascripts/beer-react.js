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
			
			React.render(React.createElement(OlutInfo, {beer: beer}), document.getElementById('content'));			
		}
	});	

	
	//var BEERS;
	
	//var ceres = new Asteroid("oluttutka.meteor.com");
	
	/*var futureValue = ceres.call("beersWithVenues");
	futureValue.result.then(function (values) {
		BEERS = _.sortBy(values, 'name');
	}, function (err) {
	});*/
	




	var OlutInfo = React.createClass({displayName: 'OlutInfo',
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
				React.createElement("div", null, 
					React.createElement("div", {className: "list card"}, 
						React.createElement("div", {className: "item item-avatar"}, 
							React.createElement("img", {src: "", width: "240", height: "240", alt: "logo tai etiketti"}), 
							React.createElement("h2", null, 
								beer.name
							)
						), 
						React.createElement("div", {className: "item"}, 
							React.createElement("p", null, 
								beer.style
							), 
							React.createElement("p", null, 
								beer.brewery
							), 
							React.createElement("p", null, 
								beer.country
							), 
							React.createElement("p", null, 
								beer.venue.name
							)
						)
					), 
					
					React.createElement("div", {className: "row row-center"}, 
						React.createElement("div", {className: "col col-center center"}, 
							React.createElement("i", {className: "icon ion-ios7-pulse-strong big-icon"})
						), 
						React.createElement("div", {className: "col col-center center"}, 
							React.createElement("i", {className: "icon ion-ios7-glasses-outline big-icon"})
						), 
						React.createElement("div", {className: "col col-center center assertive"}, 
							React.createElement("i", {className: "icon ion-ios7-heart assertive big-icon"})
						)
					), 
				
					React.createElement("div", {className: "list"}, 
						React.createElement("div", {className: "item item-divider"}, 
							"Samantyylisiä oluita"
						), 
						React.createElement("div", {className: "item"}, 
							"Haha ei olee"
						), 
						React.createElement("div", {className: "item"}, 
							"Haha ei olee"
						)
						
					), 
				

					React.createElement("div", {className: "list"}, 
						React.createElement("div", {className: "item item-divider"}, 
							"Ilmoita saatavuudesta"
						), 
						React.createElement("div", {className: "item"}, 
							React.createElement("button", {className: "button button-block button-assertive"}, 
								"Tätä olutta ei enää ole saatavilla"
							)
						)
					)
				)	
			);
		}
	});
});
