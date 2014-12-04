/** @jsx React.DOM */

'use strict';

steroids.view.setBackgroundImage("/images/barley_small2.jpg");

var deviceready = false, steroidsready = false;

function onLoad() {
	if (deviceready && steroidsready) {
		document.dispatchEvent(new Event("fullyloaded"));
	}
}

steroids.on("ready", function () {
	steroidsready = true;
	onLoad();
});

document.addEventListener('deviceready', function () {
	deviceready = true;
	if (device.platform === 'Android') {
		$('#background').addClass('bg-android');
	}	
	onLoad();
}, false);


document.addEventListener('fullyloaded', onFullyLoaded, false); 

setTimeout(function() {
	console.log(typeof device);
	steroids.logger.log(typeof device);
	if (typeof device === 'undefined') onFullyLoaded();
}, 5000);


//onFullyLoaded();

function onFullyLoaded() {
	var ls = window.localStorage;		

	steroids.logger.log("device ready, steroids ready, getting on with it");
	
	window.addEventListener("message", function(event) {
		if (event.data.recipient == "beerlistView" && event.data.sender == "frontView") {
			$('html, body').scrollTop(0);			
			
			
			var beers = event.data.beers;
			var venue = event.data.venue;
			
			steroids.logger.log("venue is " + JSON.stringify(venue));

			//steroids.view.setBackgroundImage("/images/barley_small2.jpg");
			steroids.view.navigationBar.show(venue.name);

			var beerView = new steroids.views.WebView({ location: './beer.html', id: 'beerView' });

			beerView.preload( { id: 'beerView'}, {
				onSuccess: function() {
					steroids.logger.log("beerview preloaded");
				}
			});

			var Oluttutka = React.createClass({
				
				displayName: 'Oluttutka_beerlist',
	
				getInitialState: function() {
					return {
						searchTerms: [],
						searchString: '',
						foundBeers: [],
						activeSort: 'name',
					}
				},
	
				componentWillMount: function() {
					this.setState({
						foundBeers: this.props.beers,
					});
	
					console.log("oluttutka will mount");
		
					var key = this.displayName;
					var storedState = ls.getItem(key);
					
					var parsed = JSON.parse(storedState);
		
					if (storedState) {
						try {
							this.setState({activeSort: parsed});

						} catch(e) {
							steroids.logger.log("trying to load stored state but failed");
						}
					}
					//steroids.logger.log("restored state was " + storedState);
					
					if (!parsed) parsed = 'name';
					this.performSort(parsed, this.props.beers);					

				},
				
				componentDidMount: function () {

				},
				
	
				componentDidUpdate: function (prevProps, prevState) {
					var key = this.displayName;
					ls.setItem(key, JSON.stringify(this.state.activeSort));
		
					//steroids.logger.log("saved state  " + JSON.stringify(this.state));
				},
	
				handleChange: function() {

				},
	
				performSearch: function (searchString) {
					var self = this;
					var search = searchString.split(" ");
					search = _.filter(search, function(i) {
						return i.length >= 2
					});

					var result = [];
		
					if (search.length > 0 && search !== '') {
						_.each(search, function(word) {
							_.each(self.props.beers, function(beer) {
								_.forIn(beer, function(property) {
									if (property) {
										if (_.contains(property.toString().toLowerCase(), word.toLowerCase())) {
											if (!_.any(result, _.matches(beer)))
												result.push(beer);
										}
									}
								});
							});
						});
					}
					else {
						result = this.props.beers;
					}
		
					this.setState({
						searchTerms: search,
						searchString: searchString
					});
		
					this.performSort(this.state.activeSort, result);
				},
	
				performSort: function (criteria, beerlist) {
					console.log("sort criteria: " + criteria);
					steroids.logger.log("sort criteria in parent is " + criteria);
		
					var beers = [];
					var temp = [];
					if (beerlist) temp = beerlist;
					else temp = this.state.foundBeers;
		
					// remove any possible duplicates created by venue based sorting below
					_.each(temp, function(i) {
						if (i._venue) delete i._venue;
						if (!_.any(beers, _.matches(i))) {
							beers.push(i)
						}
					});

					if (criteria === "pub") {
						var venues = [];
						_.each(beers, function(i) {
							_.each(i.venues, function(l) {
								if (!_.any(venues, _.matches(l.name)))
									venues.push(l.name);
							});
						});
			
						console.log("venues is " + venues);
			
						var byVenue = [];
						_.each(venues, function(i) {
							var venue = [];
							_.each(beers, function(l) {
								_.some(l.venues, function(n) {
									if (i === n.name) {
										l._venue = n.name
										var t = _.clone(l);
										if (!_.any(venue, _.matches(t))) {
											venue.push(t);
											return true;
										}
									}
								});
							});
				
							byVenue.push(_.sortBy(venue, 'name'));
						});
			
						beers = _.flatten(byVenue, true);
						beers = _.sortBy(beers, '_venue');
			
					}
					else if (criteria === "abv") {
						beers = _.sortBy(beers, function(i) {
							return parseFloat(i.abv);
						});
					}
					else {
						beers = _.sortBy(beers, criteria);
					}
		
					this.setState({
						foundBeers: beers,
						activeSort: criteria						
					});
				},
	
				resetSearch: function () {
					this.setState({
						searchTerms: [],
						searchString: '',
						//activeSort: 'country'
					});

					this.performSearch('');
					//this.performSort(this.state.activeSort);			
					//this.props.resetSearch(this.props.foundBeers, [], '');
				},

				render: function() {
					var self = this;
					var foundBeers = this.state.foundBeers;
					var beers = this.props.beers;
					var activeSort = this.state.activeSort;
					var venue = this.props.venue;
		
					return (
						<div>
							<div className='list' id='list'>
								<div id='searchFilterContainer'>
									<FilterView performSort={this.performSort} activeSort={activeSort} venue={venue} />
									<BeerSearch beers={beers} foundBeers={foundBeers} searchTerms={this.state.searchTerms} searchString={this.state.searchString} performSearch={this.performSearch} resetSearch={this.resetSearch} />
								</div>
								<BeerList results={foundBeers} activeSort={activeSort} />
							</div>
						</div>
					);
				}
			});

			var BeerList = React.createClass({
				getInitialState: function() {
					return {
						selectedBeer: ''
					}
				},
	
				showBeer: function(beer) {
					this.setState({
						selectedBeer: beer
					});
		
					var message = {
						recipient: 'beerView',
						sender: 'frontView',
						beer: beer
					}
					
					window.postMessage(message);					
		
					setTimeout(function() {
						steroids.layers.push({ view: beerView });
					}, 25);
				},
	
				componentDidMount: function () {
					this.setState({
						selectedBeer: ''
					});
					
				},
	
				componentDidUpdate: function () {
				},
	
				computeDividerItems: function (previous,  current) {
					if (!previous) {}
					else {
						if (this.props.activeSort === 'name') {
							if (previous.name.charAt(0) === current.name.charAt(0)) return true;
							else return false;
						}
		
						else if (this.props.activeSort === 'style') {
							if (previous.style === current.style) return true;
							else return false;
						}
			
						else if (this.props.activeSort === 'pub') {
							if (previous._venue === current._venue) return true;
						}
			
						else if (this.props.activeSort === 'country') {
							if (previous.country === current.country) return true;
						}
						else if (this.props.activeSort === 'brewery') {
							if (previous.brewery === current.brewery) return true;
						}
						else if (this.props.activeSort === 'abv') {
							if (parseInt(previous.abv, 10) === parseInt(current.abv, 10)) return true;
						}
					}
				},
	
				computeDividerLabel: function (beer) {
					if (this.props.activeSort === 'name') return beer.name.charAt(0);
					else if (this.props.activeSort === 'style') return beer.style;
					else if (this.props.activeSort === 'pub') return beer._venue;
					else if (this.props.activeSort === 'country') return beer.country
					else if (this.props.activeSort === 'brewery') return beer.brewery
					else if (this.props.activeSort === 'abv') return parseInt(beer.abv, 10) + '%'
				},
	
		
	
				render: function() {
					var self = this;
					var cx = React.addons.classSet;

					var list = cx({
						'list' : true
					});

					var itemNote = cx({
						'item-note': true
					});
					var arrowRight = cx({
						'icon' : true,
						'ion-ios7-arrow-right' : true,
					});
		
					var previous;
		
					return (
						<div id="beerlist">
							{this.props.results.map(function(i) {
					
								var stickyClasses = cx({
									'item' : true,
									'item-divider' : true,
									'subheader' : true,
									//'sticky' : true,
									'fixedsticky' : true,
									'herp' : true,
									'display-none' : self.computeDividerItems(previous, i)
								});
					
								previous = i;

					
								var itemClasses = cx({
									'selectedItem' : self.state.selectedBeer === i,
									'item' : true,
									'item-icon-right' : true,
									'beerlist-item' : true,
								});
				
								return ([

									<div className={stickyClasses} key={i._id + '_' + i._venue + '_divider'}>
										{self.computeDividerLabel(i)}
									</div>,
						
									<div className={itemClasses} key={i._id + '_' + i._venue} data-beer={i._id} onClick={self.showBeer.bind(null, i)} >
										<h2> {i.name} </h2>
										<p>
											<span> {i.style} </span>
											{i.abv
												? <span> {i.abv}% </span>
												: <span> abv </span>
											}
						
											<i className={arrowRight}></i>
										</p>
										<p>
											<span>
												{i.brewery}
											</span>
										
											<span className='right smaller'>
												{/*i.venues.map(function(l) {
													return <span key={i._id + '_' + l._id + '_venue'}>{l.name}&nbsp;</span>
												}) */}
											</span>
										</p>
						
									</div>
								])
							})}	
						</div>
					);			
				}
			});

			var BeerSearch = React.createClass({
				getInitialState: function () {
					return {
						foundBeers : [],
						searchTerms : [],
						searchString: ''
					}
				},
	
				performSearch: function(event) {
					var searchString = event.target.value;

					this.props.performSearch(searchString);
		
				},
	
				resetSearch: function (event) {
					this.props.resetSearch(this.props.foundBeers, [], '');
				},
	
				handleClick: function () {
				},

				render: function() {
					var self = this;
					var cx = React.addons.classSet;
					var value = this.props.searchString;			

					if (this.props.foundBeers.length > 0 && this.props.searchTerms.length > 0) {
						var label;
						this.props.foundBeers.length === 1
							? label = <span> osuma</span>
							: label = <span> osumaa</span>

						var searchFieldAmount =
							<div className='searchFieldInlineLabel'>
								<span className='searchFieldBeers'>{this.props.foundBeers.length} {label}</span>
							</div>
					}			

					var resetBoxClasses = cx({
						'resetBox' : this.props.searchString !== '',
						'resetBoxHidden' : this.props.searchString === ''
					});
		
					var searchBoxClasses = cx({
						'item-input-wrapper': true,
						'searchBoxNotEmpty' : this.props.searchString !== '',
						'searchBoxEmpty' : this.props.searchString === ''			
					});
		
					var placeholder = "Etsi " + this.props.beers.length + " oluesta";

					return (
						<div>
							<div className='item item-input-inset' id="beerSearchInput">
								<label className={searchBoxClasses}>
									<input type='text' id="actualSearch" placeholder={placeholder}  value={value} onChange={this.performSearch} />
									{searchFieldAmount}
								</label>
					
								<div className={resetBoxClasses} onClick={this.resetSearch}>
									&nbsp;
									<span>Nollaa</span>
									&nbsp;								
								</div>
							</div>
						</div>
					);
				}
			});


			var FilterView = React.createClass({
				getInitialState: function() {
					return {
						//activeSort: this.props.activeSort
					}
				},
	
				handleSort: function (crit) {
					/*this.setState({
						activeSort: crit
					});*/
		
					steroids.logger.log("criteria in filterview is " + crit);
					this.props.performSort(crit);
				},
	
	
				render: function () {
					var self = this;
		
	
					var cx = React.addons.classSet;
		
					var inactiveButtonClasses = cx({
						'button' : true,
						'button-light' : true,
						'button-small': true,				
						'button-tiny' : true,
						'customButton' : true,
						'button-positive': false				
					});
		
					var activeButtonClasses = cx({
						'button' : true,
						'button-light' : true,
						'button-small': true,
						'button-tiny' : true,
						'customButton' : true,
						'button-positive': true
					});
		
					var activeSort = this.state.activeSort;
		
					return (
						<div id="filter" className='list'>
							{/*<div className='item item-divider subheader'>
								Järjestys
							</div> */}
							<div className='item filterItem'>
								<div className='button-bar'>
			
									{ this.props.activeSort === 'name'
										? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'name')} >Nimi</a>
										: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'name')} >Nimi</a>
									}
			
									{this.props.activeSort === 'country'
										? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'country')} >Maa</a>
										: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'country')} >Maa</a>
									}
						
									{ this.props.activeSort === 'brewery'
										? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'brewery')}>Panimo</a>
										: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'brewery')}>Panimo</a>
									}
						
									{ this.props.activeSort === 'style'
										? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'style')}>Tyyli</a>
										: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'style')}>Tyyli</a>
									}

									{
										this.props.venue.name === 'Suosikit'
											? 										
												this.props.activeSort === 'pub'
													? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'pub')}>Pubi</a>
													: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'pub')}>Pubi</a>
											: null
									}
						
									{/*this.props.activeSort === 'abv'
										? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'abv')}>Vahvuus</a>
										: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'abv')}>Vahvuus</a>
									*/}
						
								</div>
							</div>
						</div>
					)
				},
			});
			
			React.render(<Oluttutka beers={beers} venue={venue} />, document.getElementById('content'));
			
		}
	});
}
	
