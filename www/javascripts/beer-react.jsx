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

				var OlutInfo = React.createClass({
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
							<div className='content'>
								<div className="item translucent title" ref={'beerinfo'}>
									<div className="border-bottom center">
										<h2>
											{beer.name}
										</h2>
									</div>
									<div className="row">
										<div className="col col-50 border-right center beer-info">
											<h3>
												{beer.brewery}
											</h3>
											<h3>
												{beer.country}
											</h3>
										</div>
										<div className="col col-50 center beer-info">
											<h3>
												{beer.abv}%
											</h3>
											<h3>
												{beer.style}
											</h3>
										</div>
									</div>
								</div>
								
								<div className="list" id="beerinfo-content" ref={'beerinfo_bottom'}>
									<div className="item item-divider subheader">
										Kuvaus
									</div>

									<div className="item beerdetails-item translucent">
										<span>{beer.description}</span>
									</div>

									<div className="item item-divider subheader">
										Saatavuus
									</div>
									{beer.venues.map(function(i) {
										return (
											<div className="item beer-info translucent" key={i._id}>
												<span>{i.name}&nbsp;</span>
											</div>
										)
									})}

									<div className='item item-divider subheader'>
										Samantyylisiä oluita
									</div>
									<div className='item beerdetails-item translucent'>
										Suositus
									</div>
									<div className='item beerdetails-item translucent'>
										Toinen suositus
									</div>
						

									<div className='item item-divider subheader'>
										Ilmoita saatavuudesta
									</div>
									<div className='item beerdetails-item translucent'>
										<button className='button button-block button-dark'>
											Tätä olutta ei enää ole saatavilla
										</button>
									</div>
								</div>
							</div>
	
						);
					}
				});

				React.render(<OlutInfo beer={beer} />, document.getElementById('content'));		

			} 
		}, 10);
	}
});

