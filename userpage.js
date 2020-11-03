app.init=function(){
    // SWITCH THE LOGIN HERE!!!
    app.showUser(".invite-list", app.queryPendingUser("kevin123"))
    app.showUser(".user-list",app.getAllUser())
}






// use email to find user
app.getSearchUser =async function(email){
    let users =[]
    console.log(email)
    await db.collection("user_kevin").where("email", "==", email).get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            let data =doc.data()
            let user={
                id:data.id,
                name:data.name,
                email:data.email
            }
            users.push(user)
        })
    }).catch((err)=>console.log(err))
    return users
}



app.handleSearchClick=async function(){
    let email = app.get(".searchbox").value;
    app.get(".user-list").innerHTML =""
    app.showUser(".user-list", app.getSearchUser(email))

}

// when click the add friend button, would get first id and add as friend
//currently set add to "kevin123"
app.handleAddFriend=function(){
    let wrapper = app.get(".user-list")
    let userBId = wrapper.querySelector(".id").textContent
    app.sendInvitation(userBId, "kevin123")
    
}



document.querySelector(".search").addEventListener("click", app.handleSearchClick)
document.querySelector(".addfriend").addEventListener("click", app.handleAddFriend)
app.init()

