/** @jsx React.DOM */

require(['components/react/react-with-addons.js'], function(React) {
	
	'use strict';


	// Display the native navigation bar with the title "Hello World!"
	//steroids.view.navigationBar.show("React");

	// Set the WebView background color to white (effective on iOS only)
	steroids.view.setBackgroundColor("#eee");

	steroids.view.navigationBar.show("Lisää olut");
	
	var closeButton = new steroids.buttons.NavigationBarButton();
	closeButton.title = "Sulje";
	
	closeButton.onTap = function() {
		steroids.layers.pop();		
	}
	

	window.addEventListener("message", function(event) {
		
		steroids.view.navigationBar.update({
			overrideBackButton: true,
			buttons: {
				left: [closeButton]
			}
		});	
		
		
		
		
		//steroids.logger.log("received message in addView  " + JSON.stringify(event));		
		if (event.data.recipient == "addView" && event.data.sender == "frontView") {
			steroids.logger.log("got bits, beers length was " + event.data.beers.length);
			//steroids.logger.log("event " + JSON.stringify(event));
			var beers = event.data.beers;
			
			var styles = [];
			_.any(beers, function(i) {
				if(!_.contains(styles, i.style)) {
					styles.push(i.style);
				}
			});
			styles = _.sortBy(styles);
			
			var countries = [];
			_.any(beers, function(i) {
				if(!_.contains(countries, i.country)) {
					countries.push(i.country);
				}
			});
			countries = _.sortBy(countries);
			
			var breweries = [];
			_.any(beers, function(i) {
				if(!_.contains(breweries, i.brewery)) {
					breweries.push(i.brewery);
				}
			});
			breweries = _.sortBy(breweries);
			
			var pubs = [];
			
			var vihrea = {
				name: 'Vihreä Haltiatar',
				type: 'Pub',
				untappdId: '31417',
				address: '',
				_id: 'derp'
			}
			
			var harrys = {
				_id: 'Q5EkLWA8Y9C4XHX9k',
				address: 'Kauppakatu 41 Jyväskylä, Länsi-Suomen Lääni (Map)',
				name: "Harry's",
				type: 'Pub',
				untappdId: '350048'
			}
			
			pubs.push(vihrea);
			pubs.push(harrys);
			
		
			React.render(<AddBeer beers={beers} pubs={pubs} styles={styles} countries={countries} breweries={breweries} />, document.getElementById('content'));			
		}
	});	

	var ceres = new Asteroid("oluttutka.meteor.com");
	
	/*var futureValue = ceres.call("beersWithVenues");
	futureValue.result.then(function (values) {
		BEERS = _.sortBy(values, 'name');
	}, function (err) {
	});*/
	

	var AddBeer = React.createClass({
		getInitialState: function() {
			return {
				selectedPub: '',
				selectedStyle: '',
				selectedCountry: '',
				selectedBrewery: '',
				searchTerms: [],
				searchString: '',
				beersBySelectedBrewery: []
			}
		},
		
		handleChange: function(event) {
			steroids.logger.log(event);
			
		},
		
		handleSearch: function(event) {
			var searchTerms = event.target.value;
			steroids.logger.log(searchTerms);
		},
		
		handlePubSelection: function (event) {
			
			
			var value = event.target.value;
			
			steroids.logger.log("selected pub " + value)
			
			var byPubs = _.filter(this.props.beers, function(i) {
				if(value === i.venue._id) return i;
			});
			
			steroids.logger.log("byPubs length " + byPubs.length);
			
			this.setState({
				beersBySelectedBrewery: byPubs,
				selectedPub: value
			});
		},
		
		
		/*handleClick: function(event) {
			steroids.layers.pop();
		},*/
		
		render: function() {
			var self = this;
			
			var beers = this.props.beers;
			
			//var pubs = this.props.pubs;
			
			var beersByPub = self.state.beersBySelectedBrewery;
			
			steroids.logger.log("in react view, this.props.pubs is " + JSON.stringify(this.props.pubs));

			return (
				<div id="addBeerView">
					<div className='margin-24'></div>				
					<div className='list'>
						
						<label className='item item-input item-select'>
							<div className='input-label'>
								Ravintola								
							</div>
							<select value={self.state.selectedPub} onChange={self.handlePubSelection}>
								{self.props.pubs.map(function(i) {
									return <option value={i._id}>{i.name}</option>
								})}
							</select>
						</label>
						
						<div className='margin-24'></div>
						
						<div className="padding">
							Syötä uuden oluen tiedot tai yritä löytää se jo tunnetuista oluista käyttämällä tekstihakua.
						</div>
						
						<div className='margin-24'></div>
						
						<div className='item item-divider subheader'>
							Uusi olut
						</div>
						
						<label className='item item-input item-select'>
							<div className='input-label'>
								Maa								
							</div>
							<select value={self.state.selectedCountry} handleChange={self.handleChange}>
								{self.props.countries.map(function(i) {
									return <option value={i}>{i}</option>
								})}
							</select>
						</label>
						
						<label className='item item-input item-select'>
							<div className='input-label'>
								Panimo								
							</div>
							<select value={self.state.selectedBrewery} handleChange={self.handleChange}>
								{self.props.breweries.map(function(i) {
									return <option value={i}>{i}</option>
								})}
							</select>
						</label>						
						
						<label className='item item-input item-select'>
							<div className='input-label'>
								Tyyli								
							</div>
							<select value={self.state.selectedStyle} handleChange={self.handleChange}>
								{self.props.styles.map(function(i) {
									return <option value={i}>{i}</option>
								})}
							</select>
						</label>
						
						<div className='item abvItem row row-center'>
							<div className='col'>
								<span className='left abvNysv'>
									Vahvuus
								</span>
							</div>
							<div className='col'>
								<input type='number' pattern='\d'  placeholder='5.7' className='right' onChange={self.handleSearch} id='abvEntry' />

							</div>
						</div>
						
						<div className='item item-input-inset'>
							<div className='item-input-wrapper'>
								<input type='text' placeholder='Nimi' onChange={self.handleSearch}></input>
							</div>
						</div>
					</div>
					
					<div className='list'>
						{self.state.beersBySelectedBrewery.map(function(i) {
							return (
								<div className='item'>
									<span>{i.name}</span>
								</div>
							)
						})}
					</div>
				</div>
			);
		}
	});
});
	
