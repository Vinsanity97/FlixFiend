
var moviePlace = document.querySelector('#movieTitlesHere');
var classThingy = document.querySelector('allClass');
var searchBtn = document.querySelector(".search-button");
var titles = JSON.parse(localStorage.getItem('titles')) || []
var searchInput = document.getElementById('search-input')
var movieImage = document.getElementById('specific-image');
var movieModalTitle = document.getElementById('movieTitleModal');
var releaseTime = document.getElementById('releaseTime');
var theIMDBRating = document.getElementById('ratingIMDB');
var actorList = document.getElementById('actorss-List');



var userInput;
//for now we need to make a global variable for the imdb id to change later on
var clickedId = "";


//entire funtion basically grabs the id of the movie that the user wants to look for so we can look for information within the database.
function movieList(){
//by changing batman content of whatever we search will appear in the code snippet 
//we also gain a list of many movies containing things relating to part(batman)
//make sure to use the tag id ad not the _id in order to get the correct link to the movies use wants to see
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/search/akas/' + userInput;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2db71bd2e5msh510af4e53f1ecc7p1413ddjsn3037148627dd',
		    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    }

//first I fetch the things from da link like all da info n ish
    fetch(url,options)
//we gotta return response first to acess da data cuz it does wierd things idk why
    .then(function (response) {
        return response.json();
      })

//finally we can get to the good bits with all the info we actually want
    .then(function(data){
        console.log('data from moviedatabase', data);
        moviePlace.innerHTML=""
        //checking where we are
        // console.log(data);

        //creating a var to make iteasier to navigate through results
        var movieData = data.results;

        //going to the results since the id tags for the imdb link are in the results
        console.log(movieData[0].originalTitleText.text);

        
        //now we should probaly loop everything inside the array of information we searched
        for(i = 0; i < movieData.length; i++){

            // console.log(movieData[i].originalTitleText.text);
            var movName = movieData[i].originalTitleText.text;
            var mList = document.createElement('button');
            var mainId = movieData[i].id;


            //we then set each item to have the imdb id for later locating on website
            mList.setAttribute('id',mainId)
            mList.setAttribute('class', "btn btn-secondary")
            mList.setAttribute('type', "button")
            mList.setAttribute('data-bs-toggle', "modal")
            mList.setAttribute('data-bs-target', "#reg-modal")
            mList.textContent = movName;
            moviePlace.append(mList);

        }
        //now we just need to use this function to grab id(remember it is the path id and not _id because they are 2 different things we need)
    })
}

//with this function we are able to exxtract the imdb movie id that the user clicks on 
function imdbMovieInfo(){
    //once again change the engin part to whatever we are given to find the exact imdb link for the movie the user searches for
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/' + clickedId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2db71bd2e5msh510af4e53f1ecc7p1413ddjsn3037148627dd',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    fetch(url,options)
    .then(function (response) {
        return response.json();
      })
    .then(function(data){
        //in here we change the modal to the data of whatever the user clicked on.

       console.log('data from imdb:', data.results); 
       releaseTime.innerHTML = "";
       movieModalTitle.innerHTML = ""; //resets title name
       movieImage.setAttribute('src', data.results.primaryImage.url)
       movieImage.setAttribute('class', "poster-image");
       movieModalTitle.append(data.results.originalTitleText.text)
       releaseTime.append("Release Date: ")

       //day
       releaseTime.append(data.results.releaseDate.day + " ")

       //month
       releaseTime.append(data.results.releaseDate.month + " ")

       //year
       releaseTime.append(data.results.releaseDate.year)


       
    }
    )
}

function imdbRatings(){
    const url = 'https://imdb146.p.rapidapi.com/v1/title/?id=' + clickedId;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2db71bd2e5msh510af4e53f1ecc7p1413ddjsn3037148627dd',
		'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
	}
};
fetch(url,options)
    .then(function (response) {
        return response.json();
      })
    .then(function(data){
        console.log(data);
        actorList.innerHTML = " "
        theIMDBRating.innerHTML = "";
        theIMDBRating.append("IMDB Rating: ")
        theIMDBRating.append(data.ratingsSummary.aggregateRating)
        theIMDBRating.append(" /10")
        var actorarray = data.cast.edges;

        
        for(i = 0; i < 3; i++){
            var actName = actorarray[i].node.name.nameText.text;
            var actCharacter = actorarray[i].node.characters[0].name;
            var actList = document.createElement('li');
            
            actList.setAttribute('id', actorarray[i]);
            actList.textContent = actName + " as "+ actCharacter;
            console.log(actName);
            actorList.append(actList);

            
            

            
        }
        
    })


}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

//global variables for actor information
var actorName = document.getElementById('actorName');
var bornDate = document.getElementById('bornDate');
var birthPlace = document.getElementById('birthPlace');
var miniBio = document.getElementById('miniBio');
var actorImage = document.getElementById('actor-image');

//this grabs a random actor from a current top 100 actors list
function topRandomActor(){
    const url = 'https://imdb8.p.rapidapi.com/actors/list-most-popular-celebs?homeCountry=US&currentCountry=US&purchaseCountry=US';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2db71bd2e5msh510af4e53f1ecc7p1413ddjsn3037148627dd',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

fetch(url,options)
    .then(function (response) {
        return response.json();
      })
    .then(function(data){
        console.log(data)
        var ranNum = getRandomInt(100);
        var ranActor = data[ranNum];
        console.log(data[ranNum]);
       
        console.log(typeof ranActor)
        var actID = ranActor.slice(6,15);
        console.log(actID);
        actorInformation(actID);

    })
}

//this function grabs the random actor of the days information and appends it to the index
function actorInformation(actorId){

    const url = 'https://imdb8.p.rapidapi.com/actors/get-bio?nconst=' + actorId;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2db71bd2e5msh510af4e53f1ecc7p1413ddjsn3037148627dd',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

fetch(url,options)
    .then(function (response) {
        return response.json();
      })
    .then(function(data){
        console.log(data)
        actorName.textContent = data.name;
        birthPlace.textContent = data.birthPlace;
        bornDate.textContent = data.birthDate
        miniBio.textContent = data.miniBios[0].text;
        actorImage.setAttribute('src', data.image.url)

       
       
        

    })
}


var historyButton = document.getElementById('history-button');
var historySeached = document.getElementById('history-searched');
//function to show user search history
function titleHistory() {
    var loadTitle = JSON.parse(localStorage.getItem("titles"))

    for(i = 0; i < loadTitle.length; i++){
        var movieListings = document.createElement('li');
        movieListings.setAttribute('class', "history-list");
        movieListings.textContent = loadTitle[i]
        console.log(loadTitle[i])
        historySeached.append(movieListings);
    
    }

}

historyButton.addEventListener("click", function(event){
    moviePlace.innerHTML=""
    historySeached.innerHTML = "";
    event.preventDefault();
    titleHistory();
})




//this part replaces the user input to search for what the movie the user wants
searchBtn.addEventListener("click", function (event) {
    //prevent button and search reseting on click
    event.preventDefault();
// since api can only detect movies in lowercase we replace entire user search to lowercase letters

historySeached.innerHTML = "";
    var userInputLower = searchInput.value.toLowerCase();
    var userInputFormattedArr =[];
   
   
    var userInputSplit = userInputLower.split(" ");
    console.log(userInputSplit);
    for (var i = 0; i < userInputSplit.length; i++) {
        if (userInputSplit[i]!=="of"){
            userInputFormattedArr.push(userInputSplit[i][0].toUpperCase()+userInputSplit[i].slice(1)); 
            
        }else {
            userInputFormattedArr.push(userInputSplit[i])
        }
    }
    
    userInput = userInputFormattedArr.join(" ")
    console.log(userInput);
    searchInput.value=""
    saveTitle()
    movieList()
    imdbMovieInfo();
})



//this event listener grabs the id of the movie that the uer clicked on
moviePlace.addEventListener('click', function(event){

    console.log(event.target.id);
    clickedId = event.target.id;
    imdbRatings();
    imdbMovieInfo();

})

function saveTitle () {
    if (titles.includes(userInput)) return;
    titles.push(userInput);
    localStorage.setItem("titles", JSON.stringify(titles));
};

    topRandomActor();


    function fetchMovies() {
        const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'e53a65a3b2mshbdc4ca9860837bfp1e2c74jsn5f3eff6c44e0',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
          }
        };
        
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    
    
    .then(function(data) {
        console.log(data);
    })
    }

    fetchMovies();

