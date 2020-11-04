
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
    await db.collection("user_kevin").doc(app.loginId).collection("friend").get().then((querySnapshot)=>{
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
    let searchidtag = app.get(".searchbyidtag")
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






app.init=function(){
    app.getLoginUser()
    app.appendList(app.getFriendList())
}

app.init()