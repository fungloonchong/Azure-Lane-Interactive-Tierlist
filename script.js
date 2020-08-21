let maincont;
let ships;
let identid;
let identmain;
let language;
let languageid = "en";


window.onload = async function () {
  maincont = document.getElementsByClassName("main")[0];
  ships = await getjson();
  let gethulltype = document.querySelectorAll(".hulltypefilter");
  await nodrag("hulltypefilter")
  gethulltype.forEach(function (hulltypeadd) {
    hulltypeadd.addEventListener(
      "click",
      function () {
        buildhulltypehtml(this.id);
      },
      false
    );
  });
  let rarityfilter = document.querySelectorAll(".rarityfilter");
  await nodrag("rarityfilter")
  rarityfilter.forEach(function (rarityadd) {
    rarityadd.addEventListener(
      "click",
      function () {
        buildrarityhtml(this.id);
      },
      false
    );
  });
  let tagfilter = document.querySelectorAll(".tagfilter_en, .tagfilter_cn");
  await nodrag("tagfilter_en")
  await nodrag("tagfilter_cn")
  tagfilter.forEach(function (tagadd) {
    tagadd.addEventListener(
      "click",
      function () {
        buildtaghtml(this.id);
      },
      false
    );
  });
  let tierfilter = document.querySelectorAll(".tierfilter");
  await nodrag("tierfilter")
  tierfilter.forEach(function (tieradd) {
    tieradd.addEventListener(
      "click",
      function () {
        buildtierhtml(this.id);
      },
      false
    );
  });
  let nationalityfilter = document.querySelectorAll(".nationality");
  await nodrag("nationality")
  nationalityfilter.forEach(function (nationalityadd) {
    nationalityadd.addEventListener(
      "click",
      function () {
        buildnationalityhtml(this.classList[1]);
      },
      false
    );
  });
  // Namechange selector
  let langchange = document.querySelectorAll(".lang");
  langchange.forEach(function (langadd) {
    langadd.addEventListener(
      "click",
      function () {
        shipnamecheck(this.classList[1], this.id);
      },
      false
    );
  });
  buildhtmlall();
  async function nodrag(a1) {
    var images = document.getElementsByClassName(a1);
    var i
    for (i = 0; i < images.length; i++) {
      var addnodrag = images[i];
      if (addnodrag.draggable == true) {
        addnodrag.draggable = false;
      }
    }
  }
};

window.onclick = function (event) {
  if (!event.target.matches('.' + identmain)) {
    var dropdowns = document.getElementsByClassName(identid + "-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    identmain = undefined
    identid = undefined
  }
  if (!event.target.matches('.legend-dot-dropbtn')) {
    var dropdowns = document.getElementsByClassName("legend-dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
// Namechange function
async function shipnamecheck(a1, a2) {
  switch (a1) {
    case "en":
      languageid = "en"
      if (!document.getElementsByClassName("en")[0].classList.contains('active')) {
        document.getElementsByClassName("en")[0].classList.add('active')
      }
      document.getElementsByClassName("jp")[0].classList.remove('active');
      document.getElementsByClassName("cn")[0].classList.remove('active');
      for (let i = 0; i < document.getElementsByClassName("text_en").length; i++) {
        if (!document.getElementsByClassName("text_en")[i].classList.contains('show')) {
          document.getElementsByClassName("text_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("text_jp")[i].classList.contains('show')) {
          document.getElementsByClassName("text_jp")[i].classList.remove('show')
        }
        if (document.getElementsByClassName("text_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("text_cn")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("tagfilter_en").length; i++) {
        if (!document.getElementsByClassName("tagfilter_en")[i].classList.contains('show')) {
          document.getElementsByClassName("tagfilter_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("tagfilter_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("tagfilter_cn")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("legendicon_en").length; i++) {
        if (!document.getElementsByClassName("legendicon_en")[i].classList.contains('show')) {
          document.getElementsByClassName("legendicon_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("legendicon_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("legendicon_cn")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("legendspan_en").length; i++) {
        if (!document.getElementsByClassName("legendspan_en")[i].classList.contains('show')) {
          document.getElementsByClassName("legendspan_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("legendspan_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("legendspan_cn")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("tags_en").length; i++) {
        if (!document.getElementsByClassName("tags_en")[i].classList.contains('show')) {
          document.getElementsByClassName("tags_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("tags_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("tags_cn")[i].classList.remove('show')
        }
        for (let ii = 0; ii < document.getElementsByClassName("tags_en")[i].children.length; ii++) {
          if (!document.getElementsByClassName("tags_en")[i].children[ii].classList.contains('show')) {
            document.getElementsByClassName("tags_en")[i].children[ii].classList.add('show')
          }
          if (document.getElementsByClassName("tags_cn")[i].children[ii].classList.contains('show')) {
            document.getElementsByClassName("tags_cn")[i].children[ii].classList.remove('show')
          }
        }
      }
      break;
    case "jp":
      languageid = "jp"
      if (!document.getElementsByClassName("jp")[0].classList.contains('active')) {
        document.getElementsByClassName("jp")[0].classList.add('active')
      }
      document.getElementsByClassName("en")[0].classList.remove('active');
      document.getElementsByClassName("cn")[0].classList.remove('active');
      for (let i = 0; i < document.getElementsByClassName("text_jp").length; i++) {
        if (!document.getElementsByClassName("text_jp")[i].classList.contains('show')) {
          document.getElementsByClassName("text_jp")[i].classList.add('show')
        }
        if (document.getElementsByClassName("text_en")[i].classList.contains('show')) {
          document.getElementsByClassName("text_en")[i].classList.remove('show')
        }
        if (document.getElementsByClassName("text_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("text_cn")[i].classList.remove('show')
        }
      }
      // for now eng
      for (let i = 0; i < document.getElementsByClassName("tagfilter_en").length; i++) {
        if (!document.getElementsByClassName("tagfilter_en")[i].classList.contains('show')) {
          document.getElementsByClassName("tagfilter_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("tagfilter_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("tagfilter_cn")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("legendicon_en").length; i++) {
        if (!document.getElementsByClassName("legendicon_en")[i].classList.contains('show')) {
          document.getElementsByClassName("legendicon_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("legendicon_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("legendicon_cn")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("legendspan_en").length; i++) {
        if (!document.getElementsByClassName("legendspan_en")[i].classList.contains('show')) {
          document.getElementsByClassName("legendspan_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("legendspan_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("legendspan_cn")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("tags_en").length; i++) {
        if (!document.getElementsByClassName("tags_en")[i].classList.contains('show')) {
          document.getElementsByClassName("tags_en")[i].classList.add('show')
        }
        if (document.getElementsByClassName("tags_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("tags_cn")[i].classList.remove('show')
        }
        for (let ii = 0; ii < document.getElementsByClassName("tags_en")[i].children.length; ii++) {
          if (!document.getElementsByClassName("tags_en")[i].children[ii].classList.contains('show')) {
            document.getElementsByClassName("tags_en")[i].children[ii].classList.add('show')
          }
          if (document.getElementsByClassName("tags_cn")[i].children[ii].classList.contains('show')) {
            document.getElementsByClassName("tags_cn")[i].children[ii].classList.remove('show')
          }
        }
      }
      break;
    case "cn":
      languageid = "cn"
      if (!document.getElementsByClassName("cn")[0].classList.contains('active')) {
        document.getElementsByClassName("cn")[0].classList.add('active')
      }
      document.getElementsByClassName("jp")[0].classList.remove('active');
      document.getElementsByClassName("en")[0].classList.remove('active');
      for (let i = 0; i < document.getElementsByClassName("text_cn").length; i++) {
        if (!document.getElementsByClassName("text_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("text_cn")[i].classList.add('show')
        }
        if (document.getElementsByClassName("text_en")[i].classList.contains('show')) {
          document.getElementsByClassName("text_en")[i].classList.remove('show')
        }
        if (document.getElementsByClassName("text_jp")[i].classList.contains('show')) {
          document.getElementsByClassName("text_jp")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("tagfilter_cn").length; i++) {
        if (!document.getElementsByClassName("tagfilter_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("tagfilter_cn")[i].classList.add('show')
        }
        if (document.getElementsByClassName("tagfilter_en")[i].classList.contains('show')) {
          document.getElementsByClassName("tagfilter_en")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("legendicon_cn").length; i++) {
        if (!document.getElementsByClassName("legendicon_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("legendicon_cn")[i].classList.add('show')
        }
        if (document.getElementsByClassName("legendicon_en")[i].classList.contains('show')) {
          document.getElementsByClassName("legendicon_en")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("legendspan_cn").length; i++) {
        if (!document.getElementsByClassName("legendspan_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("legendspan_cn")[i].classList.add('show')
        }
        if (document.getElementsByClassName("legendspan_en")[i].classList.contains('show')) {
          document.getElementsByClassName("legendspan_en")[i].classList.remove('show')
        }
      }
      for (let i = 0; i < document.getElementsByClassName("tags_cn").length; i++) {
        if (!document.getElementsByClassName("tags_cn")[i].classList.contains('show')) {
          document.getElementsByClassName("tags_cn")[i].classList.add('show')
        }
        if (document.getElementsByClassName("tags_en")[i].classList.contains('show')) {
          document.getElementsByClassName("tags_en")[i].classList.remove('show')
        }
        for (let ii = 0; ii < document.getElementsByClassName("tags_cn")[i].children.length; ii++) {
          if (!document.getElementsByClassName("tags_cn")[i].children[ii].classList.contains('show')) {
            document.getElementsByClassName("tags_cn")[i].children[ii].classList.add('show')
          }
          if (document.getElementsByClassName("tags_en")[i].children[ii].classList.contains('show')) {
            document.getElementsByClassName("tags_en")[i].children[ii].classList.remove('show')
          }
        }
      }
      break;
  }
}

async function myFunction(a1) {
  if (a1 != identmain && identmain != undefined) {
    document.getElementById(identid).classList.remove('show');
    identmain = undefined
    identid = undefined
  }
  // identmain == *-dropbtn
  identmain = a1[0];
  // identid == *-dropdown
  identid = document.getElementsByClassName(identmain)[0].parentElement.classList[0]
  // adds show to *-dropdown
  document.getElementById(identid).classList.toggle("show");
}

async function legenddropdown() {
  document.getElementById("legend-dropdown").classList.toggle("show");
}

async function getjson() {
  try {
    let data = await fetch("ships.json");
    let result = await data.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getAllIndexes(arr, val, search, useloop) {
  var indexes = [],
    i;
  if (useloop == false) {
    for (i = 0; i < arr.length; i++)
      if (arr[i][search] == val)
        indexes.push(i);
  } else {
    for (i = 0; i < arr.length; i++)
      if (arr[i][search] != null) {
        for (let ii = 0; ii < arr[i][search].length; ii++) {
          if (arr[i][search][ii] == val)
            indexes.push(i);
        }
      }
  }
  return indexes;
}

async function countspaces(a1) {
  let count = a1.split(" ").length - 1;
  let countafter = a1.match(/^\s*(\S+)\s*(.*?)\s*$/).slice(1);
  return {
    count,
    countafter
  };
}

async function removespaces(a1) {
  let str = a1
  let result = a1.replace(" ", "")
  return result
}

async function tiersize(a1) {
  let result;
  let rawresult;
  if (a1 <= 3) {
    result = "110px";
    rawresult = 110;
  }
  if (a1 <= 6 && a1 > 3) {
    result = "220px";
    rawresult = 220;
  }

  if (a1 > 6 && a1 < 10) {
    result = "330px";
    rawresult = 330;
  }

  if (a1 < 13 && a1 > 9) {
    result = "440px";
    rawresult = 440;
  }

  if (a1 < 16 && a1 > 12) {
    result = "550px";
    rawresult = 550;
  }
  if (a1 > 19 && a1 > 15) {
    result = "660px";
    rawresult = 660;
  }
  if (a1 > 18) {
    result = "1100px";
    rawresult = 1100;
  }

  return {
    result,
    rawresult
  };
}

async function texthandler(a1, a2, a3) {
  let className;
  let fontSize;
  let lineHeight;
  let countcheck = await countspaces(a2);
  if (a3 != "en") {
    if (a1 < 7) {
      fontSize = "10px";
      lineHeight = "20px";
      className = "shipname";
    } else {
      fontSize = "10px";
      lineHeight = "9px";
      className = "shipnamealt";
    }
  } else {
    // Check if the sting is 13 or longer
    if (a1 >= 13) {
      className = "shipnamealt";
      // If the str has no empty spaces
      if ((await countcheck.count) == 0) {
        fontSize = "10px";
        lineHeight = "2";
      }
      // Check if the str has at least one empty space
      if ((await countcheck.count) == 1) {
        // If the second str is at least 9 => 10+ long
        if (
          (await countcheck.countafter[1].length) == 10 &&
          (await countcheck.countafter[1].length) > 8
        ) {
          fontSize = "11px";
        }
        // If the second str is longer then 10
        if ((await countcheck.countafter[1].length) > 10) {
          fontSize = "10px";
        }
        // If the second str is smaller or 8 long
        if (countcheck.countafter[1].length <= 8) {
          fontSize = "12px";
        }
      } else if ((await countcheck.count) == 2) {
        // If the second str is at least 9 => 10+ long
        if (
          (await countcheck.countafter[1].length) == 10 &&
          (await countcheck.countafter[1].length) > 8
        ) {
          fontSize = "11px";
        }
        // If the second str is longer then 10
        if ((await countcheck.countafter[1].length) > 10) {
          fontSize = "10px";
        }
        // If the second str is smaller or 8 long
        if (countcheck.countafter[1].length <= 8) {
          fontSize = "12px";
        }
      } else {
        fontSize = "10px";
      }
      // If the sting is 17 or longer
      if (a1 >= 17) {
        fontSize = "11px";
      }
    } else {
      if ((await countcheck.count) == 0 && a1 >= 12) {
        fontSize = "10px";
      }
      if ((await countcheck.count) >= 1) {
        fontSize = "10px";
      }
      className = "shipname";
    }
  }
  return {
    className,
    fontSize,
    lineHeight
  };
}

async function tiertext(a1) {
  var result = a1.toUpperCase();
  return result;
}
async function buildnationalityhtml(a1) {
  a1 = a1.replace("_", " ")
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a1 == undefined) {
    await buildhtmlall()
  }

  for (let i = 0; i < shipobj.length; i++) {
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      let index = await getAllIndexes(shipobj[i][1][Object.keys(shipobj[i][1])[ii]], a1, "nationality", false)
      if (index.length != 0) {
        let hullindex = i
        let hullname = shipobj[i][0]
        let tier = Object.keys(shipobj[i][1])[ii]
        await buildit(hullindex, hullname, tier, index, shipobj)
      }
    }
  }
}

async function buildtierhtml(a1) {
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a1 == undefined) {
    await buildhtmlall()
  }
  let ii = a1.match(/\d+/)[0]

  for (let i = 0; i < shipobj.length; i++) {
    let index = await getAllIndexes(shipobj[i][1][Object.keys(shipobj[i][1])[ii]], ii, "usagitier", false)
    if (index.length != 0) {
      let hullindex = i
      let hullname = shipobj[i][0]
      let tier = a1
      await buildit(hullindex, hullname, tier, index, shipobj)
    }
  }
}

async function buildtaghtml(a1) {
  a1 = a1.replace(" en", "")
  a1 = a1.replace(" jp", "")
  a1 = a1.replace(" cn", "")
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a1 == undefined) {
    await buildhtmlall()
  }

  for (let i = 0; i < shipobj.length; i++) {
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      let index = await getAllIndexes(shipobj[i][1][Object.keys(shipobj[i][1])[ii]], a1, "tags", true)
      if (index.length != 0) {
        let hullindex = i
        let hullname = shipobj[i][0]
        let tier = Object.keys(shipobj[i][1])[ii]
        await buildit(hullindex, hullname, tier, index, shipobj)
      }
    }
  }
}

async function buildrarityhtml(a1) {
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a1 == undefined) {
    await buildhtmlall()
  } else {
    if (a1 == "SuperRare") {
      a1 = "Super Rare"
    }
  }
  for (let i = 0; i < shipobj.length; i++) {
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      let index = await getAllIndexes(shipobj[i][1][Object.keys(shipobj[i][1])[ii]], a1, "rarity", false)
      if (index.length != 0) {
        let hullindex = i
        let hullname = shipobj[i][0]
        let tier = Object.keys(shipobj[i][1])[ii]
        await buildit(hullindex, hullname, tier, index, shipobj)
      }
    }
  }
}

async function buildit(b1, b2, b3, b4, shipobj) {
  if (document.getElementsByClassName(b2).length == 0) {
    // Hulltype class
    let t = document.createElement("div");
    t.className = shipobj[b1][0] + " all";
    let classname = shipobj[b1][0]
    maincont.appendChild(t);
    // Hulltype class banner
    let b = document.createElement("img");
    b.className = shipobj[b1][0] + "banner";
    b.style.marginRight = "30px";
    if (shipobj[b1][0] == "heavycruiser") {
      b.src = "Assets/TierClassBanner/HeavyCruiser.png";
    } else if (shipobj[b1][0] == "lightcruiser") {
      b.src = "Assets/TierClassBanner/LightCruiser.png";
    } else {
      b.src =
        "Assets/TierClassBanner/" +
        shipobj[b1][0].charAt(0).toUpperCase() +
        shipobj[b1][0].slice(1) +
        ".png";
    }
    b.draggable = false;
    document.getElementsByClassName(shipobj[b1][0])[0].appendChild(b);
  }

  // s == t0 t1 t2 usw
  let s = document.createElement("div");
  s.className = b3;
  let sizecheck = await tiersize(
    b4.length
  );
  s.style.width = sizecheck.result;
  s.style.marginRight = "20px";
  document.getElementsByClassName(b2)[0].appendChild(s);

  let f = document.createElement("div");
  f.className = "tierbanner";
  f.draggable = false;
  let ttext = await tiertext(b3);
  f.innerHTML = ttext;
  f.style.width = sizecheck.rawresult - 10 + "px";
  document
    .getElementsByClassName(b2)[0]
    .getElementsByClassName(b3)[0]
    .appendChild(f);

  await filltierspecial(b2, s.className, b4);
}

async function buildhulltypehtml(a1) {
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";

  if (a1 == undefined) {
    await buildhtmlall()
  } else {
    if (a1 == "AviationBattleship" || a1 == "Monitor" || a1 == "Repairship" || a1 == "SubmarineCarrier") {
      await buildspecialtype(a1)
    } else {
      await buildhulltype(a1)
    }
  }
  async function buildhulltype(a1) {
    let i
    switch (a1) {
      case "destroyer":
        i = 0
        break;
      case "battleship":
        i = 1
        break;
      case "carrier":
        i = 2
        break;
      case "heavycruiser":
        i = 3
        break;
      case "lightcruiser":
        i = 4
        break;
      case "submarine":
        i = 5
        break;
    }
    // Hulltype class
    let t = document.createElement("div");
    t.className = shipobj[i][0] + " all";
    let classname = shipobj[i][0]
    maincont.appendChild(t);
    // Hulltype class banner
    let b = document.createElement("img");
    b.className = shipobj[i][0] + "banner";
    b.style.marginRight = "30px";
    if (shipobj[i][0] == "heavycruiser") {
      b.src = "Assets/TierClassBanner/HeavyCruiser.png";
    } else if (shipobj[i][0] == "lightcruiser") {
      b.src = "Assets/TierClassBanner/LightCruiser.png";
    } else {
      b.src =
        "Assets/TierClassBanner/" +
        shipobj[i][0].charAt(0).toUpperCase() +
        shipobj[i][0].slice(1) +
        ".png";
    }
    b.draggable = false;
    document.getElementsByClassName(shipobj[i][0])[0].appendChild(b);
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length && ii < 5; ii++) {
      // s == t0 t1 t2 usw
      let s = document.createElement("div");
      s.className = Object.keys(shipobj[i][1])[ii];
      let sizecheck = await tiersize(
        shipobj[i][1][Object.keys(shipobj[i][1])[ii]].length
      );
      s.style.width = sizecheck.result;
      s.style.marginRight = "20px";
      document.getElementsByClassName(shipobj[i][0])[0].appendChild(s);

      let f = document.createElement("div");
      f.className = "tierbanner";
      f.draggable = false;
      let ttext = await tiertext(Object.keys(shipobj[i][1])[ii]);
      f.innerHTML = ttext;
      f.style.width = sizecheck.rawresult - 10 + "px";
      document
        .getElementsByClassName(shipobj[i][0])[0]
        .getElementsByClassName(Object.keys(shipobj[i][1])[ii])[0]
        .appendChild(f);

      await filltier(classname, s.className);
    }
  }

  async function buildspecialtype(a1) {
    let tier;
    let hulltypeidf
    let idf
    switch (a1) {
      case "AviationBattleship":
        hulltypeidf = "battleship"
        idf = 1
        break;
      case "Monitor":
        hulltypeidf = "battleship"
        idf = 1
        break;
      case "Repairship":
        hulltypeidf = "carrier"
        idf = 2
        break;
      case "SubmarineCarrier":
        hulltypeidf = "submarine"
        idf = 5
        break;
    }
    // Hulltype class
    let t = document.createElement("div");
    t.className = hulltypeidf + " all";
    let classname = hulltypeidf
    maincont.appendChild(t);
    // Hulltype class banner
    let b = document.createElement("img");
    b.className = hulltypeidf + "banner";
    b.style.marginRight = "30px";
    b.src =
      "Assets/TierClassBanner/" +
      hulltypeidf.charAt(0).toUpperCase() +
      hulltypeidf.slice(1) +
      ".png";
    b.draggable = false;
    document.getElementsByClassName(hulltypeidf)[0].appendChild(b);
    for (let i = 0; i < 8; i++) {
      switch (i) {
        case 0:
          tier = "t0"
          break;
        case 1:
          tier = "t1"
          break;
        case 2:
          tier = "t2"
          break;
        case 3:
          tier = "t3"
          break;
        case 4:
          tier = "t4"
          break;
        case 5:
          tier = "t5"
          break;
        case 6:
          tier = "t6"
          break;
        case 7:
          tier = "t7"
          break;
      }

      let index = await getAllIndexes(shipobj[idf][1][tier], a1, "hullTypeId", false)
      if (index.length != 0) {
        await buildspecialtier(tier, index, hulltypeidf)
        /*console.log("Search term: ", a1)
        console.log("Found index: ", index, " in: ", tier)
        
        for (let ii = 0; ii < index.length; ii++) {
          console.log("Ships from index: ", shipobj[1][1][tier][index[ii]])
        }*/
      }
    }
  }
  async function buildspecialtier(a1, a2, a3) {
    // s == t0 t1 t2 usw
    let s = document.createElement("div");
    s.className = a1;
    let sizecheck = await tiersize(
      a2.length
    );
    s.style.width = sizecheck.result;
    s.style.marginRight = "20px";
    document.getElementsByClassName(a3)[0].appendChild(s);

    let f = document.createElement("div");
    f.className = "tierbanner";
    f.draggable = false;
    let ttext = await tiertext(a1);
    f.innerHTML = ttext;
    f.style.width = sizecheck.rawresult - 10 + "px";
    document
      .getElementsByClassName(a3)[0]
      .getElementsByClassName(a1)[0]
      .appendChild(f);

    await filltierspecial(a3, s.className, a2);
  }
}

async function buildhtmlall(a1) {
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";

  for (let i = 0; i < shipobj.length; i++) {
    // Hulltype class
    let t = document.createElement("div");
    t.className = shipobj[i][0] + " all";
    let classname = shipobj[i][0]
    maincont.appendChild(t);
    // Hulltype class banner
    let b = document.createElement("img");
    b.className = shipobj[i][0] + "banner";
    b.style.marginRight = "30px";
    if (shipobj[i][0] == "heavycruiser") {
      b.src = "Assets/TierClassBanner/HeavyCruiser.png";
    } else if (shipobj[i][0] == "lightcruiser") {
      b.src = "Assets/TierClassBanner/LightCruiser.png";
    } else {
      b.src =
        "Assets/TierClassBanner/" +
        shipobj[i][0].charAt(0).toUpperCase() +
        shipobj[i][0].slice(1) +
        ".png";
    }
    b.draggable = false;
    document.getElementsByClassName(shipobj[i][0])[0].appendChild(b);
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length && ii < 5; ii++) {
      // s == t0 t1 t2 usw
      let s = document.createElement("div");
      s.className = Object.keys(shipobj[i][1])[ii];
      let sizecheck = await tiersize(
        shipobj[i][1][Object.keys(shipobj[i][1])[ii]].length
      );
      s.style.width = sizecheck.result;
      s.style.marginRight = "20px";
      document.getElementsByClassName(shipobj[i][0])[0].appendChild(s);

      let f = document.createElement("div");
      f.className = "tierbanner";
      f.draggable = false;
      let ttext = await tiertext(Object.keys(shipobj[i][1])[ii]);
      f.innerHTML = ttext;
      f.style.width = sizecheck.rawresult - 10 + "px";
      document
        .getElementsByClassName(shipobj[i][0])[0]
        .getElementsByClassName(Object.keys(shipobj[i][1])[ii])[0]
        .appendChild(f);

      await filltier(classname, s.className);
    }
  }
}

async function filltier(a1, a2) {
  let lang;
  for (let i = 0; i < ships[`${a1}`][`${a2}`].length; i++) {
    // Main div
    let a = document.createElement("div");
    a.className = "parent";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .appendChild(a);
    // rarity
    a = document.createElement("img");
    a.className = "rarityimg";
    a.src = "Assets/RarityBGs/" + await removespaces(ships[`${a1}`][`${a2}`][i].rarity) + ".png";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    a = document.createElement("a");
    a.className = "link";
    a.href = ships[`${a1}`][`${a2}`][i].wikiUrl;
    a.draggable = false;
    a.target = "_blank"
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // thumbnail
    a = document.createElement("img");
    a.className = "thumbnail";
    a.src = ships[`${a1}`][`${a2}`][i].thumbnail;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Bannerright
    if (ships[`${a1}`][`${a2}`][i].banner != null) {
      a = document.createElement("img");
      a.className = "bannerright";
      a.src = ships[`${a1}`][`${a2}`][i].bannerlink;
      document
        .getElementsByClassName(a1)[0]
        .getElementsByClassName(a2)[0]
        .getElementsByClassName("parent")[i].appendChild(a);
    }
    // Bannerleft
    if (ships[`${a1}`][`${a2}`][i].banneralt != null) {
      a = document.createElement("img");
      a.className = "bannerleft";
      a.src = ships[`${a1}`][`${a2}`][i].banneraltlink;
      document
        .getElementsByClassName(a1)[0]
        .getElementsByClassName(a2)[0]
        .getElementsByClassName("parent")[i].appendChild(a);
    }
    // Tags en
    a = document.createElement("div");
    if (languageid == "en" || languageid == "jp") {
      a.className = "tags_en show";
    } else {
      a.className = "tags_en";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    a = document.createElement("div");
    if (languageid == "cn") {
      a.className = "tags_cn show";
    } else {
      a.className = "tags_cn";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // tags filler
    if (ships[`${a1}`][`${a2}`][i].tags != null) {
      for (let ii = 0; ii < ships[`${a1}`][`${a2}`][i].tags.length; ii++) {
        a = document.createElement("img");
        if (languageid == "en" || languageid == "jp") {
          a.className = "tag" + (ii + 1) + " show";
        } else {
          a.className = "tag" + (ii + 1);
        }
        a.src =
          "Assets/TagIcons/EN/" + ships[`${a1}`][`${a2}`][i].tags[ii] + ".png";
        document
          .getElementsByClassName(a1)[0]
          .getElementsByClassName(a2)[0]
          .getElementsByClassName("tags_en")[i].appendChild(a);

        a = document.createElement("img");
        if (languageid == "cn") {
          a.className = "tag" + (ii + 1) + " show";
        } else {
          a.className = "tag" + (ii + 1);
        }
        a.src =
          "Assets/TagIcons/CN/" + ships[`${a1}`][`${a2}`][i].tags[ii] + ".png";
        document
          .getElementsByClassName(a1)[0]
          .getElementsByClassName(a2)[0]
          .getElementsByClassName("tags_cn")[i].appendChild(a);
      }
    }
    // Greyblock
    a = document.createElement("img");
    a.className = "greyblock";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Hulltype
    a = document.createElement("img");
    a.className = "hulltype";
    a.src =
      "Assets/HullTypeIcons/" + ships[`${a1}`][`${a2}`][i].hullTypeId + ".png";
    a.draggable = false;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock
    /*a
    a = document.createElement("div");
    a.className = "text";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Span text
    a = document.createElement("span");
    let textcheck = await texthandler(
      ships[`${a1}`][`${a2}`][i].names.en.length,
      ships[`${a1}`][`${a2}`][i].names.en
    );

    if (textcheck.className != undefined) {
      a.className = textcheck.className;
    }

    if (textcheck.fontSize != undefined) {
      a.style.fontSize = textcheck.fontSize;
    }

    if (textcheck.lineHeight != undefined) {
      a.style.lineHeight = textcheck.lineHeight;
    }
    a.innerHTML = ships[`${a1}`][`${a2}`][i].names.en;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].getElementsByClassName("text")[0]
      .appendChild(a);
  }
}*/

    // Namechange html builder
    // Textblock jp
    a = document.createElement("div");
    if (languageid == "en") {
      a.className = "text_en show";
    } else {
      a.className = "text_en";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock jp
    a = document.createElement("div");
    if (languageid == "jp") {
      a.className = "text_jp show";
    } else {
      a.className = "text_jp";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock kr
    a = document.createElement("div");
    a.className = "text_kr";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock cn
    a = document.createElement("div");
    if (languageid == "cn") {
      a.className = "text_cn show";
    } else {
      a.className = "text_cn";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Span text
    for (let ii = 0; ii < 3; ii++) {
      a = document.createElement("span");
      switch (ii) {
        case 0:
          language = "en"
          lang = "en"
          break;
        case 1:
          language = "jp"
          lang = "jp"
          break;
        case 2:
          language = "cn"
          lang = "cn"
          break;
      }
      if (ships[`${a1}`][`${a2}`][i].names[language] == null) {
        lang = "en"
      }

      let textcheck = await texthandler(
        ships[`${a1}`][`${a2}`][i].names[lang].length,
        ships[`${a1}`][`${a2}`][i].names[lang], lang
      );

      if (textcheck.className != undefined) {
        a.className = textcheck.className;
      }

      if (textcheck.fontSize != undefined) {
        a.style.fontSize = textcheck.fontSize;
      }

      if (textcheck.lineHeight != undefined) {
        a.style.lineHeight = textcheck.lineHeight;
      }
      a.innerHTML = ships[`${a1}`][`${a2}`][i].names[lang];
      document
        .getElementsByClassName(a1)[0]
        .getElementsByClassName(a2)[0]
        .getElementsByClassName("parent")[i].getElementsByClassName("text_" + language)[0]
        .appendChild(a);
    }
  }
}

async function filltierspecial(a1, a2, a3) {
  let lang;
  for (let i = 0; i < a3.length; i++) {
    // Main div
    let a = document.createElement("div");
    a.className = "parent";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .appendChild(a);
    a = document.createElement("a");
    a.className = "link";
    a.href = ships[`${a1}`][`${a2}`][a3[i]].wikiUrl;
    a.target = "_blank"
    a.draggable = false;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // rarity
    a = document.createElement("img");
    a.className = "rarityimg";
    a.src = "Assets/RarityBGs/" + await removespaces(ships[`${a1}`][`${a2}`][a3[i]].rarity) + ".png";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // thumbnail
    a = document.createElement("img");
    a.className = "thumbnail";
    a.src = ships[`${a1}`][`${a2}`][a3[i]].thumbnail;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Bannerright
    if (ships[`${a1}`][`${a2}`][a3[i]].banner != null) {
      a = document.createElement("img");
      a.className = "bannerright";
      a.src = ships[`${a1}`][`${a2}`][a3[i]].bannerlink;
      document
        .getElementsByClassName(a1)[0]
        .getElementsByClassName(a2)[0]
        .getElementsByClassName("parent")[i].appendChild(a);
    }
    // Bannerleft
    if (ships[`${a1}`][`${a2}`][a3[i]].banneralt != null) {
      a = document.createElement("img");
      a.className = "bannerleft";
      a.src = ships[`${a1}`][`${a2}`][a3[i]].banneraltlink;
      document
        .getElementsByClassName(a1)[0]
        .getElementsByClassName(a2)[0]
        .getElementsByClassName("parent")[i].appendChild(a);
    }
    // Tags en
    a = document.createElement("div");
    if (languageid == "en" || languageid == "jp") {
      a.className = "tags_en show";
    } else {
      a.className = "tags_en";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    a = document.createElement("div");
    if (languageid == "cn") {
      a.className = "tags_cn show";
    } else {
      a.className = "tags_cn";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // tags filler
    if (ships[`${a1}`][`${a2}`][a3[i]].tags != null) {
      for (let ii = 0; ii < ships[`${a1}`][`${a2}`][a3[i]].tags.length; ii++) {
        a = document.createElement("img");
        if (languageid == "en" || languageid == "jp") {
          a.className = "tag" + (ii + 1) + " show";
        } else {
          a.className = "tag" + (ii + 1);
        }
        a.src =
          "Assets/TagIcons/EN/" + ships[`${a1}`][`${a2}`][a3[i]].tags[ii] + ".png";
        document
          .getElementsByClassName(a1)[0]
          .getElementsByClassName(a2)[0]
          .getElementsByClassName("tags_en")[i].appendChild(a);

        a = document.createElement("img");
        if (languageid == "cn") {
          a.className = "tag" + (ii + 1) + " show";
        } else {
          a.className = "tag" + (ii + 1);
        }
        a.src =
          "Assets/TagIcons/CN/" + ships[`${a1}`][`${a2}`][a3[i]].tags[ii] + ".png";
        document
          .getElementsByClassName(a1)[0]
          .getElementsByClassName(a2)[0]
          .getElementsByClassName("tags_cn")[i].appendChild(a);
      }
    }
    // Greyblock
    a = document.createElement("img");
    a.className = "greyblock";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Hulltype
    a = document.createElement("img");
    a.className = "hulltype";
    a.src =
      "Assets/HullTypeIcons/" + ships[`${a1}`][`${a2}`][a3[i]].hullTypeId + ".png";
    a.draggable = false;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock
    /*a = document.createElement("div");
    a.className = "text";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Span text
    a = document.createElement("span");
    let textcheck = await texthandler(
      ships[`${a1}`][`${a2}`][a3[i]].names.en.length,
      ships[`${a1}`][`${a2}`][a3[i]].names.en
    );

    if (textcheck.className != undefined) {
      a.className = textcheck.className;
    }

    if (textcheck.fontSize != undefined) {
      a.style.fontSize = textcheck.fontSize;
    }

    if (textcheck.lineHeight != undefined) {
      a.style.lineHeight = textcheck.lineHeight;
    }
    a.innerHTML = ships[`${a1}`][`${a2}`][a3[i]].names.en;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].getElementsByClassName("text")[0]
      .appendChild(a);
  }
}*/
    // Namechange html builder
    // Textblock en
    a = document.createElement("div");
    if (languageid == "en") {
      a.className = "text_en show";
    } else {
      a.className = "text_en";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock jp
    a = document.createElement("div");
    if (languageid == "jp") {
      a.className = "text_jp show";
    } else {
      a.className = "text_jp";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock kr
    a = document.createElement("div");
    a.className = "text_kr";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock cn
    a = document.createElement("div");
    if (languageid == "cn") {
      a.className = "text_cn show";
    } else {
      a.className = "text_cn";
    }
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Span text
    for (let ii = 0; ii < 3; ii++) {
      a = document.createElement("span");
      switch (ii) {
        case 0:
          language = "en"
          lang = "en"
          break;
        case 1:
          language = "jp"
          lang = "jp"
          break;
        case 2:
          language = "cn"
          lang = "cn"
          break;
      }
      if (ships[`${a1}`][`${a2}`][a3[i]].names[language] == null) {
        lang = "en"
      }

      let textcheck = await texthandler(
        ships[`${a1}`][`${a2}`][a3[i]].names[lang].length,
        ships[`${a1}`][`${a2}`][a3[i]].names[lang], lang
      );

      if (textcheck.className != undefined) {
        a.className = textcheck.className;
      }

      if (textcheck.fontSize != undefined) {
        a.style.fontSize = textcheck.fontSize;
      }

      if (textcheck.lineHeight != undefined) {
        a.style.lineHeight = textcheck.lineHeight;
      }
      a.innerHTML = ships[`${a1}`][`${a2}`][a3[i]].names[lang];
      document
        .getElementsByClassName(a1)[0]
        .getElementsByClassName(a2)[0]
        .getElementsByClassName("parent")[i].getElementsByClassName("text_" + language)[0]
        .appendChild(a);
    }
  }
}
