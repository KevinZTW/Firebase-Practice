let storedata = function(){

let title = app.get("#title").value
let content = app.get("#content").value
let tag = app.get("#tag").value
let author_id = app.get("#author").value



app.addArticle(title, content, tag, author_id)

}

app.get("#publish").addEventListener("click", function(){
    storedata()
})

app.addDate=function(){

}
//-------------------------------------< The New Part>-----------

//Get friend list and show on query seleciton
