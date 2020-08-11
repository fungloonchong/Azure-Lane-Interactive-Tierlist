let maincont;
let ships;

window.onload = async function(){
  maincont = document.getElementsByClassName("main")[0]
  ships = await getjson()
  buildhtml()
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

async function buildhtml() {
  let t = document.createElement("div");
  t.className = "destroyer";
  maincont.appendChild(t);
  let s = document.createElement("div");
  s.className = "t0";
  document.getElementsByClassName("destroyer")[0].appendChild(s);
  await filltier(t.className, s.className);
  
}

async function filltier(a1, a2) {
  console.log(ships[`${a1}`][`${a2}`])
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
  for (let ii = 0; ii < ships[`${a1}`][`${a2}`][i].tags.length; ii++) {
  a = document.createElement("img");
  a.className = "tag" + (ii + 1);
  a.src = "Assets/TagIcons/EN/" + ships[`${a1}`][`${a2}`][i].tags[ii] + ".png";
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].appendChild(a);
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
  a.className = "shipname";
  a.innerHTML = ships[`${a1}`][`${a2}`][i].names.en
  document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i].getElementsByClassName("text")[0].appendChild(a);
}
}