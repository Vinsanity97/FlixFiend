
var moviePlace = document.querySelector('#movieTitlesHere');
var classThingy = document.querySelector('allClass');
var searchBtn = document.querySelector(".search-button");
var titles = JSON.parse(localStorage.getItem('titles')) || []
var searchInput = document.getElementById('search-input')
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
            mList.setAttribute('class', "btn btn-primary")
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

       console.log('data from imdb:', data); 

       
    }
    )
}


//this part replaces the user input to search for what the movie the user wants
searchBtn.addEventListener("click", function (event) {
    //prevent button and search reseting on click
    event.preventDefault();
// since api can only detect movies in lowercase we replace entire user search to lowercase letters
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
    imdbMovieInfo();

})

function saveTitle () {
    if (titles.includes(userInput)) return;
    titles.push(userInput);
    localStorage.setItem("titles", JSON.stringify(titles));
};

    //click event to display any city data from history
