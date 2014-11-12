// Display the native navigation bar with the title "Hello World!"
steroids.view.navigationBar.show("Oluttutka");

// Set the WebView background color to white (effective on iOS only)
steroids.view.setBackgroundColor("#eee");

function viewModel() {
	var self = this;
	
	var beers = [];
	var styles = [];
	var pubs = [];
	var breweries = [];
	var countries = [];
	
	
	function getBeer(name, brewery, abv, country, type, pub) {
		var beer = {
			name : name,
			brewery : brewery,
			abv : abv,
			country : country,
			type : type,
			pub: pub
		}
		var style = {
			type: type
		}
		var pub = {
			pub: pub
		}
		var country = {
			country: country
		}
		var brewery = {
			brewery : brewery
		}

		if (!_.any(pubs, _.matches(pub)))
			pubs.push(pub);

		if (!_.any(styles, _.matches(style)))
			styles.push(style);

		
		if (!_.any(breweries, _.matches(brewery)))
			breweries.push(brewery);
	
		
		if (!_.any(countries, _.matches(country)))
			countries.push(country);

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
	
	
	var beers = _.sortBy(beers, function(i) { return i.name });

	

	self.beers = ko.observableArray();
	self.filteredBeers = ko.observableArray();
	self.beerSearch = ko.observable("");
	
	self.abvLimit = ko.observable(0.0);
	
	self.selectedStyles = ko.observableArray();
	self.selectedPubs = ko.observableArray();

	self.pubs = ko.observableArray();
	self.styles = ko.observableArray();
	
	self.breweries = ko.observableArray();
	self.selectedBreweries = ko.observableArray();
	
	self.countries = ko.observableArray();
	self.selectedCountries = ko.observableArray();

	ko.mapping.fromJS(styles, {}, self.styles);
	ko.mapping.fromJS(pubs, {}, self.pubs);	
	
	ko.mapping.fromJS(breweries, {}, self.breweries);
	ko.mapping.fromJS(countries, {}, self.countries);	
	
	//ko.mapping.fromJS(pubs, {}, self.selectedPubs);
	
	self.isChecked = function(value, obsArray) {
		var value = ko.toJS(value);
		if (_.contains(obsArray(), value)) {
			return true;
		}
	}
	
	self.addOrRemoveValue = function(value, obsArray) {
		var value = ko.toJS(value);
		if (!_.contains(obsArray(), value)) {
			obsArray.push(value);
		} else {
			_.remove(obsArray(), _.matches(value));
		}
		obsArray.valueHasMutated();
	}
	
	/*var ceres = new Asteroid("oluttutka.meteor.com");
	var beers = ceres.getCollection("beers");
	var futureValue = ceres.call("listBeers");
	futureValue.result.then(function (value) {
		value.forEach(function(beer) {
			steroids.logger.log(beer.name);
		});
	}, function (reason) {
		steroids.logger.log("Reason " + reason);
	});	*/

	self.showCountryFilter = ko.observable(false);
	self.showBreweryFilter = ko.observable(false);
	self.showStyleFilter = ko.observable(false);
	self.showAbvSlider = ko.observable(false);
	
	
	
	self.toggleCategoryVisibility = function(array, category) {
		if (category === "countries") {
			array([]);
			if (self.showCountryFilter() === true) {
				self.showCountryFilter(false);
				/*_.each(countries, function(i) {
					self.addOrRemoveValue(i, self.selectedCountries);
				});*/
			}
			else {
				self.showCountryFilter(true);

			}
		}
		if (category === "breweries") {
			array([]);
			if (self.showBreweryFilter() === true) {
				self.showBreweryFilter(false);
				/*_.each(breweries, function(i) {
					self.addOrRemoveValue(i, self.selectedBreweries);
				});*/
			}
			else {
				self.showBreweryFilter(true);
			}
		}
		if (category === "styles") {
			array([]);
			if (self.showStyleFilter() === true) {
				self.showStyleFilter(false);
				/*_.each(styles, function(i) {
					self.addOrRemoveValue(i, self.selectedStyles);
				});*/
				
			}
			else {
				self.showStyleFilter(true);
			}
		}
		if (category === "abv") {
			if (self.showAbvSlider() === true) {
				//steroids.logger.log("in abv check");
				self.showAbvSlider(false);
				self.abvLimit(0.0);
			}
			else {
				self.showAbvSlider(true);
				self.abvLimit(0.0);
			}
		}
		
		if (array) {
			//array.valueHasMutated();			
		}

	}
	
	_.each(self.pubs(), function(i) {
		self.addOrRemoveValue(i.pub(), self.selectedPubs);
	});
	
	
	self.filterCountry = ko.computed(function() {
		//var countries = [];
		//var breweries = [];
		//var styles = [];
		var pubs = ko.mapping.toJS(self.selectedPubs);
		//var countries = ko.mapping.toJS(self.selectedCountries);
		var countries = [];
		
		_.each(beers, function(i) {
			if (_.any(pubs, _.matches(i.pub))) {
				var country = {
					country : i.country
				}
				
				if (!_.any(countries, _.matches(country))) {
					countries.push(country);
				}
			}		
		});
		
		var sortedCountries = _.sortBy(countries, function(i) { return i.country });

		ko.mapping.fromJS(sortedCountries, {}, self.countries);
		/*ko.mapping.fromJS(breweries, {}, self.breweries);
		ko.mapping.fromJS(sortedStyles, {}, self.styles);*/
		
    }).extend({
        rateLimit: {
            method: "notifyWhenChangesStop",
            timeout: 250
        }
    });
	
	self.filterBrewery = ko.computed(function() {
		var countries = ko.mapping.toJS(self.selectedCountries);
		
		var breweries = [];
		
		_.each(beers, function(i) {
			if (_.any(countries, _.matches(i.country)) || countries.length === 0 ) {
				
				var brewery = {
					brewery : i.brewery
				}				
				
				if (!_.any(breweries, _.matches(brewery))) {
					breweries.push(brewery);
				}
			}
		});
		
		var sortedBreweries = _.sortBy(breweries, 'brewery');
		
		ko.mapping.fromJS(sortedBreweries, {}, self.breweries);		
		
    }).extend({
        rateLimit: {
            method: "notifyWhenChangesStop",
            timeout: 250
        }
    });
	
	self.filterStyle = ko.computed(function() {
		var breweries = ko.mapping.toJS(self.selectedBreweries);
		var countries = ko.mapping.toJS(self.selectedCountries);
		
		var styles = [];
		
		
		_.each(beers, function(i) {
			if (_.any(breweries, _.matches(i.brewery)) || ( _.any(countries, _.matches(i.country)) && breweries.length === 0) || (breweries.length === 0 && countries.length === 0) ) {
				
				var style = {
					type : i.type
				}
				
				if (!_.any(styles, _.matches(style))) {
					styles.push(style);
				}
			}
		});
		
		var sortedStyles = _.sortBy(styles, function(i) { return i.type } );
		
		ko.mapping.fromJS(sortedStyles, {}, self.styles);		
		
    }).extend({
        rateLimit: {
            method: "notifyWhenChangesStop",
            timeout: 250
        }
    });
		
	
	self.filterBeers = ko.computed(function() {
		if(beers.length > 0 && typeof self.beerSearch() !== 'undefined') {
			var f = self.beerSearch();
			var limit = self.abvLimit();
			
			if (f.length > 0)
				f = f.toLowerCase();
				
				
			//steroids.logger.log("searching for " + f);
			
			var pubs = ko.mapping.toJS(self.selectedPubs);
			var countries = ko.mapping.toJS(self.selectedCountries);
			var brewery = ko.mapping.toJS(self.selectedBreweries);

			var filt = _.filter(beers, function(item) {
				
				if (parseFloat(limit) > parseFloat(item.abv)) return;
				
				if (!_.any(pubs, _.matches(item.pub)))
					return;
				
				if (!_.contains(self.selectedCountries(), item.country) && self.selectedCountries().length > 0) return;
				if (!_.contains(self.selectedBreweries(), item.brewery) && self.selectedBreweries().length > 0) return;
				
				
				if (!_.contains(self.selectedStyles(), item.type) && self.selectedStyles().length > 0)
					return;
				
				if (_.contains(item.name.toLowerCase(), f) || _.contains(item.country.toLowerCase(), f) || _.contains(item.type.toLowerCase(), f) || _.contains(item.pub.toLowerCase(), f)) {
					return item;
				}
			});

			self.filteredBeers([]);
			self.filteredBeers.push.apply(self.filteredBeers, filt);
		}

    }).extend({
        rateLimit: {
            method: "notifyWhenChangesStop",
            timeout: 250
        }
    });
	
	
	
	
	

	/*window.addEventLister("message", function(event) {
		if(event.data.recipient == "front") {
		}
	});*/
		
		
		
	ko.bindingHandlers.fadeVisible = {
		init: function(element, valueAccessor) {
			var shouldDisplay = valueAccessor();
			var el = $(element);
			el.toggle(shouldDisplay);
		},
		update: function(element, valueAccessor) {
			var shouldDisplay = valueAccessor();
			var el = $(element);

			if (shouldDisplay == true) {
				el.css({
					visibility: 'visible'
				});
				el.transition({
					opacity: '1',
					duration: '350ms'
				});
			}
			else {
				el.transition({
					opacity: '0',
					duration: '350ms',
					complete: function() {
						el.css({ visibility: 'hidden'});						
					}
				});

			}
		}
	};		
}

$(document).ready(function() {
	window.vm = new viewModel;
	ko.applyBindings(vm, document.getElementById('main'));
	
	var deviceready = false, steroidsready = false, socketready = false;

	function onLoad() {
		if (deviceready && steroidsready && socketready) {
			document.dispatchEvent(new Event("fullyloaded"));
		}
	}

	steroids.on("ready", function () {
		steroidsready = true;
		onLoad();
	});

	document.addEventListener('deviceready', function () {
		deviceready = true;
		onLoad();
	}, false);	
	
	function onFullyLoaded() {
		//vm.init():
	}
});
