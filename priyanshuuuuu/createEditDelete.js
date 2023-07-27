
async function getData(){
    const url="http://localhost:3000/rook";
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log("data",data);
        displaydata(data);
})
.catch(error=>{
    console.log("error",error);
})
}
function displaydata(data){
    const res=document.getElementById('form-container');
    data.forEach(item=>{
            const recipename = document.createElement('h3');
            const rating = document.createElement('p');
            const ingredents = document.createElement('p');
            const steps = document.createElement('p');
            const del = document.createElement('button');
            const edit = document.createElement('button');
            const hr = document.createElement('hr');
            recipename.innerText = "RECIPE:  " +item.recipieName;
            rating.innerText = "RATING:  " +item.rating;
            ingredents.innerText= "INGREDIENTS:  "+ item.ingredients;
            steps.innerText = "STEPS:  " +item.steps ;
     
            edit.innerText = "Edit Recipe";
            del.innerText = "Delete Recipe";
            

            edit.addEventListener('click', () => {
                handleEdit(item.id);
            });

            del.addEventListener('click', () => {
                handleDelete(item.id);
            });

            res.append( recipename, rating, ingredents, steps, edit, del,hr);
        })
    }


// edit

function handleEdit(id){
    const recipename=window.prompt("Enter recipie-name");
    const img=window.prompt("Enter img-link");
    const video=window.prompt("Enter video-link");
    const rating=window.prompt("Enter rating");
    if(recipename=="" || img==""|| video==" " || rating==" ")
    {
        alert('kindly fill all details');

    }
    else{
    const url= `http://localhost:3000/rook/${id}`;


    let stringi="";
alert("please enter in the format of 1.abc,2.erf,3.rttt and so on")
        const ingredient=window.prompt("Enter ingredients");
        stringi=ingredient;
    console.log(stringi.split(","))

    let strings="";
    alert("please enter in the format of 1.abc,2.erf,3.rttt and so on")
            const stepss=window.prompt("Enter steps");
            strings=stepss;
        console.log(strings.split(","))
    const updatedata={
        recipieName:recipename,
        imgLink:img,
        videoLink:video,
        ingredients:stringi.split(","),
        steps:strings.split(","),
        rating:rating
    };


    fetch(url,{
    method:'PUT',
    headers:{
        'content-Type':'application/json'
    },
   
    
    body:JSON.stringify(updatedata)
    })
    .then(response=>{
        if(response.ok){
            alert(`RECIPIE with Id ${id} updated:`);
        }
        else{
            throw new Error(`error in updating the RECIPIE`);
        }
    })
    .catch(error=>{
        console.log(error);
    })
 }
}

//delete
function handleDelete(id){
    fetch(`http://localhost:3000/rook/${id}`,{
    method:'DELETE'
    })
    .then(response=>{
       if(response.ok){
           alert(`RECIPIE with Id ${id} deleted:`);
       }
       else{
           throw new Error(`error in deleting the RECIPIE`);
       }
    })
    .catch(error=>{
       console.log(error);
    })
}



//post-data function
function add()
{
    const recipename=document.getElementById('recipiename').value;
    const img=document.getElementById('img').value;
    const video=document.getElementById('video').value;
    const rating=document.getElementById('rating').value;
    const ingredient=document.getElementById('ingredients').value;
    const stepss=document.getElementById('step').value;
    if(recipename==""||img==""||video==""||ingredient==""||step==""||rating=="")
    {
        alert("Fill all required fields carefully");
    }
    else{
        alert("Your RECIPIE added succesfully");
        let stringi="";
            stringi=ingredient;
        console.log(stringi.split(","))
    
        let strings="";
                strings=stepss;
            console.log(strings.split(","))
        const newrecipe={
        recipieName:recipename,
        imgLink:img,
        videoLink:video,
        ingredients:stringi.split(","),
        steps:strings.split(","),
        rating:rating
    }
    
    fetch("http://localhost:3000/rook",{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(newrecipe)
})
 }}
