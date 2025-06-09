

function getUrl(category){
     let url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=bc89cb9102ef4a858c62e2ae29714a2f`;
     return url ;
}

export default getUrl ;