/** @jsx React.DOM */

require(['components/react/react-with-addons.js'], function(React) {
	
	'use strict';


	// Display the native navigation bar with the title "Hello World!"
	//steroids.view.navigationBar.show("Oluttutka");

	steroids.view.navigationBar.show("Oluttutka");

	// Set the WebView background color to white (effective on iOS only)
	steroids.view.setBackgroundColor("#eee");


	var beerView = new steroids.views.WebView({ location: 'beer.html' });
	beerView.preload();
	
	var addView = new steroids.views.WebView({ location: 'addbeer.html' });
	addView.preload();
	
	
	//steroids.modal.show(loginView);
	


	//var knockoutView = new steroids.views.WebView({ location: 'index2.html'});
	
	var filterButton = new steroids.buttons.NavigationBarButton();
	//filterButton.title = "Derp";
	filterButton.imagePath = "/icons/sort_inactive@2x.png";
	filterButton.styleClass = "nav-button";
	filterButton.imageAsOriginal = "true";
	
	var addButton = new steroids.buttons.NavigationBarButton();
	addButton.imagePath = "/icons/ios7-plus-empty@2x.png";
	addButton.styleClass = "nav-button";
	//addButton.imageAsOriginal = "true";
	//addButton.title = "+";
	
	var filterVisible = false;

	filterButton.onTap = function() {
		steroids.logger.log("filterButton clicked");
		
		filterButton.imagePath = "/icons/sort_active@2x.png";
		steroids.view.navigationBar.update({
			buttons: {
				right: [addButton, filterButton]
			}
		});		
		
		var filterElement = $('#filter');
		var listElement = $('#beerlist');
		var beerSearchInput = $('#beerSearchInput');
		
		var h = filterElement.css('height');
		var yp = '+=' + h + 'px';
		var ym = '-=' + h + 'px';
		
		if (!filterVisible) {
			
			
			filterElement.css({
				y: '-100%',
				display: 'block'
			});
			
			beerSearchInput.transition({
				y: yp,
				duration: '250'
			});
								
			filterElement.transition({
				y: '0%',
				duration: '250',
				opacity: '1'
			});
			
			listElement.transition({
				y: yp,
				duration: '250',
				complete: function() {
					listElement.css({
						
						marginBottom: yp
					});
				}
			});

			filterVisible = true;
		}
		
		else {
			filterElement.transition({
				y: '-100%',
				duration: '250',
				opacity: '0'
			});
			
			beerSearchInput.transition({
				y: ym,
				duration: '250'
			});			
			
			listElement.transition({
				y: ym,
				duration: '250',
				complete: function () {
					listElement.css({
						marginBottom: ym
					});
				}
			});
			
			filterVisible = false;
			
			filterButton.imagePath = "/icons/sort_inactive@2x.png";
			steroids.view.navigationBar.update({
				buttons: {
					right: [addButton, filterButton]
				}
			});
		}
	}
	
	

	
	steroids.view.navigationBar.update({
		buttons: {
			right: [addButton, filterButton]
		}
	});
	
	
	
	//var BEERS;
	
	var ceres = new Asteroid("oluttutka.meteor.com");
	//var collection = ceres.getCollection("beers");
	var futureValue = ceres.call("beersWithVenues");
	futureValue.result.then(function (values) {
		
		
		
		

		console.log(values.length);		
		
		var beers = _.sortBy(values, 'name');

		console.log(beers);
		
		addButton.onTap = function() {
			var message = {
				recipient: "addView",
				sender: "frontView",
				beers : beers
			}
			
			window.postMessage(message);
			
			var anim = new steroids.Animation({
				transition: 'slideFromBottom',
				duration: 0.2,
				curve: 'easeIn'
			});
			
			steroids.layers.push({ view: addView, animation: anim });
		}		
		
		steroids.view.navigationBar.update({
			buttons: {
				right: [addButton, filterButton]
			}
		});		
		
		React.render(<Oluttutka beers={boop} />, document.getElementById('content'));			
			
			
			
	}, function (err) {
		steroids.logger.log("error " + err);
		console.log("error " + err);
	});
	
	var Oluttutka = React.createClass({
		getInitialState: function() {
			return {

				searchTerms: [],
				searchString: '',
				foundBeers: [],
				activeSort: 'name'
			}
		},
		
		componentWillMount: function() {
			this.setState({
				foundBeers: this.props.beers
			});
		},
		
		handleChange: function(derp) {
		},
		
		performSearch: function (searchString) {
			var self = this;
			var search = searchString.split(" ");
			search = _.filter(search, function(i) {
				return i.length >= 2
			});

			//console.log(this.props.beers);

			var result = [];
			
			if (search.length > 0) {
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
			
			var sort = this.state.activeSort;
			if (sort === 'pub') {
				sort = venue.name;
			}
			
			result = _.sortBy(result, this.state.activeSort);			
			
			this.setState({
				foundBeers : result,
				searchTerms: search,
				searchString: searchString
			});
		},
		
		activeSort: function (criteria) {
			console.log("sort criteria: " + criteria);
			steroids.logger.log("sort criteria in parent is " + criteria);
			
			var beers = this.state.foundBeers;
			
			beers = _.sortBy(beers, criteria);
			
			this.setState({
				activeSort: criteria,
				foundBeers: beers
			});
			
			//this.forceUpdate();
		},
		
		
		resetSearch: function () {
			this.setState({
				searchTerms: [],
				searchString: '',
				//activeSort: 'country'
			});
			
			this.performSearch('');
			
			//this.props.resetSearch(this.props.foundBeers, [], '');
		},
		
		showBeer: function(beer) {
			var message = {
				recipient: 'beerView',
				sender: 'frontView',
				beer: beer
			}
			
			window.postMessage(message);
			steroids.layers.push(beerView);
			
		},		
		
		render: function() {
			var self = this;
			var foundBeers = this.state.foundBeers;
			var beers = this.props.beers;
			
			return (
				<div>
					<div className='list' id='list'>
						<div id='searchFilterContainer'>
							<FilterView activeSort={this.activeSort} />					
							<BeerSearch beers={beers} foundBeers={foundBeers} searchTerms={this.state.searchTerms} searchString={this.state.searchString} performSearch={this.performSearch} resetSearch={this.resetSearch} />
						</div>
						<BeerList results={foundBeers} showBeer={this.showBeer} />
					</div>
				</div>
			);
		}
	});
	
	var BeerList = React.createClass({
		getInitialState: function() {
			return {
			}
		},
		
		componentWillMount: function() {
		},
		
		/*handleChange: function(event) {
			this.props.handleChange(event);
		},*/
		
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
			
			return (
				<div id="beerlist">
					{this.props.results.map(function(i) {
						var item = cx({
							'item' : true,
							'item-icon-right' : true,
							'beerlist-item' : true,
							'ipa' : _.contains(i.style, 'IPA') && !_.contains(i.style, 'Black IPA'),
							'stout': _.contains(i.style, 'Stout') || _.contains(i.style, 'Porter')
							
						});						
						
						return (
							<div className={item} key={i._id} data-beer={i._id} onClick={self.props.showBeer.bind(null, i)} >
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
									{i.brewery
										? <span> {i.brewery} </span>
										: <span> panimo </span>
									}
									{i.country
										? <span> {i.country} </span>
										: <span> maa </span>
									}
									<span className='right'>{i.venue.name}</span>
								</p>
								
							</div>
						)
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
			/*this.setState({
				searchTerms: [],
				searchString: ''
			});*/
			this.props.resetSearch(this.props.foundBeers, [], '');
		},
		
		handleFocus: function () {
			steroids.logger.log("focused");
			
			if(!filterVisible) {
				$('#beerSearchInput').css({
					position: 'static'
				});
			
				$('#list').css({
					marginTop: '0px'
				});
			}
			
			steroids.logger.log("focused, searchinput position is " + $('#beerSearchInput').css('position'));						
			
		},
		
		handleBlur: function () {
			$('#beerSearchInput').css({
				position: 'fixed'
			});
			
			$('#list').css({
				marginTop: '48px',
			});
			
			$('#content').scrollTop(0);
			
			steroids.logger.log("blurred, searchinput position is " + $('#beerSearchInput').css('position'));						
			
		},

		render: function() {
			var self = this;
			var cx = React.addons.classSet;
			//var value = this.state.searchTerms;
			var value = this.props.searchString;			

			if (this.props.foundBeers.length > 0 && this.props.searchTerms.length > 0) {
				var label;
				this.props.foundBeers.length === 1
					? label = <span> olut</span>
					: label = <span> olutta</span>

				var searchFieldAmount =
					<div className='searchFieldInlineLabel'>
						<span className='searchFieldBeers'>{this.props.foundBeers.length} {label}</span>
					</div>
			}			

			var resetBoxClasses = cx({
				'resetBox' : this.props.searchTerms.length > 0,
				'resetBoxHidden' : this.props.searchTerms.length === 0
			});
			
			var searchBoxClasses = cx({
				'item-input-wrapper': true,
				'searchBoxNotEmpty' : this.props.searchTerms.length > 0,
				'searchBoxEmpty' : this.props.searchTerms.length === 0			
			});
			

			return (
				<div>
					<div className='item item-input-inset' id="beerSearchInput">
						<label className={searchBoxClasses}>
							<input type='text' id="actualSearch" placeholder='Oluen nimi, maa, tyyli...'  value={value} onChange={this.performSearch} onFocus={this.handleFocus} onBlur={this.handleBlur} />
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
				activeSort: 'name'
				/*sortByCountry: true,
				sortByBrewery: false,
				sortByStyle: false,
				sortByStrength: false*/
			}
		},
		
		handleSort: function (crit) {
			steroids.logger.log("criteria in filterview is " + crit);
			this.setState({
				'activeSort': crit		
			});
			this.props.activeSort(crit);
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
			
			return (
				<div id="filter" className='list'>
					<div className='item item-divider subheader'>
						Järjestys
					</div>
					<div className='item filterItem'>
						<div className='button-bar'>
							{ this.state.activeSort === 'name'
								? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'name')} >Nimi</a>
								: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'name')} >Nimi</a>
							}						
							{ this.state.activeSort === 'country'
								? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'country')} >Maa</a>
								: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'country')} >Maa</a>
							}
							
							{ this.state.activeSort === 'brewery'
								? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'brewery')}>Panimo</a>
								: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'brewery')}>Panimo</a>
							}
							
							{ this.state.activeSort === 'style'
								? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'style')}>Tyyli</a>
								: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'style')}>Tyyli</a>
							}
							
							{/* this.state.activeSort === 'pub'
								? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'pub')}>Pubi</a>
								: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'pub')}>Pubi</a>
							*/}							
							
							{/* this.state.activeSort === 'strength'
								? <a className={activeButtonClasses} onClick={this.handleSort.bind(null, 'strength')}>Vahvuus</a>
								: <a className={inactiveButtonClasses} onClick={this.handleSort.bind(null, 'strength')}>Vahvuus</a>
							*/}
							
						</div>
					</div>
				</div>
			)
		},
	});
	
	
	
	/*var ScrollerView = React.createClass({
		getInitialState: function () {
			return {
				selectedItems: [],
				show: true
			}
		},
		
		handleChange: function (event) {
			steroids.logger.log(event.target.getAttribute('data-item'));
			this.props.onClick();
		},
		
		render: function() {
			var self = this;
			var cx = React.addons.classSet;
			console.log("scrollerview props.item length " + this.props.items.length);
			
			return (
				<div className='horiScroll'>
					{self.props.items.map(function(i) {
						var buttonClasses = cx({
							'button' : true,
							'button-steady' : true,
							'button-small' : true,
							'customButton' : true,
							'checkedButton' : _.contains(self.state.selectedItems, i)
						});
					
						return (
							<button className={buttonClasses} onClick={self.handleChange} data-item={i} key={i._id}>
								<span>
									{i.length < 7
										? <span>&nbsp;</span>
										: null
									}
									{i.style}
									{i.length < 7
										? <span>&nbsp;</span>
										: null
									}
								</span>
							</button>
						)
					})}
				</div>
			);
		}
	}); */
});
	
