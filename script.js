

document.addEventListener("DOMContentLoaded" , async ()=>{
    const catergories = 
    document.querySelectorAll(".category") ;
    const articleContainer =
     document.getElementById("news-display") ;
    const leftButton =
     document.getElementById("left") ;
    const rightButton = 
    document.getElementById("right") ;
    const headingContainer =
    document.getElementById("heading") ;
    const countContainer = 
    document.getElementById("count") ;
    const inputContainer = 
    document.getElementById("inputArticle") ;




    let articles = [] ;
    let index = 0 ;
    let currentCategory = "business" ;
    let prevCategoryElement = undefined ;

    let url = `https://newsapi.org/v2/top-headlines?category=${currentCategory}&apiKey=bc89cb9102ef4a858c62e2ae29714a2f`  ;

    function changeHeading(currentCategory){
        headingContainer.textContent = `${currentCategory} news ` ;

        console.log(headingContainer) ;

    } 

    function changeCount(){
        countContainer.textContent = `${index+1}/${articles.length}` ;

    }

    function changeUrl(currentCategory){
        url =`https://newsapi.org/v2/top-headlines?category=${currentCategory}&apiKey=bc89cb9102ef4a858c62e2ae29714a2f` 
    }

    async  function fetchArticles(url){

        try{

            const req = new Request(url) ;
            const res = await fetch(req) ;
            const obj = await res.json() ;

            return obj.articles ;

        }catch(error){
            console.log("error occured") ;
            console.log(error) ;
        }

    }

    function displayArticle(index){

        articleContainer.innerHTML = "" ;

        const article = articles[index] ;


        const publisher = article.source.name;
        const author = article.author;
        const title = article.title;
        const description = article.description;
        const sourceUrl = article.url;
        const img = article.urlToImage;
        const publishedDate = article.publishedAt;
        const content = article.content;

        // Create the container for each article
        const container = document.createElement("div");
        container.classList.add("article");

        // Publisher Section
        const pubCont = document.createElement("div");
        pubCont.classList.add("publisher");
        pubCont.textContent = `publisher : ${publisher}`;
        container.appendChild(pubCont);

        // Author Section
        const authCont = document.createElement("div");
        authCont.classList.add("author");
        authCont.textContent = `Author : ${author}`; 
        container.appendChild(authCont);

        // Title Section
        const titleCont = document.createElement("div");
        titleCont.classList.add("title");
        titleCont.textContent = `Title : ${title}`;  
        container.appendChild(titleCont);

        // Description Section
        const descriptionCont = document.createElement("div");
        descriptionCont.classList.add("description");
        descriptionCont.textContent = `description : ${description}`; 
        container.appendChild(descriptionCont);

        // Image Section
        if (img) {
            const imgCont = document.createElement("img");
            imgCont.classList.add("article-image");
            imgCont.src = img;
            imgCont.alt = title;
            container.appendChild(imgCont);
        }

        // Published Date Section
        const dateCont = document.createElement("div");
        dateCont.classList.add("published-date");
        dateCont.textContent = new Date(publishedDate).toLocaleDateString();
        container.appendChild(dateCont);

        // Content Section
        const contentCont = document.createElement("div");
        contentCont.classList.add("content");
        contentCont.textContent = content;
        container.appendChild(contentCont);

        // Link to the article
        const link = document.createElement("a");
        link.href = sourceUrl;
        link.target = "_blank"; 
        link.textContent = "Read more";
        container.appendChild(link);

        // Append the article to the body or a specific container

        articleContainer .appendChild(container) ;


    }


    catergories.forEach(
        (catergory)=>{

            catergory.addEventListener("click", async ()=>{

                
                const categoryInlowerCase = catergory.textContent.toLowerCase() ;
                index = 0 ;
                changeHeading(catergory.textContent)
                changeUrl(categoryInlowerCase) ;
                if(prevCategoryElement !== undefined){
                    prevCategoryElement.classList.remove("currentCategoryElementStyle") ;
                    
                }
                prevCategoryElement = catergory ;
                catergory.classList.add("currentCategoryElementStyle") ;

                

                const res = await fetchArticles(url) ;
                articles =  res ;


                displayArticle(index) ;
                changeCount() ;


            })
        }
    )

    leftButton.addEventListener("click" , ()=>{

        index-- ;

        if(index < 0){
            index = articles.length -1 ;
        }
        changeCount() ;
        displayArticle(index) ;

    })

    rightButton.addEventListener("click" , ()=>{

        index++ ;

        if(index >= articles.length){
            index = 0 ;
        }
        changeCount() ;


        displayArticle(index) ;

    })

    inputContainer.addEventListener("keydown" , (event)=>{

        if(event.key === "Enter" ){
            const val = Number(inputContainer.value) ;
            index = val-1 ;
            if(index < 0 || index >= articles.length)
                return ;
            displayArticle(index) ;
            changeCount() ;
            
        }


    })

      
    
   
    changeHeading("Business" ) ;

    const res = await fetchArticles(url) ;
    articles =  res ;
    displayArticle(index) ;
    changeCount() ;
    const currentElement= document.querySelectorAll(".category")[0] ;

    console.log(currentElement) ;
    prevCategoryElement = currentElement ;
    currentElement.classList.add("currentCategoryElementStyle") ;


    

})