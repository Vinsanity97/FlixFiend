
var moviePlace = document.querySelector('#movieTitlesHere');
var classThingy = document.querySelector('allClass');

//for now we need to make a global variable for the imdb id to change later on
var clickedId = '';


//entire funtion basically grabs the id of the movie that the user wants to look for so we can look for information within the database.
function movieList(){
//by changing batman content of whatever we search will appear in the code snippet 
//we also gain a list of many movies containing things relating to part(batman)
//make sure to use the tag id ad not the _id in order to get the correct link to the movies use wants to see
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/search/akas/Batman';
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
            mList.setAttribute('class', "allClass")
            mList.textContent = movName;
            moviePlace.append(mList);

        }
        //now we just need to use this function to grab id(remember it is the path id and not _id because they are 2 different things we need)
    })
}


function imdbMovieInfo(imdbID){
    //once again change the engin part to whatever we are given to find the exact imdb link for the movie the user searches for
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/' + imdbID;
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

       console.log(data); 
    }
    )
}



movieList()


moviePlace.addEventListener('click', function(event){

    console.log(event.target.id);
    imdbMovieInfo(event.target.id);

})
