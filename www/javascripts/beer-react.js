'use strict';

steroids.view.setBackgroundImage("/images/barley_small2.jpg");

var deviceready = false, steroidsready = false;

steroids.on("ready", function () {
	steroidsready = true;
	//onLoad();
});

document.addEventListener('deviceready', function () {
	deviceready = true;
	if (device.platform === 'Android') {
		$('#background').addClass('bg-android');
	}	
	//onLoad();
}, false);


window.addEventListener("message", function(event) {
	//$('html, body').animate({ scrollTop: 0}, 550);	
	
	$('html, body').scrollTop(0);
	
	if (event.data.recipient == "beerView" && event.data.sender == "frontView") {
	
		var interval = setInterval(function() {
			if (deviceready && steroidsready) {
				clearInterval(interval);
				
				var beer = event.data.beer;
				//steroids.view.navigationBar.show(beer.name);
				steroids.logger.log("in beerinfo view");

				var OlutInfo = React.createClass({displayName: 'OlutInfo',
					getInitialState: function() {
						return {}
					},
					
					componentWillMount: function () {
					},
					
					componentDidMount: function () {
						steroids.logger.log("DID MOUNT");
						
						var beerinfo = $(this.refs['beerinfo'].getDOMNode());
						var bottom = $(this.refs['beerinfo_bottom'].getDOMNode());
						
						var h = beerinfo.css('height');
						
						steroids.logger.log("setting to " + h);
						steroids.logger.log("offset pos " + h);
						
						bottom.css({'marginTop' : h });
					},
					
					componentDidUpdate: function () {
						steroids.logger.log("beerinfo component updated");
						
						/*var beerinfo = $(this.refs['beerinfo'].getDOMNode());
						var bottom = $(this.refs['beerinfo_bottom'].getDOMNode());
						
						var h = beerinfo.css('height');
						steroids.logger.log("offset pos " + h);
						bottom.css({'marginTop' : h + 'px' });						
						*/
					},

					render: function() {
						var self = this;
						var beer = this.props.beer;

						return (
							React.createElement("div", {className: "content"}, 
								React.createElement("div", {className: "item translucent title", ref: 'beerinfo'}, 
									React.createElement("div", {className: "border-bottom center"}, 
										React.createElement("h2", null, 
											beer.name
										)
									), 
									React.createElement("div", {className: "row"}, 
										React.createElement("div", {className: "col col-50 border-right center beer-info"}, 
											React.createElement("h3", null, 
												beer.brewery
											), 
											React.createElement("h3", null, 
												beer.country
											)
										), 
										React.createElement("div", {className: "col col-50 center beer-info"}, 
											React.createElement("h3", null, 
												beer.abv, "%"
											), 
											React.createElement("h3", null, 
												beer.style
											)
										)
									)
								), 
								
								React.createElement("div", {className: "list", id: "beerinfo-content", ref: 'beerinfo_bottom'}, 
									React.createElement("div", {className: "item item-divider subheader"}, 
										"Kuvaus"
									), 

									React.createElement("div", {className: "item beerdetails-item translucent"}, 
										React.createElement("span", null, beer.description)
									), 

									React.createElement("div", {className: "item item-divider subheader"}, 
										"Saatavuus"
									), 
									beer.venues.map(function(i) {
										return (
											React.createElement("div", {className: "item beer-info translucent", key: i._id}, 
												React.createElement("span", null, i.name, " ")
											)
										)
									}), 

									React.createElement("div", {className: "item item-divider subheader"}, 
										"Samantyylisiä oluita"
									), 
									React.createElement("div", {className: "item beerdetails-item translucent"}, 
										"Suositus"
									), 
									React.createElement("div", {className: "item beerdetails-item translucent"}, 
										"Toinen suositus"
									), 
						

									React.createElement("div", {className: "item item-divider subheader"}, 
										"Ilmoita saatavuudesta"
									), 
									React.createElement("div", {className: "item beerdetails-item translucent"}, 
										React.createElement("button", {className: "button button-block button-dark"}, 
											"Tätä olutta ei enää ole saatavilla"
										)
									)
								)
							)
	
						);
					}
				});

				React.render(React.createElement(OlutInfo, {beer: beer}), document.getElementById('content'));		

			} 
		}, 10);
	}
});
