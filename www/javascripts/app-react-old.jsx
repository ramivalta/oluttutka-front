/** @jsx React.DOM */

require(['components/react/react-with-addons.js', ''], function(React) {
	
	'use strict';


	// Display the native navigation bar with the title "Hello World!"
	steroids.view.navigationBar.show("React");

	// Set the WebView background color to white (effective on iOS only)
	steroids.view.setBackgroundColor("#eee");


	var knockoutView = new steroids.views.WebView({ location: 'index2.html'});
	
	var koViewButton = new steroids.buttons.NavigationBarButton();
	koViewButton.title = "Knockout.JS";
	koViewButton.styleClass = "nav-button";
	
	koViewButton.onTap = function() {
		steroids.layers.push(knockoutView);
	}
	
	
	steroids.view.navigationBar.update({
		buttons: {
			right: [koViewButton]
		}
	});


	var beers = [];
	function getBeer(name, brewery, abv, country, type, pub) {
		var beer = {
			name : name,
			brewery : brewery,
			abv : abv,
			country : country,
			style : type,
			pub: pub
		}
		beers.push(beer);
	}	


	getBeer("Kilkenny", "St. James’s Gate", "4.3", "Irlanti", "Red Ale", "Harry's")
	getBeer("Guinness", "St. James’s Gate", "4.3", "Irlanti", "Stout", "Harry's");
	getBeer("Harju Pale Ale", "Malmgårdin panimo", "5.2", "Suomi", "Pale Ale", "Harry's");
	getBeer("Fuller's London Pride", "Fullers", "4.7", "Englanti","Premium Ale", "Harry's");
	getBeer("Plevnan Siperia", "Panimoravintola Plevna", "8.0", "Suomi", "Stout", "Harry's");
	getBeer("Nøgne #100", "Nøgne Ø", "10.0", "Norja", "Imperial India Pale Ale", "Harry's");
	getBeer("Jack Hammer", "Brewdog", "7.2", "Skotlanti", "India Pale Ale", "Harry's");
	getBeer("Nøgne Dark Horizon 4. Edition", "Nøgne Ø", "16.0", "Norja", "Imperial Stout", "Harry's");
	getBeer("Koff Porter", "Sinebrychoff", "7.2", "Suomi", "Porter", "Harry's");
	getBeer("Anchor Porter", "Anchor", "6.0", "USA", "Porter", "Harry's");
	getBeer("Old Engine Oil", "Harviestoun", "6.0", "Skotlanti", "Porter", "Harry's");
	getBeer("Franziskaner Hefe Dunkel", "Spaten-Franziskaner-Bräu", "5.0", "Saksa", "Dunkel", "Harry's");
	getBeer("Prykmestar Wehnä Bock", "Vakka-Suomen Panimo", "6.2", "Saksa", "Vehnäbock", "Harry's");
	getBeer("Chimay Blue", "Chimay Brewery", "9.0", "Belgia", "Trappist", "Harry's");
	getBeer("Chimay Triple", "Chimay Brewery", "8.0", "Belgia", "Trappist", "Harry's");
	getBeer("La Trappe Quadrupel", "Koningshoeven / Dominus", "10.0", "Belgia", "Trappist", "Harry's");
	getBeer("La Trappe Quadrupel Oak Aged", "Koningshoeven / Dominus", "10.0", "Belgia", "Trappist", "Harry's");
	getBeer("Rochefort 10", "Rochefort", "11.3", "Belgia", "Trappist", "Harry's");
	getBeer("Rochefort 8", "Rochefort", "9.2", "Belgia", "Trappist", "Harry's");
	getBeer("Rochefort 6", "Rochefort", "7.5", "Belgia", "Trappist", "Harry's");
	getBeer("Fou Foune", "Cantillon", "5.0", "Belgia", "Lambic", "Harry's");
	getBeer("Rose de Gambrinius", "Cantillon", "5.0", "Belgia", "Lambic", "Harry's");
	getBeer("Caractère Rouge", "Rodenbach", "7.0", "Belgia", "Lambic", "Harry's");
	getBeer("De Ranke Hop Harvest", "De Ranke", "6.0", "Belgia", "Lambic", "Harry's");
	getBeer("Tuff", "Hiisi", "6.2", "Suomi", "India Pale Ale", "Harry's");
	getBeer("Boheemi",  "Hiisi", "5.9", "Suomi", "Organic Ale", "Harry's");
	getBeer("Humulus Lupus",  "Hiisi", "9.0", "Suomi", "Double Indian Pale Ale", "Harry's");
	getBeer("Game Brewery",  "Hiisi", "5.3", "Suomi", "Rye Pale Ale", "Harry's");
	getBeer("Sundland Kreosot", "HaandBryggeriet", "7.7", "Norja", "Indian Black Ale", "Harry's");
	getBeer("Headbanger Bulldog Black", "Gotlands Bryggeri", "7.2", "Ruotsi", "Black Indian Pale Ale", "Harry's");
	getBeer("Belhaven Speyside Oak Aged", "Belhaven", "6.5", "Skotlanti", "Blonde Ale", "Harry's");
	getBeer("Founders All Day", "Founders", "4.7", "USA", "India Pale Ale", "Harry's");
	getBeer("Founders Centennial", "Founders", "7.2", "USA", "India Pale Ale", "Harry's");
	getBeer("Founders Pale Ale", "Founders",  "5.4", "USA", "Pale Ale", "Harry's");
	getBeer("Alchemy Ale", "Widmer Brothers", "5.8", "USA", "American Pale Ale", "Harry's");
	getBeer("Upheaval IPA", "Widmer Brothers", "7.0", "USA", "India Pale Ale", "Harry's");
	getBeer("Castaway", "Kona", "6.0", "USA", "India Pale Ale", "Harry's");
	getBeer("Tipsy Gypsy", "Gypsy Inc", "4.7", "Belgia", "Pils", "Harry's");
	getBeer("Abstrakt 8", "Brewdog", "11.8", "Skotlanti", "American Strong Ale", "Harry's");
	getBeer("Abstrakt 13", "Brewdog", "11.3", "Skotlanti", "Imperial Stout", "Harry's");
	getBeer("Abstrakt 14", "Brewdog", "10.2", "Skotlanti", "Imperial Weizenbock", "Harry's");
	getBeer("Watt Dickie", "Brewdog", "35.0", "Skotlanti", "American Double / Imperial IPA", "Harry's");


	getBeer("Chimay Blue", "Chimay", "9.0", "Belgia", "Trappist", "Vihreä Haltiatar");	
	getBeer("Aventinus", "Schneider Weisse", "8.2", "Saksa", "Vehnäbock", "Vihreä Haltiatar");	
	getBeer("Franziskaner Hefe Dunkel", "Spaten-Franziskaner-Bräu", "5.0", "Saksa", "Dunkel", "Vihreä Haltiatar");		
	getBeer("New DogTown", "Lagunitas", "6.2", "USA", "American Pale Ale", "Vihreä Haltiatar");
	getBeer("YuleSmith", "AleSmith", "9.5", "USA", "American Strong Ale", "Vihreä Haltiatar");
	getBeer("Kona Castaway", "Kona", "6.0", "USA", "India Pale Ale", "Vihreä Haltiatar");
	getBeer("Aecht Schlenkerla Rauchbier Urbock", "Brauerei Heller", "6.5", "Saksa", "Smoked", "Vihreä Haltiatar");

	var BEERS = _.sortBy(beers, 'name');
	
	
	for (var i = 0; i < BEERS.length; i++) {
		var key = i;
		BEERS[i].key = key;
	}

	var Oluttutka = React.createClass({
		getInitialState: function() {
			return {
				selectedPubs : [],
				selectedCountries : [],
				selectedBreweries: [],
				selectedStyles: [],
				searchTerms: []
			}
		},
		
		handlePubSelection: function(pubs) {
			this.setState({
				selectedPubs: pubs
			});
			
		},
		
		handleCountrySelection: function(countries) {
			this.setState({
				selectedCountries: countries
			});
		},
		
		handleBrewerySelection: function(breweries) {
			this.setState({
				selectedBreweries: breweries
			})
		},
		
		handleStyleSelection: function(styles) {
			this.setState({
				selectedStyles: styles
			});
		},
		
		handleTextSearch: function(searchTerms) {
			this.setState({
				searchTerms: searchTerms
			})
		},
		
		render: function() {
			var self = this;
			
			var beerlist = _.filter(BEERS, function(i) {
				if (!_.any(self.state.selectedPubs, _.matches(i.pub)) && self.state.selectedPubs.length > 0) return;
				if (!_.any(self.state.selectedCountries, _.matches(i.country)) && self.state.selectedCountries.length > 0 ) return;
				if (!_.any(self.state.selectedBreweries, _.matches(i.brewery)) && self.state.selectedBreweries.length > 0 ) return;
				
				if (!_.any(self.state.selectedStyles, _.matches(i.style)) && self.state.selectedStyles.length > 0 ) return;
				
				return i;
			});			
			
			var pubs = [];			
			_.each(BEERS, function(i) {
				if (!_.any(pubs, _.matches(i.pub))) {
					pubs.push(i.pub);
				}
			});
			
			var countries = [];
			_.each(BEERS, function(i) {
				if (!_.any(countries, _.matches(i.country)) && (_.any(this.state.selectedPubs, _.matches(i.pub)) || this.state.selectedPubs.length === 0 )) {
					countries.push(i.country)
				} 
			}, this);
			
			var breweries = [];			
			_.each(BEERS, function(i) {
				if (!_.any(breweries, _.matches(i.brewery)) && (_.any(this.state.selectedPubs, _.matches(i.pub)) || this.state.selectedPubs.length === 0 ) && (_.any(this.state.selectedCountries, _.matches(i.country)) || this.state.selectedCountries.length === 0) ) {
					breweries.push(i.brewery);
				}
			}, this);
			
			
			var styles = [];			
			_.each(BEERS, function(i) {
				if (!_.any(styles, _.matches(i.style)) && (_.any(this.state.selectedPubs, _.matches(i.pub)) || this.state.selectedPubs.length === 0) && (_.any(this.state.selectedCountries, _.matches(i.country)) || this.state.selectedCountries.length === 0 ) && (_.any(this.state.selectedBreweries, _.matches(i.brewery)) || this.state.selectedBreweries.length === 0) ) {
				
					styles.push(i.style);
				}
			}, this);
			
			pubs = _.sortBy(pubs);
			countries = _.sortBy(countries);
			styles = _.sortBy(styles);
			breweries = _.sortBy(breweries);
			


		
			return (
				<div className='list'>
					<PubSelection pubs={pubs} onClick={self.handlePubSelection}/>
					<CountrySelection pubs={self.state.selectedPubs} countries={countries} onClick={self.handleCountrySelection} />					
					<BrewerySelection pubs={self.state.selectedPubs} countries={self.state.selectedCountries} breweries={breweries} onClick={self.handleBrewerySelection} />
					<StyleSelection styles={styles} countries={self.state.selectedCountries} pubs={self.state.selectedPubs} breweries={self.state.selectedBreweries} onClick={self.handleStyleSelection} />

					<Beerlist beers={beerlist} />			
				</div>
			);
		}
	});
	
	var PubSelection = React.createClass({
		getInitialState: function() {
			return {
				pubs: this.props.pubs,
				selectedPubs : [],
				show: true
			}
		},
		
		componentWillMount: function() {
			var pubs = this.props.pubs;
			this.setState({
				selectedPubs: pubs
			});
		},
		
		handleChange: function(event) {
			var pub = event.target.getAttribute('data-pub');
			var selected = this.state.selectedPubs;
			
			if (_.contains(selected, pub)) {
				_.remove(selected, _.matches(pub));
			}
			else {
				selected.push(pub);
			}
			this.setState({selectedPubs: selected});
			this.props.onClick(selected);
		},
		
		render: function() {
			var self = this;
			var cx = React.addons.classSet;
			var containerClasses = cx({
				'horiScroll' : true
			});
			
			console.log("pub selection state " + JSON.stringify(self.state));
			

			
			return (
				<div>
					<div className='item item-divider'>
						<span> Ravintolat </span>
						{self.state.selectedPubs.length > 0
							? <span className='count'>{self.state.selectedPubs.length}</span>
							: null
						}
					</div>
					
					<div className={containerClasses}>
						{this.props.pubs.map(function(i) {
							var buttonClasses = cx({
								'button' : true,
								'button-steady' : true,
								'button-small' : true,
								'customButton' : true,
								'checkedButton' : _.contains(self.state.selectedPubs, i)
							});
							
							return (
								<button className={buttonClasses} onClick={self.handleChange} data-pub={i} key={i}>
									<span>
										{i}
									</span>
								</button>
							)
						})}
					</div>
				</div>
			);
		}
	});
	
	var CountrySelection = React.createClass({
		getInitialState: function () {
			return {
				countries : this.props.countries,
				selectedCountries : [],
				selectedPubs: this.props.pubs,
				show: true				
			}
		},
		
		handleChange: function(event) {
			var country = event.target.getAttribute('data-country');
			var selected = this.state.selectedCountries;
			
			if (_.contains(selected, country)) {
				_.remove(selected, _.matches(country));
			}
			else {
				selected.push(country);
			}
			
			this.setState({selectedCountries: selected});			
			this.props.onClick(selected);
			
			/*this.forceUpdate(function(e) {
				steroids.logger.log("forcefully updated " + JSON.stringify(e));
			});*/
		},
		
		resetSearch: function(event) {
			var selected = [];
			this.setState({selectedCountries: selected});
			this.props.onClick(selected);
			
			event.stopPropagation();
		},
		
		toggleShow: function() {
			if (this.state.show) {
				this.props.onClick([]);
				this.setState({show: false, selectedCountries: []});
			}
			else {
				this.setState({show: true});
			}
			
			/*this.forceUpdate(function(e) {
				steroids.logger.log("forcefully updated " + JSON.stringify(e));
			});*/
			
			
		},
		
		componentDidMount: function() {
			this.setState({
				countries : this.props.countries,
				selectedPubs: this.props.pubs,
			});
		},
		
		render: function() {
			var self = this;
			var cx = React.addons.classSet;
			var containerClasses = cx({
				'horiScroll' : true
			});
			
			var resetButtonClasses = cx({
				'reset' : true,
				'hidden' : this.state.selectedCountries.length === 0
			});			
			
			var iconClasses = cx({
				'icon' : true,
				'ion-ios7-arrow-down' : this.state.show,
				'ion-ios7-arrow-right' : !this.state.show,
				'smallIcon' : true
			});			
			
			var buttonClasses;
			var cs = React.addons.classSet;

			var horiScroll;
			if (this.state.show) {
				horiScroll = 
				<div className={containerClasses}>
					{this.props.countries.map(function(i) {
						
						var checked = _.contains(this.state.selectedCountries, i);
						buttonClasses = cs({
							'button' : true,
							'button-steady' : true,
							'button-small' : true,
							'customButton' : true,
							'checkedButton' : checked
						});
						
						//steroids.logger.log(buttonClasses);
			
						return (
							<button className={buttonClasses} onClick={this.handleChange} data-country={i} key={i}>
								<span>
									{i.length < 7
										? <span>&nbsp;</span>
										: null
									}
									{i}
									{i.length < 7
										? <span>&nbsp;</span>
										: null
									}
								</span>
							</button>
						)
					}, this)}
				</div>
			}

			
			return (
				<div className="custom-item-divider">
					<div className='item item-divider item-icon-left' onClick={this.toggleShow}>
						<i className={iconClasses}></i>					
						<span className='subHeader'> Maat </span>
						{self.state.selectedCountries.length > 0
							? <span className='count'>{self.state.selectedCountries.length}</span>
							: null
						}

						<span className={resetButtonClasses} onClick={this.resetSearch}>
							&nbsp;						
							&nbsp;						
							&nbsp;
							Nollaa
							&nbsp;							
						</span>							
					</div>
					{horiScroll}
				</div>
			);
		}
	});
	
	
	var BrewerySelection = React.createClass({
		getInitialState: function () {
			return {
				breweries : this.props.breweries,
				selectedBreweries : [],
				selectedPubs: this.props.pubs,
				selectedCountries: this.props.countries,
				show: false				
			}
		},
		
		handleChange: function(event) {
			var brewery = event.target.getAttribute('data-brewery');
			var selected = this.state.selectedBreweries;
			
			if (_.contains(selected, brewery)) {
				_.remove(selected, _.matches(brewery));
			}
			else {
				selected.push(brewery);
			}
			
			this.setState({selectedBreweries: selected});
			this.props.onClick(selected);
		},
		
		resetSearch: function(event) {
			var selected = [];
			
			this.setState({selectedBreweries: selected});			
			this.props.onClick(selected);
			
			event.stopPropagation();			
		},
		
		toggleShow: function() {
			if (this.state.show) {
				this.props.onClick([]);
				this.setState({show: false, selectedBreweries: []});
			}
			else {
				this.setState({show: true});
			}
		},
		
		componentWillMount: function() {
			this.setState({
				breweries : this.props.breweries,
				selectedCountries : this.props.countries,
				selectedPubs: this.props.pubs
			});
		},		
		
		render: function() {
			var self = this;
			var cx = React.addons.classSet;
			var containerClasses = cx({
				'horiScroll' : true
			});
			
			var resetButtonClasses = cx({
				'reset' : true,
				'hidden' : this.state.selectedBreweries.length === 0
			});			
			
			var iconClasses = cx({
				'icon' : true,
				'ion-ios7-arrow-down' : this.state.show,
				'ion-ios7-arrow-right' : !this.state.show,
				'smallIcon' : true
			});
			
			var horiScroll;
			if (this.state.show) {
				horiScroll = 
				<div className={containerClasses}>
					{this.props.breweries.map(function(i) {
						var buttonClasses = cx({
							'button' : true,
							'button-steady' : true,
							'button-small' : true,
							'customButton' : true,
							'checkedButton' : _.contains(self.state.selectedBreweries, i)
						});
			
						return (
							<button className={buttonClasses} onClick={self.handleChange} data-brewery={i} key={i}>
								<span>
									{i.length < 7
										? <span>&nbsp;</span>
										: null
									}
									{i}
									{i.length < 7
										? <span>&nbsp;</span>
										: null
									}
								</span>
							</button>
						)
					})}
				</div>
			}
			else horiScroll = null				
			
			return (
				<div className='custom-item-divider'>
					<div className='item item-divider item-icon-left' onClick={this.toggleShow}>
						<i className={iconClasses}></i>
						<span>					
							<span className="subHeader"> Panimot </span>
							{self.state.selectedBreweries.length > 0
								? <span className='count'>{self.state.selectedBreweries.length}</span>
								: null
							}
						</span>						
						
						<span className={resetButtonClasses} onClick={this.resetSearch}>
							&nbsp;						
							&nbsp;						
							&nbsp;
							Nollaa
							&nbsp;							
						</span>						
						
						
					</div>
						
					
					{horiScroll}
					
					
				</div>
			);
		}
	});	
	
	var StyleSelection = React.createClass({
		getInitialState: function () {
			return {
				styles : this.props.styles,
				selectedStyles : [],
				selectedPubs : this.props.pubs,
				selectedCountries : this.props.countries,
				show: false				
			}
		},
		componentWillMount: function() {
			this.setState({
				selectedCountries : this.props.countries,
				selectedPubs: this.props.pubs
			});
		},
		
		resetSearch: function(event) {
			var selected = [];
			this.props.onClick(selected);
			//this.setState({selectedStyles: selected});
			//event.stopPropagation();
		},
		
		handleChange: function(event) {
			var style = event.target.getAttribute('data-style');
			var selected = this.state.selectedStyles;
			
			if (_.contains(selected, style)) {
				_.remove(selected, _.matches(style));
			}
			else {
				selected.push(style);
			}


			this.setState({selectedStyles: selected});			
			this.props.onClick(selected);
		},
		
		toggleShow: function() {
			if (this.state.show) {
				this.props.onClick([]);
				this.setState({show: false, selectedStyles: []});
			}
			else {
				this.setState({show: true});				
			}
		},
		
		render: function() {
			var self = this;
			var cx = React.addons.classSet;
			var containerClasses = cx({
				'horiScroll' : true
			});
			
			var iconClasses = cx({
				'icon' : true,
				'ion-ios7-arrow-down' : this.state.show,
				'ion-ios7-arrow-right' : !this.state.show,
				'smallIcon' : true
			});
			
			var resetButtonClasses = cx({
				'reset' : true,
				'hidden' : this.state.selectedStyles.length === 0
			});
			
			//steroids.logger.log("state.selectedStyles :" + JSON.stringify(self.state.selectedStyles));
			
			var horiScroll
			if (this.state.show) {
				horiScroll = 
					<div className={containerClasses}>
						{this.props.styles.map(function(i) {
							var buttonClasses = cx({
								'button' : true,
								'button-steady' : true,
								'button-small' : true,
								'customButton' : true,
								'checkedButton' : _.contains(this.state.selectedStyles, i)
							});
				
				
							return (
								<button className={buttonClasses} onClick={self.handleChange} data-style={i} key={i}>
									<span>
										{i.length < 7
											? <span>&nbsp;</span>
											: null
										}
										{i}
										{i.length < 7
											? <span>&nbsp;</span>
											: null
										}
									</span>
								</button>
							)
		
						}, this)}
					</div>
			}
			else horiScroll = null	
			
			
			return (
				<div className='custom-item-divider'>
					<div className='item item-divider item-icon-left' onClick={this.toggleShow}>
						<i className={iconClasses}></i>
						<span>					
							<span className="subHeader"> Tyylit </span>
							{self.state.selectedStyles.length > 0
								? <span className='count'>{self.state.selectedStyles.length}</span>
								: null
							}
						</span>
						<span className={resetButtonClasses} onClick={this.resetSearch}>
							&nbsp;						
							&nbsp;						
							&nbsp;
							Nollaa
							&nbsp;							
						</span>
					</div>
					
					{horiScroll}

				</div>
			);
		}
	});	
	
	
	var AbvSlider = React.createClass({
		getInitialState: function() {
			return {
				abv : 0
			}
		},
		
		handleChange: function() {
			
		},
		
		render: function () {
			var self = this;
			
			/*var resetButtonClasses = cx({
				'reset' : true,
				'hidden' : this.state.selectedStyles.length === 0
			});*/
				
			
			
		},
		
	});
	
	
	var Beerlist = React.createClass({
		getInitialState: function () {
			return {
				beers: this.props.beers
			}
		},
		handleChange: function (event) {
			
		},
		
		render: function () {
			var self = this;
			var cx = React.addons.classSet;
			
			var list = cx({
				'list' : true
			});
			
			var item = cx({
				'item' : true,
				'item-icon-right' : true,
			});
			
			var itemNote = cx({
				'item-note': true
			});
			
			var arrowRight = cx({
				'icon' : true,
				'ion-ios7-arrow-right' : true,
			});
			
			return (
				<div id="beerlist">
					{this.props.beers.map(function(i) {
						return (
							<div className={item} key={i.key}>
								<h2> {i.name} </h2>
								<span> {i.brewery} </span>
							
								<span className={itemNote}>
									<span> {i.style} </span>
									<span> {i.abv}% </span>
									<span> {i.country} </span>
								</span>
								<i className={arrowRight}></i>
								<p>
									{i.pub}
								</p>
							</div>
						)
					})}	
				</div>
			);
		},
	});
	
	
	React.render(<Oluttutka />, document.getElementById('content'));
	
});
	
