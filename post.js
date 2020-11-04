
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
app.getFriendList =async function(){
    let frienduser=[]
    await db.collection("Users").doc(app.loginId).collection("friendList").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            let data =doc.data()
            let user={
                id:data.id,
                name:data.name,
                email:data.email
            }
            frienduser.push(user)
        })
    }).then(()=>console.log(frienduser)).catch((err)=>console.log(err))
    return frienduser
}

app.appendList=async function(users){
    users = await users
    console.log(users)
    let searchidtag = app.get(".searchbyidtagid")
    let searchid = app.get(".searchbyid")
    users.forEach((user)=>{
        let frienda = document.createElement("option");
        let friendb = document.createElement("option");
        frienda.textContent= user.id;
        friendb.textContent= user.id;
        searchidtag.appendChild(frienda);
        searchid.appendChild(friendb)
    })
}



app.searchPost= function(id, tag){
    if(id&&tag){ 
        console.log("here!")
        db.collection("article").where("author_id", "==", id).where("tag", "==", tag).get().then((snap)=>snap.forEach(i=>console.log(i.data()))); } 
    else if (id){
         db.collection("article").where("author_id", "==", id).get().then((snap)=>snap.forEach(i=>console.log(i.data())));  }
    else{
        console.log("hihi")
        db.collection("article").where("tag", "==", tag).get().then((snap)=>snap.forEach(i=>console.log(i.data()))); }
    }



app.init=function(){
    app.getLoginUser()
    app.appendList(app.getFriendList())
}

let searchid = app.get(".search-byid-button")
searchid.addEventListener("click", function(){
    let id = app.get(".searchbyid").value
    app.searchPost(id)
    console.log("search by id")
})

let searchtag = app.get(".search-bytag-button")
searchtag.addEventListener("click", function(){
    let tag = app.get(".searchbytag").value
    app.searchPost(null, tag)
    console.log("search by tag")
})

let searchidtag = app.get(".search-byidtag-button")
searchidtag.addEventListener("click", function(){
    let id = app.get(".searchbyidtagid").value
    let tag = app.get(".searchbyidtagtag").value
    app.searchPost(id, tag);
})

app.init()