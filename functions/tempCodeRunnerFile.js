import { Client_ID } from "./codes";
import { Authorization } from "./codes";

 function popularAndTrending(){
    //api endpoint
    const url = 'https://api.igdb.com/v4/games';

    //body of the post fetch
    const body = 'fields cover.url, name;where release_dates.date > ${Math.floor((Date.now() - 31536000000) / 1000)} & rating > 70;sort popularity desc; limit 30;';

    //options of the fetch call
    const options = {
        method : 'POST',
        headers  : {
            'Client-ID' : Client_ID,
            'Authorization' : Authorization,
        },
        body : body
    }

    //make the fetch from IGDB
    fetch(url,options).then((response) => {
        console.log('Popular games fetched',response);

        // return in json format
        return response.json();
    }).catch((error) => {

        //catch the error
        console.log(error);
    })
}
popularAndTrending()