app.init=function(){
    app.getLoginUser()
    // SWITCH THE LOGIN HERE!!!
    app.showInviteUser(".invite-list", app.queryPendingUser(app.loginId))
    app.showUser(".user-list",app.getAllUser())
}






// use email to find user
app.getSearchUser =async function(email){
    let users =[]
    console.log(email)
    await db.collection("Users").where("email", "==", email).get().then((querySnapshot)=>{
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





document.querySelector(".search").addEventListener("click", app.handleSearchClick)
// document.querySelector(".addfriend").addEventListener("click", app.handleAddFriend)
app.init()

