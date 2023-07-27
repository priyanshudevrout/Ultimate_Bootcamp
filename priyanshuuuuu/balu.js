let val = [];
let i;
// console.log(val);
// document.write("HEllo");

// console.clear();
// console.log("Hello");

function getRecipie(value) {
  // alert(value);
  //   let val = [];
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      //Here we will find out all the items named value=Tandoor Paneer Tikka and keep the searched values in the val variable which is an Array

      data.forEach((e) => {
       
        for (i = 0; i < e.recipie.length; i++) {
          // console.log(e.recipie[i].recipieName);
          if (e.recipie[i].recipieName === value) {

            val.splice(1, 0, e.recipie[i]);
            // console.log(val[1]);
          }
        }
      });
      // console.log(val[0]);
      
      //To find the MAx RAting product
      let index = 0;
      if (val.length != 0) {
        let max = val[0].rating;

        for (i = 1; i < val.length; i++) {
          //Now we will assign the max rated food in to the HTML elements
          if (val[i].rating > max) {
            max = val[i].rating;
            index = i;
          }
        }
  //now we got max rating
        
console.log(index);
        // Now we have assign the data to the html elements of recipie.html

        // youtube.setAttribute("src","val[index].videoLink");
        // ingredients.innerHTML=val[index].ingredients;

        localStorage.setItem("userid", val[index].userid);
        localStorage.setItem("recipieid", val[index].id);
        window.location.href = "recipie.html";
      } else {
        alert("No Data Found");
      }

      // alert(max);

      return val[index];
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function gotRecipie() {
  let userid = localStorage.getItem("userid");
  let recipieid = localStorage.getItem("recipieid");

  // console.log(recipieid);
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      data.forEach((el) => {
        // console.log(userid);
        if (userid == el.id) {
          for (i = 0; i < el.recipie.length; i++) {
            // console.log(recipieid);
            if (el.recipie[i].id == recipieid) {
              // console.log(el.recipie[i]);

              const ingredients = document.getElementById("ingredients");
              const youtube = document.getElementById("youtube");

              ingredients.innerHTML = el.recipie[i].ingredients;
              youtube.setAttribute("src", el.recipie[i].videoLink);

              creatediv(el.recipie[i].steps);
            }
          }
        } else {
          console.log("False");
        }
      });
    });
}

function creatediv(value) {
  let div = document.getElementById("recipie-container");

  console.log(div);
  for (i = 0; i < value.length; i++) {
    let p = document.createElement("p");
    p.innerHTML = value[i] + "<br>";
    div.appendChild(p);
  }
}