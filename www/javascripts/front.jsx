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
	if (typeof device === 'undefined') {
		$('body').addClass('bg-android');
		onFullyLoaded();
	}
}, 5000);

//onFullyLoaded();

var loaded = false;

function onFullyLoaded() {
	if (loaded) return;
	loaded = true;
	
	steroids.logger.log("device ready, steroids ready, getting on with it");

	//supersonic.ui.navigationBar.setStyleClass('custom-navbar');
	
	steroids.view.navigationBar.show("Oluttutka");

	// Set the WebView background color to white (effective on iOS only)
	//steroids.view.setBackgroundColor("#eee");

	var beerlistView = new steroids.views.WebView({ location: './beerlist.html', id: 'beerlistView' });

	beerlistView.preload( { id: 'beerListView'}, {
		onSuccess: function() {
			steroids.logger.log("beerview preloaded");
		}
	});
	
	var ls = window.localStorage;
	
	var KEY = "OluttutkaFrontDerpASd";

	var ceres = new Asteroid("oluttutka.meteor.com");
	//var collection = ceres.getCollection("beers");
	var futureValue = ceres.call("beersWithVenues");
	futureValue.result.then(function (values) {
		var beers = _.sortBy(values, 'name');
	
		console.log(beers);
		steroids.logger.log("got this many beers " + beers.length);

		React.render(<Oluttutka beers={beers} />, document.getElementById('content'));
	
	}, function (err) {
		steroids.logger.log("error " + err);
	});

	var Oluttutka = React.createClass({
		
		displayName: 'Oluttutka',
		
		getInitialState: function() {
			return {
				activeSort: 'selection',
				activeTab: 'main',
				favorites: [],
				favoriteVenues: []
			}
		},
	
		componentWillMount: function() {
			console.log("oluttutka front will mount");
			this.getVenues();
			this.getFavoriteVenues();
			
			var key = KEY;
			var storedState = ls.getItem(key);

			if (storedState) {
				steroids.logger.log("restoring state.favorites to " + JSON.stringify(storedState));
				try {
					
					this.setState({ favorites: JSON.parse(storedState) });
				} catch(e) {
					steroids.logger.log("trying to load stored state but failed");
				}
			}
			
			this.getGeolocation();
		},
	
		componentDidUpdate: function (prevProps, prevState) {
			var key = KEY;
		
			ls.setItem(key, JSON.stringify(this.state.favorites));
			
			
			steroids.logger.log("root component updated");
			steroids.logger.log("saved position " + JSON.stringify(this.state.position));			
		},
		
		componentDidMount: function () {
			this.sortVenues(this.state.activeSort);
			this.getFavoriteVenues();
		},
		
		getGeolocation: function () {
			var self = this;
			
			/*navigator.notification.confirm(
				"Derp",
				getShit(),
				"Mee kotiis",
				['Yes', 'Yes']
			);*/
			
			/*(function getShit() {
				navigator.geolocation.getCurrentPosition(
					function(pos) {
						steroids.logger.log("got location " + JSON.stringify(pos));
						self.setState({
							position: pos
						});
					},
					function(error) {
						steroids.logger.log("failed to get location " + JSON.stringify(error));
					}
				);
			})(self);*/
		},		
	
		getVenues: function () {
			var beers = this.props.beers;
			
			var venues = [];
			_.each(beers, function(i) {
				_.each(i.venues, function(l) {
					if (!_.any(venues, _.matches(l))) {
						venues.push(l);
					}
				});
			});
			
			var byVenue = [];
			_.each(venues, function(i) {
				var venue = [];
				_.each(beers, function(l) {
					_.some(l.venues, function(n) {
						if (i.name === n.name) {
							l._venue = n.name
							var t = _.clone(l);
							if (!_.any(venue, _.matches(t))) {
								venue.push(t);
								return true;
							}
						}
					});
				});
				
				
				byVenue.push(venue);
			});
			
			var beersByVenue = _.sortBy(_.flatten(byVenue, true), '_venue');

			_.each(venues, function(i) {
				var temp = _.filter(beersByVenue, function(l) {
					return l._venue === i.name;
				});
				i.beerCount = temp.length;
			});
			
			console.log(beersByVenue);
			console.log(venues);
			
			this.setState({
				beersByVenue: beersByVenue,
				venues: venues
			});
			
			//this.sortVenues(this.state.activeSort);
		},
		
		getFavoriteVenues: function () {
			var faves = this.state.favorites;
			var venues = this.state.venues;
			
			var fave_venues = [];
			
			_.each(faves, function(i) {
				_.each(venues, function(l) {
					if (l._id === i._id) fave_venues.push(l);
				});
			});

			console.log(venues);
			
			//return fave_venues;
			
			this.setState({
				favoriteVenues: fave_venues
			});
			
		},
		
		handleFavorites: function (faves, operation) {
			var self = this;
			var oldfaves = this.state.favorites.length;
			
			steroids.logger.log("new faves length " + faves.length);
			steroids.logger.log("old faves length " + this.state.favorites.length);
			
			steroids.logger.log("new faves was longer than old");
			var icon = $(this.refs['favoriteButtonIcon'].getDOMNode());
				
			if (operation === 'added') {
				icon.transition({
					duration: '175',
					rotate: '+=72deg'
				});
			}
			
			else {
				icon.transition({
					duration: '175',
					rotate: '-=72deg'
				});
			}
			
			self.setState({
				favorites: faves
			});
			self.getFavoriteVenues();
		},
		
		sortVenues: function (event) {
			var criteria;
			if (event.target) criteria = event.target.value;
			else criteria = event;
			
			console.log("sort criteria is " + criteria);
			var venues = [];

			if (criteria === 'selection') {
				var sorted = _.sortBy(this.state.venues, 'beerCount');
				venues = sorted.reverse();
			}
			
			else {
				venues = this.state.venues;
			}
			
			this.setState({
				venues: venues,
				activeSort: criteria
			});
		},
		
		switchTab: function (tab) {
			var self = this;
				
			if (self.state.animating === true || tab === self.state.activeTab) return;
			$('html, body').velocity("scroll", { duration: 0 });
			//$('html, body').scrollTop(0);
			

			
			var activeTab;
			
			tab === 'main' ? activeTab = 'main' : activeTab = 'favorites';
			
			self.setState({
				activeTab: activeTab,
				animating: true
			});			
			
			var currentTab = this.state.activeTab;
			var main = $(self.refs['mainTab'].getDOMNode());
			var fave = $(self.refs['favoriteTab'].getDOMNode());
			
			//var mains = main.children();
			//var faves = fave.children();
			
			setTimeout(function() {
				self.setState({
					animating: false
				});

			}, 550);
					
			
			if (currentTab === 'main') {
				
				//mains.velocity("transition.slideLeftOut", {stagger: 150, duration: 100 });
				//faves.velocity("transition.slideRightBigIn", {stagger: 150, duration: 350});					

				main.transition({
					x: '-100%',
					duration: '250',
					opacity: '0',
					complete: function() {
						main.css({
							display: 'none'							
						});
					}
				});
				
				fave.css({
					x: '100%',
					opacity: '1',
					scale: '0.7',
					display: 'block'
				});
			
				fave.transition({
					x: '-5%',
					duration: '100',
					scale: '0.85'
				}).transition({
					scale: '1',
					x: '0',
					duration: '250',
					
					complete: function () {
						fave.css({
							x: '0',
							y: '0',
							height: '100%'							
						});
					},
				});
			}
			
			else if (currentTab === 'favorites') {
				fave.transition({
					x: '+100%',
					duration: '250',
					opacity: '0',
					complete: function() {
						fave.css({
							display: 'none'
						});
					}
				});
				
				main.css({
					x: '-100%',
					opacity: '1',
					scale: '0.7',
					display: 'block'
				});
			
				main.transition({
					x: '5%',
					duration: '100',
					scale: '0.85'
				}).transition({
					scale: '1',
					x: '0',
					duration: '250',
					complete: function () {
						main.css({
							x: '0',
							y: '0',
							height: '100%'
						});
					},
				}); 
			}
		},
		
		
		render: function() {
			var self = this;
			

			
			var cx = React.addons.classSet;
			
			var mainButtonClasses = cx({
				'energized' : self.state.activeTab === 'main',
				'icon' : true,
				'ion-ios7-paper-outline' : self.state.activeTab !== 'main',
				'ion-ios7-paper' : self.state.activeTab === 'main',
				'big-icon-header' : true
			});
			
			var favoriteButtonClasses = cx({
				'energized' : self.state.activeTab === 'favorites',
				'icon' : true,
				'ion-ios7-star-outline' : self.state.activeTab !== 'favorites',
				'ion-ios7-star' : self.state.activeTab === 'favorites',
				'big-icon-header' : true,
			});
			
			
			var activeTabMainClasses = cx({
				'selectedTab' : self.state.activeTab === 'main'
			});
			
			var activeTabFavoritesClasses = cx({
				'selectedTab' : self.state.activeTab === 'favorites'
			});
			
			var mainTabClasses = cx({
				'tabContent' : true,
				'hiddenTab' : self.state.activeTab === 'favorites'
			});
			
			var favoritesTabClasses = cx({
				'tabContent' : true,
				'hiddenTab' : self.state.activeTab === 'main'				
			});
			
			
			
			return (
				<div className="content">
					<div className="top-tabs">
						<div className="half center translucent" onClick={this.switchTab.bind(null, 'main')}>
							<i className={mainButtonClasses} ref='mainButtonIcon'></i>
						</div>
						<div className="half center translucent" onClick={this.switchTab.bind(null, 'favorites')}>
							<div ref='favoriteButtonIcon' className="inline-block">
								<i className={favoriteButtonClasses} ></i>
							</div>
						</div>
					</div>
				
					<div className="gap"></div>
				
					<div ref="mainTab" className={mainTabClasses}>
						<div className="padding">
							<label className="item item-input item-select item-icon-right translucent">
								<div className="input-label">
									Sijainti
								</div>

								<select>
									<option>Automaattinen</option>
									<option>Jyväskylä</option>
									<option>Tampere</option>
								</select>
								<i className="icon ion-ios7-navigate-outline sane-icon-size"></i>
							</label>
							<label className="item item-input item-select item-icon-right translucent">
								<div className="input-label">
									Järjestys
								</div>

								<select value={this.state.activeSort} onChange={this.sortVenues}>
									<option value='location'>Etäisyys</option>
									<option value='selection'>Valikoima</option>
								</select>
								<i className="icon ion-ios7-arrow-down sane-icon-size"></i>
							</label>
						</div>
		
						<div className="gap"></div>
		
						<PubList venues={this.state.venues} beersByVenue={this.state.beersByVenue} favorites={this.state.favorites} handleFavorites={this.handleFavorites} />
					</div>


					<div ref="favoriteTab" className={favoritesTabClasses}>
						{this.state.favoriteVenues.length > 0
							?
								<PubList venues={this.state.favoriteVenues} beersByVenue={this.state.beersByVenue} favorites={this.state.favorites} handleFavorites={this.handleFavorites} activeTab={this.state.activeTab} />
							:
								<div className="item center translucent">
									<span className="whiteTitle">Et ole lisännyt yhtään suosikkia.</span>
								</div>
						}

					</div>
				</div>
			);
		}
	});
	
	
	var PubList = React.createClass({
		getInitialState: function () {
			return {
				pannedElement: null,
				selectedPub: null,
			}
		},
		
		componentWillMount: function () {

		},
		
		componentDidMount: function () {
			document.addEventListener("visibilitychange", this.handleVisibilityChange, false);			
		},
		
		componentDidUpdate: function () {
		},

		handleVisibilityChange: function (event) {
			if (!document.hidden) {
				this.setState({
					selectedPub: null
				});
			}
			steroids.logger.log("hidden is " + document.hidden);
		},		
		
		
		showBeerlist: function (venue) {
			this.setState({
				selectedPub: venue._id
			});
			
			var beers = _.filter(this.props.beersByVenue, function(i) {
				return venue.name === i._venue;
			});
			
			console.log("showbeers beerlist " + beers);
			
			var message = {
				recipient: 'beerlistView',
				sender: 'frontView',
				beers: beers,
				venue: venue
			}
			
			window.postMessage(message);
			
			setTimeout(function() {
				steroids.layers.push({ view: beerlistView });
			}, 25);
		},
		
		showBeersForFavorites: function () {
			this.setState({
				selectedPub: 'Suosikit'
			});	
			
			steroids.logger.log("show beers for favorites");
			steroids.logger.log(this.props.favorites);
			
			var favorites = this.props.favorites;
			var allbeers = this.props.beersByVenue;
			var beers = [];
			
			_.each(favorites, function(venue) {
				_.each(allbeers, function(beer) {
					if (beer._venue === venue.name) {
						beers.push(beer);
					}
				});
			});
			
			var venue = {
				name: 'Suosikit'
			}
			
			var message = {
				beers: beers,
				recipient: 'beerlistView',
				sender: 'frontView',
				venue: venue
			}
			
			window.postMessage(message);
			
			setTimeout(function() {
				steroids.layers.push({ view: beerlistView });
			}, 25);
		},
		
		
		getBeerCountForVenue: function (venue) {
			var beers = _.filter(this.props.beersByVenue, function(i) {
				return venue.name === i._venue;
			});
			
			return beers.length;
		},
		
		getBeerCountForFavorites: function () {
			var self = this;
			
			var faves = this.props.favorites;
			var allbeers = this.props.beersByVenue;
			
			var count = 0;
			
			_.each(faves, function(fave) {
				_.each(allbeers, function(beer) {
					if (beer._venue === fave.name) {
						count++;
					}
				});
			});
			
			return count;
		},
		
		
		handlePanLeft: function (element, event) {
			var self = this;
			var item = $(this.refs[element].getDOMNode());
			
			if (item.css('x') === '-59px' || this.state.animating === true) {
				return;
			}
			else {
				this.setState({
					animating: true
				});
				
				
				if (this.state.previousItem) {
					var oldItem = this.state.previousItem;
					var oldFaveItem = this.state.previousFavorite;
						
					oldItem.transition({
						perspective: '1000',						
						x: '0',
						duration: '150'
					});
					
					oldFaveItem.transition({
						opacity: '0',
						duration: '150'
					});
					
					self.setState({
						previousFavorite: null,
						previousItem: null
					});
				}				
				
				var faveButton = $(this.refs[element+'_favorite'].getDOMNode());
				
				item.css({
					x: '0'
				});				

				faveButton.transition({
					opacity: '1',
					duration: '150'
				});
				
				item.transition({
					x: '-99px',
					duration: '100',
				}).transition({
					x: '-59px',
					duration: '150',
					complete: function () {
						self.setState({
							previousItem: item,
							previousFavorite: faveButton
						});
					},
					
				})
			}
			
			setTimeout(function() {
				self.setState({
					animating: false
				});						
			}, 350);
		},
		
		handlePanRight: function (element, event) {
			var item = $(this.refs[element].getDOMNode());
			var self = this;			
						
			if (item.css('x') === '0px' || this.state.animating === true) {
				return;
			}
			else {
				this.setState({
					animating: true
				});				
				
				if (this.state.animatedItem) {
					var oldItem = this.state.previousItem;
					var oldFaveItem = this.state.previousFavorite;
						
					oldItem.transition({
						perspective: '1000',						
						x: '0',
						duration: '150'
					});
					
					oldFaveItem.transition({
						opacity: '0',
						duration: '150'
					});
					
					self.setState({
						previousFavorite: null,
						previousItem: null
					});
				}
				

				var faveButton = $(this.refs[element+'_favorite'].getDOMNode());
				
				item.css({
					x: '-59px'
				});
				
				item.transition({
					perspective: '1000',					
					x: '0px',
					duration: '150',
					complete: function() {
						self.setState({
							animating: false
						});
					}
				});
				faveButton.transition({
					opacity: '0',
					duration: '150'
				});
			}
			
			setTimeout(function() {
				self.setState({
					animating: false
				});						
			}, 350);			
		},
		
		addRemoveFavorite: function (pub) {
			var self = this;
			steroids.logger.log("favorites " + JSON.stringify(this.state.favorites));
			var faves = this.props.favorites || [];
			
			var found = _.some(faves, function(i) {
				if (pub._id === i._id) {
					if (self.props.activeTab === 'favorites') {
						//_.remove(faves, i);
						
								

						var item = $(self.refs[pub.name].getDOMNode());
						var itemFaveButton = $(self.refs[pub.name + '_favorite'].getDOMNode());
						
						item.css({
							x: '0'
						});
						itemFaveButton.css({
							x: '0'
						});
						
						item.transition({
							x: '-100%',
							duration: '350',
							opacity: '0',
							scale: [1.0, 0.0],
							complete: function () {
								_.remove(faves, i);
								self.props.handleFavorites(faves, 'removed');
							},
							//
						});
					
						itemFaveButton.transition({
							x: '100%',
							duration: '350',
							opacity: '0',
							scale: [1.0, 0.0],
							complete: function () {
								
							},
						});
					}
					
					else {
						_.remove(faves, i);
						self.props.handleFavorites(faves, 'removed');
					}
					
					return true;
				}
			});
			
			if (!found) {

				
				var item = $(this.refs[pub.name].getDOMNode());
				var faveButton = $(this.refs[pub.name+'_favorite'].getDOMNode());
				
				item.css({
					x: '-59px'
				});

				item.transition({
					perspective: '1000',
					x: '-79px',
					duration: '200'
				}).transition({
					perspective: '1000',					
					x: '0px',
					duration: '175',
					complete: function() {
						self.setState({
							animating: false
						});
					}
				});
				faveButton.transition({
					opacity: '0',
					duration: '375'
				});				
				
				
				faves.push(pub);
				self.props.handleFavorites(faves, 'added');				
			}
			
			//self.props.handleFavorites(faves);
		},
		
		render: function () {
			var self = this;
			var cx = React.addons.classSet;
			var venues = this.props.venues;
			
			var faveClasses = cx({
				'item': true,
				'item-icon-right': true,
				'translucent': true,
				'unSelectedPub' : true,
				'selectedPub': 'Suosikit' === self.state.selectedPub,
			});
			
			var beerCount = self.getBeerCountForFavorites();
			
			/*var parentClass = cx({
				favorites: this.props.activeTab === "favorites"
			});*/
			
			
			return (
				<div className="favorites">
					{venues.map(function(i) {
						var name = i.name;
				
						var pubClasses = cx({
							'item': true,
							'item-icon-right': true,
							'pointer-events-off': true,
							'translucent': true,
							'unSelectedPub' : true,
							'selectedPub': i._id === self.state.selectedPub
						});
						
						var isFavorite = _.some(self.props.favorites, function(l) {
							if (l._id === i._id) return true
						});						
						
						var faveClasses = cx({
							'icon': true,
							'big-icon': true,							
							'ion-ios7-star-outline': !isFavorite,
							'ion-ios7-star' : isFavorite,
							'unSelectedFavorite' : !isFavorite,
							'energized' : isFavorite,
						});						
				
						var pub_item = 
							<div className={pubClasses}>
								<h2>{i.name}</h2>

								<span className="right smaller">
									<span>{self.getBeerCountForVenue(i)} olutta&nbsp;</span>
									{/*<span>123 m</span>*/}
								</span>

								<i className="icon ion-ios7-arrow-right sane-icon-size"></i>
							</div>
									
						return (
							<div className="hammer-container translateMe" key={'hammer_' + name}>
								<ReactHammer key={name} ref={name} onPanLeft={self.handlePanLeft.bind(null, name)} onPanRight={self.handlePanRight.bind(null, name)} onTap={self.showBeerlist.bind(null, i)} component='div' children={pub_item} />
								<div className="favorite-button" key={name+'_favorite_key'} ref={name+'_favorite'} onClick={self.addRemoveFavorite.bind(null, i)}>
									<i className={faveClasses}></i>
								</div>
							</div>
						)
					})}
					
					<div className="translateMe gap"></div>
					
					{this.props.activeTab === 'favorites' && this.props.favorites.length > 0 
						?
							<div onClick={self.showBeersForFavorites} className="translateMe">
								<div className={faveClasses}>
									<h2>Kaikki oluet suosikeista</h2>
				
									<span className="right smaller">
										<span>{beerCount}</span>
									</span>
						
									<i className="icon ion-ios7-arrow-right sane-icon-size"></i>
								</div>
							</div>

						:
							null
					}
					<div className="translateMe gap"></div>	
				</div>
			)
		},
	});
	
	
	var privateProps = {
		component: true,
		children: true,
		action: true,
		onTap: true,
		onDoubleTap: true,
		
		onPan: true,
		onPanLeft: true,
		onPanRight: true,
		onPanStart: true,
		onPanEnd: true,
		
		onSwipe: true,
		onPress: true,
		onPinch: true,
		onRotate: true
	};

	/**
	 * Hammer Component
	 * ================
	 */

	var ReactHammer = React.createClass({
	
		displayName: 'Hammer',
	
		propTypes: {
			component: React.PropTypes.any,
			className: React.PropTypes.string
		},
	
		getDefaultProps: function() {
			return {

			};
		},
	
		componentDidMount: function() {
			var options = {
				dragLockToAxis: true,
				dragBlockHorizontal: true,
				preventDefault: true,
				recognizers: [
					[Hammer.Pan,
						{
							direction: Hammer.DIRECTION_HORIZONTAL,
							threshold: 65
						}
					],
					[Hammer.Tap,
						{
							enable: true
						}
					]
				]
			};			
			
			this.hammer = new Hammer(this.getDOMNode(), options);
			if (this.props.action)		this.hammer.on('tap press', 	this.props.action);
			if (this.props.onTap)		this.hammer.on('tap',			this.props.onTap);
			if (this.props.onDoubleTap)	this.hammer.on('doubletap',		this.props.onDoubleTap);
			if (this.props.onPan)		this.hammer.on('pan',			this.props.onPan);
			
			if (this.props.onPanLeft)	this.hammer.on('panleft',		this.props.onPanLeft);
			if (this.props.onPanRight)	this.hammer.on('panright',		this.props.onPanRight);
			if (this.props.onPanStart)	this.hammer.on('panstart',		this.props.onPanStart);
			if (this.props.onPanEnd)	this.hammer.on('panend',		this.props.onPanEnd);
			
			if (this.props.onSwipe)		this.hammer.on('swipe',			this.props.onSwipe);
			if (this.props.onPress)		this.hammer.on('press',			this.props.onPress);
			if (this.props.onPinch)		this.hammer.on('pinch',			this.props.onPinch);
			if (this.props.onRotate)	this.hammer.on('rotate',		this.props.onRotate);
		},
	
		componentWillUnmount: function() {
			this.hammer.stop();
			this.hammer.destroy();
			this.hammer = null;
		},
	
		render: function() {
			var props = {};
		
			Object.keys(this.props).forEach(function(i) {
				if (!privateProps[i]) {
					props[i] = this.props[i];
				}
			});
			
			return React.createElement(this.props.component, props, this.props.children);
		}
	});	
}

