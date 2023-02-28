//import { Client_ID } from "./codes";
//import { Authorization } from "./codes";

const Client_ID = 'kap700e2v542f8g2udfzh6uomld85y'
const Authorization = 'Bearer scgmdprdqso6id4sosy2s09gj60qbi'

//fetch popular and trending games in the past year limited to 40
export async function popularAndTrending(){
    //api endpoint
    const url = 'https://api.igdb.com/v4/games/';

    //body of the post fetch
    const body = `fields cover.url, name,slug;where total_rating != null & total_rating_count > 100 & rating_count > 50 & ( 
        platforms = (48, 49, 130, 6, 12, 9, 41) |
        themes != (42)
    );sort total_rating desc; limit 100;`;

    //options of the fetch call
    const options = {
        method : 'POST',
        headers  : {
            'Client-ID' : Client_ID,
            'Authorization' : Authorization,
            'Content-Type' : 'application/json'
        },
        body : body
    }
    //fetch and store result
    try{
        var result = await fetch(url,options);
    }
    catch(error){
        console.log('error fetching the popular',error)
    }

    //convert to json
    result = await result.json();

    //console.log("fetched result is",result)
    return result
}

export async function search(name){
    //api endpoint
    const url = 'https://api.igdb.com/v4/games/';

    //body of the post fetch
    const body = `fields name,slug,cover.url;search "${name}"; limit 50;`;

    //options of the fetch call
    const options = {
        method : 'POST',
        headers  : {
            'Client-ID' : Client_ID,
            'Authorization' : Authorization,
            'Content-Type' : 'application/json'
        },
        body : body
    }
    //fetch and store result
    try{
        var result = await fetch(url,options);
    }
    catch(error){
        console.log('error fetching the popular',error)
    }

    //convert to json
    result = await result.json();
    return result
}

// fetch gamedetails
export async function gameDetails(slug){
    //api endpoint
    const url = 'https://api.igdb.com/v4/games';

    //body of the post fetch
    const body = `fields category,genres.name,cover.url,first_release_date,involved_companies.company.name,name,platforms.name,rating,rating_count,screenshots.url,similar_games.slug,similar_games.name,similar_games.cover.url,storyline,videos.video_id ;where slug = "${slug}";`;

    //options of the fetch call
    const options = {
        method : 'POST',
        headers  : {
            'Client-ID' : Client_ID,
            'Authorization' : Authorization,
            'Content-Type' : 'application/json'
        },
        body : body
    }

    //fetch and store result
    try{
        var result = await fetch(url,options);
    }
    catch(error){
        console.log('error fetching the popular',error)
    }

    //convert to json
    result = await result.json();
    
    return result[0];
}

// fetch upcoming games limited to 30
export async function comingSoon(){
    //api endpoint
    const url = 'https://api.igdb.com/v4/games';

    //body of the post fetch
    const body = `fields name, cover.url,slug; where release_dates.date > ${Math.floor(Date.now() / 1000)} & release_dates.date != null; sort release_dates.date asc; limit 100;`;

     //options of the fetch call
     const options = {
        method : 'POST',
        headers  : {
            'Client-ID' : Client_ID,
            'Authorization' : Authorization,
            'Content-Type' : 'application/json'
        },
        body : body
    }

    //fetch and store result
    try{
        var result = await fetch(url,options);
    }
    catch(error){
        console.log('error fetching the popular',error)
    }

    //convert to json
    result = await result.json();
    
    return result;
}



// fetch past x days ago
export function pastGames(days){

    const now = new Date();
    const xDaysAgo = new Date(now.setDate(now.getDate() - days));
    const xDaysAgoInSeconds = Math.round(xDaysAgo.getTime() / 1000);
    const currentTimestamp = Math.round(Date.now() / 1000);

    //api endpoint
    const url = 'https://api.igdb.com/v4/games';

    //body of the post fetch
    const body = `fields id , game.cover.url,game.name,game.slug;where first_release_date > ${xDaysAgoInSeconds} & first_release_date < ${currentTimestamp} & version_parent = null;`;

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