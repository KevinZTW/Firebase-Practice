let app ={
    loginId:"user123456"
}
app.getLoginUser=function(){
    const params = new URLSearchParams(window.location.search)
    let login =params.get("user")
    if (login) app.loginId=login;

}

app.get=function(tag){
    let element = document.querySelector(tag)
    return element
}

app.div=function(){
    let div = document.createElement("div")
    return div
}



// Initialize Cloud Firestore through Firebase

   
var db = firebase.firestore();





app.addArticle = function(title, content,tag,author_id){

    db.collection("article").add({
        id:123,
        title:title,
        content:content,
        tag :tag,
        author_id:author_id,
        
        created_time:firebase.firestore.Timestamp.fromDate(new Date()),
    }).then(function(ref) {
        console.log(ref.id);
        ref.update({id:ref.id})
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

}


app.readArticle=function(){
    db.collection("article").where("id","==",'rcI1yu49cXkjJZ8nSrWS').get().then((querySnapshot)=> {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
}

/*
1. login as A 
2. use email to search user 
3. show user fit result
4. add  B as friend (add A to B's invitation)

1. B open invitation list, show A on screen
2. B click accept, add B to A's friend and add A to B's friend

*/ 



// get all user data from userkevin firestore collection
app.getAllUser=async function(){
    let allUser=[]
    await db.collection("user_kevin").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            let data =doc.data()
            let user={
                id:data.id,
                name:data.name,
                email:data.email
            }
            allUser.push(user)
        })
    }).then(()=>console.log(allUser)).catch((err)=>console.log(err))
    return allUser
}
app.addFriend=function(event){
    let userBId = event.target.id
    app.sendInvitation(app.loginId, userBId)
}
app.makeUser=async function(users){
    users = await users
    let div = app.div()
    users.forEach((user)=>{
        let wrapper = app.div()
        wrapper.className="user-wrapper"
        let id = app.div()
        id.textContent = user.id
        id.className ="id"
        let name = app.div();
        name.textContent=user.name
        let email =app.div()
        email.textContent=user.email
        let add = document.createElement("button")
        add.textContent = "Add Friend"
        add.className = "add"
        add.id=user.id
        add.addEventListener("click", app.addFriend)
        wrapper.appendChild(id)
        wrapper.appendChild(name)
        wrapper.appendChild(email)
        wrapper.appendChild(add)
        div.appendChild(wrapper)
    })
    return div
}

app.makeInviteUser=async function(users){
    
    users = await users
   let div = app.div()
   users.forEach((user)=>{
       let wrapper = app.div()
       wrapper.className="user-wrapper"
       let id = app.div()
       id.textContent = user.id
       id.className ="id"
       let name = app.div();
       name.textContent=user.name
       let email =app.div()
       email.textContent=user.email
       let add = document.createElement("button")
       add.textContent = "Accept"
       add.className="accept"
       add.id = user.id;
       add.addEventListener("click", app.acceptInvitation)
       wrapper.appendChild(id)
       wrapper.appendChild(name)
       wrapper.appendChild(email)
       wrapper.appendChild(add)
       div.appendChild(wrapper)
   })
   return div
}

app.showUser =async function(tag, getUser){
    let parent = document.querySelector(tag);
    let userContent = await app.makeUser(getUser)
    parent.appendChild(userContent)    
}
 
app.showInviteUser =async function(tag, getUser){
    let parent = document.querySelector(tag);
    let userContent = await app.makeInviteUser(getUser)
    parent.appendChild(userContent)
    
}




// send invitation <User A> -> <User B>  user A would add to B's invitation
app.sendInvitation=function(userAId, userBId){
    console.log(userAId)
    console.log(userBId)
    let obj={}
    db.collection("user_kevin").doc(userAId).get().then(
        (doc)=>{obj.id =doc.data().id;
                obj.name = doc.data().name;
                obj.email = doc.data().email
        }).then(()=>{console.log(obj);
            db.collection("user_kevin").doc(userBId).collection("invitation").doc(userAId).set(obj)}).catch((err)=>console.log(err))
}

app.queryPendingUser=async function(userId){
    let allUser=[]
    await db.collection("user_kevin").doc(userId).collection("invitation").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            let data =doc.data()
            let user={
                id:data.id,
                name:data.name,
                email:data.email
            }
            allUser.push(user)
        })
    }).then(()=>console.log(allUser)).catch((err)=>console.log(err))
    return allUser
}


app.acceptInvitation=async function(e){
    let userAId = app.loginId
    let userBId = e.target.id
    console.log(userBId)
    let obja={}
    let objb={}
    await db.collection("user_kevin").doc(userAId).get().then(
        (doc)=>{obja.id =doc.data().id;
                obja.name = doc.data().name;
                obja.email = doc.data().email
        })
    await db.collection("user_kevin").doc(userBId).get().then(
        (doc)=>{objb.id =doc.data().id;
                objb.name = doc.data().name;
                objb.email = doc.data().email
        })
    
    db.collection("user_kevin").doc(userAId).collection("invitation").doc(userBId).delete();
    db.collection("user_kevin").doc(userBId).collection("invitation").doc(userAId).delete();
    db.collection("user_kevin").doc(userAId).collection("friend").doc(userBId).set(objb);
    db.collection("user_kevin").doc(userBId).collection("friend").doc(userAId).set(obja);
}


// app.acceptInvitation("fiona456","rock123")







app.add=function(userid){
    let test=""
    db.collection("user_kevin").doc("sophia123").get().then((doc)=>{doc.data()})

}

app.add()






// db.collection("article")
//     .onSnapshot(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//             console.log("article=", doc.data())
//         });
//     });






