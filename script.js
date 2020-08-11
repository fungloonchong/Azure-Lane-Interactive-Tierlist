let maincont;
let ships;

window.onload = async function(){
  maincont = document.getElementsByClassName("main")[0]
  ships = await getjson()
  let geticons = document.querySelectorAll(".icon1")
  geticons.forEach(
    function(iconadd) {
      iconadd.addEventListener("click", function () {
        buildhtml(this.id)
    }, false);
    }
  )
  buildhtml(1)
}

async function getjson() {
    try {
    let data = await fetch("ships.json")
    let result = await data.json();
    return result
    } catch (e) {
      console.error(e);
    }
  }

async function countspaces(a1) {
  let count = (a1.split(" ").length - 1);
  return count
}

async function tiersize(a1) {
  let result
  let rawresult
  if (a1 <= 6) {
    result = "220px"
    rawresult = 220
  }
  
  if (a1 >6 && a1 <10) {
    result = "330px"
    rawresult = 330
  }
  
  if (a1 <13 && a1 >9) {
    result = "440px"
    rawresult = 440
  }
  
  if (a1 <16 && a1 >12) {
    result = "550px"
    rawresult = 550
  }
  if (a1 >19 && a1 >15) {
    result = "660px"
    rawresult = 660
  }
  if (a1 >18) {
    result = "1.540px"
    rawresult = 1.540
  }
  
  return { result, rawresult }
/*
kleiner oder 6 -  3x2

zwischen 7 und 9 - 3x3

zwischen 10 und 12 - 3x4

zwischen 13 und 15 - 3x5

zwischen 16 und 18 - 3x6

mehr als 18 - 3x14

<= 6
>6 && <10
<13 && >9
<43 && >12 :monkaHmm:
*/
}

async function texthandler(a1, a2) {
  let className
  let fontSize
  let lineHeight
  if (a1 >= 13) {
     className = "shipnamealt";
     if (a1 >= 13 && await countspaces(a2) == 0) {
       fontSize = "10px"
       lineHeight = "2"
     }
     if (a1 >= 13 && await countspaces(a2) == 1) {
       if (a2 == "Le Triomphant") {
          fontSize = "11px"
        } else {
       fontSize = "10px"
       }
     }
     if (a1 >= 17) {
       fontSize = "11px"
     }
   } else {
     if (await countspaces(a2) >= 1) {
      fontSize = "10px"
     }
     className = "shipname";
   }
  return { className, fontSize, lineHeight }
}

async function tiertext(a1) {
  var result = a1.toUpperCase();
  return result
}

async function buildhtml(a1) {
  let shipobj = Object.entries(ships)
  //for (let i = 0; i < shipobj.length; i++) {
  document.getElementsByClassName("main")[0].innerHTML = ""
  for (let i = (a1 - 1); i < a1 && i < (a1 + 1); i++) {
  let t = document.createElement("div");
  t.className = shipobj[i][0]
  maincont.appendChild(t);
    
  for (let ii = 0; ii < Object.keys(shipobj[i][1]).length && ii < 5; ii++) {
  let s = document.createElement("div");
  s.className = Object.keys(shipobj[i][1])[ii];
  let sizecheck = await tiersize(shipobj[i][1][Object.keys(shipobj[i][1])[ii]].length)
  s.style.width = sizecheck.result
  document.getElementsByClassName(shipobj[i][0])[0].appendChild(s);
    
  let f = document.createElement("div");
  f.className = "tierbanner";
  let ttext = await tiertext(Object.keys(shipobj[i][1])[ii])
  f.innerHTML = ttext
  f.style.width = (sizecheck.rawresult -10) + "px"
  document.getElementsByClassName(shipobj[i][0])[0].getElementsByClassName(Object.keys(shipobj[i][1])[ii])[0].appendChild(f);
    
  await filltier(t.className, s.className);
  }
  }
}

async function filltier(a1, a2) {
 for (let i = 0; i < ships[`${a1}`][`${a2}`].length; i++) {
 // Main div
 let a = document.createElement("div");
  a.className = "parent";
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].appendChild(a);
  // thumbnail
  a = document.createElement("img");
  a.className = "thumbnail";
  a.src = ships[`${a1}`][`${a2}`][i].thumbnail;
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].appendChild(a);
  // Bannerright
  if (ships[`${a1}`][`${a2}`][i].banner != null) {
  a = document.createElement("img");
  a.className = "bannerright";
  a.src = ships[`${a1}`][`${a2}`][i].bannerlink;
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].appendChild(a);
  }
  // Bannerleft
  if (ships[`${a1}`][`${a2}`][i].banneralt != null) {
  a = document.createElement("img");
  a.className = "bannerleft";
  a.src = ships[`${a1}`][`${a2}`][i].banneraltlink;
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].appendChild(a);
  }
  // Tags
  if (ships[`${a1}`][`${a2}`][i].tags != null) {
  for (let ii = 0; ii < ships[`${a1}`][`${a2}`][i].tags.length; ii++) {
  a = document.createElement("img");
  a.className = "tag" + (ii + 1);
  a.src = "Assets/TagIcons/EN/" + ships[`${a1}`][`${a2}`][i].tags[ii] + ".png";
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].appendChild(a);
  }
  }
  // Greyblock
  a = document.createElement("img");
  a.className = "greyblock";
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].appendChild(a);
  // Hulltype
  a = document.createElement("img");
  a.className = "hulltype";
  a.src = "Assets/HullTypeIcons/" + ships[`${a1}`][`${a2}`][i].hullTypeId + ".png";
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].appendChild(a);
  // Textblock
  a = document.createElement("div");
  a.className = "text";
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].appendChild(a);
  // Span text
  a = document.createElement("span");
   let textcheck = await texthandler(ships[`${a1}`][`${a2}`][i].names.en.length, ships[`${a1}`][`${a2}`][i].names.en)
   
   if (textcheck.className != undefined) {
     a.className = textcheck.className
   }
   
   if (textcheck.fontSize != undefined) {
     a.style.fontSize = textcheck.fontSize
   }
   
   if (textcheck.lineHeight != undefined) {
     a.style.lineHeight = textcheck.lineHeight
   }
  a.innerHTML = ships[`${a1}`][`${a2}`][i].names.en
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].getElementsByClassName("text")[0].appendChild(a);
}
}
