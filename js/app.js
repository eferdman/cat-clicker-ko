//First Knockout App

//Data
var cats = [
		{
			name: "Sally-Anna", 
			imgSrc: "images/cat1.jpg",
			clickCount: 0,
			nicknames: ["Tiny", "BoyBoy", "Youngun", "Garbz"]
		},
		{
			name: "Mr. Grumpkins" ,
			imgSrc: "images/cat2.jpg", 
			clickCount: 0
		},
		{
			name: "Nero", 
			imgSrc: "images/cat3.jpg",
			clickCount: 0
		},
		{
			name: "Barney",
			imgSrc: "images/cat4.jpg", 
			clickCount: 0
		},
		{
			name: "Narnia",
			imgSrc: "images/cat5.jpg",
			clickCount: 0
		},
]

// Model-- the arg data is the object literal
var Cat = function(data) {

	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAttribution = ko.observable(data.imgAttribution);
	this.nicknames = ko.observableArray(data.nicknames);

	// Use a ko.computed to return a dynamic value
	this.level = ko.computed(function() {
		
		if (this.clickCount() >= 10) {
			return "Infant";
		} else {
			return "Newborn";
		}
	}, this);
};

//Make the currentCat change when you click 
//on a cat in the list


//Start by creating the ViewModel
var ViewModel = function() {
	
	//Self will point to the ViewModel,
	// since "this" may point to Cat {}.
	var self = this;

	// Initialize an empty observable array
	this.catList = ko.observableArray(
		[]);

	//Populate the array with cat objects
	cats.forEach(function(cat) {
		self.catList.push( new Cat(cat) );
	})
	
	//This is where our cat lives
	this.currentCat = ko.observable( this.catList()[0] );


	// Increment clicks by 1
	this.incrementCounter = function() {
		self.currentCat().clickCount(self.currentCat().clickCount() + 1);
	};

	this.setCurrentCat = function(clickedCat) {
		//Change the current cat to the clicked cat
		//Remember not to make a new observable object
		//just call the observable with the new value
		self.currentCat(clickedCat);
	};

};

//Tell KO to apply the bindings to the ViewModel
ko.applyBindings(new ViewModel());	