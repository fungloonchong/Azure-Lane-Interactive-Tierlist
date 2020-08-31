let maincont;
let ships;
let identid;
let identmain;
let language;
let languageid = "en";
let f1 = undefined;
let f2 = undefined;
let f3 = undefined;
let f4 = undefined;
let f5 = undefined;
let arraysobj = {
  battleship: {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
    t4: [],
    t5: [],
    t6: [],
    t7: []
  },
  carrier: {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
    t4: [],
    t5: [],
    t6: [],
    t7: []
  },
  heavycruiser: {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
    t4: [],
    t5: [],
    t6: [],
    t7: []
  },
  lightcruiser: {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
    t4: [],
    t5: [],
    t6: [],
    t7: []
  },
  destroyer: {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
    t4: [],
    t5: [],
    t6: [],
    t7: []
  },
  submarine: {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
    t4: [],
    t5: [],
    t6: [],
    t7: []
  }
}


window.onload = async function () {
  maincont = document.getElementsByClassName("main")[0];
  ships = await getjson();
  let gethulltype = document.querySelectorAll(".hulltypefilter");
  await nodrag("hulltypefilter");
  gethulltype.forEach(function (hulltypeadd) {
    hulltypeadd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "hulltypefilter");
      },
      false
    );
  });
  let rarityfilter = document.querySelectorAll(".rarityfilter");
  await nodrag("rarityfilter");
  rarityfilter.forEach(function (rarityadd) {
    rarityadd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "rarityfilter");
      },
      false
    );
  });
  let tagfilter = document.querySelectorAll(".tagfilter_en, .tagfilter_cn");
  await nodrag("tagfilter_en");
  await nodrag("tagfilter_cn");
  tagfilter.forEach(function (tagadd) {
    tagadd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "tagfilter");
      },
      false
    );
  });
  let tierfilter = document.querySelectorAll(".tierfilter");
  await nodrag("tierfilter");
  tierfilter.forEach(function (tieradd) {
    tieradd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "tierfilter");
      },
      false
    );
  });
  let nationalityfilter = document.querySelectorAll(".nationality");
  await nodrag("nationality");
  nationalityfilter.forEach(function (nationalityadd) {
    nationalityadd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "nationality", this.classList[1]);
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
    var i;
    for (i = 0; i < images.length; i++) {
      var addnodrag = images[i];
      if (addnodrag.draggable == true) {
        addnodrag.draggable = false;
      }
    }
  }
};

async function mutifiltercheck(a1, a2, a3) {
  let checker = [];
  let filters = [];
  if (a2 == "hulltypefilter") {
    if (document.getElementsByClassName("hulltypefilter active").length == 0) {
      document.getElementsByClassName("hulltypefilter")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("hulltypefilter active")[0].id == a1) {
        document.getElementsByClassName("hulltypefilter active")[0].classList.remove("active")
        a1 = undefined
      } else {
        document.getElementsByClassName("hulltypefilter active")[0].classList.remove("active")
        document.getElementsByClassName("hulltypefilter")[a1].classList.add("active")
      }
    }
    f1 = a1
  }
  if (a2 == "rarityfilter") {
    if (document.getElementsByClassName("rarityfilter active").length == 0) {
      document.getElementsByClassName("rarityfilter")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("rarityfilter active")[0].id == a1) {
        document.getElementsByClassName("rarityfilter active")[0].classList.remove("active")
        a1 = undefined
      } else {
        document.getElementsByClassName("rarityfilter active")[0].classList.remove("active")
        document.getElementsByClassName("rarityfilter")[a1].classList.add("active")
      }
    }
    f2 = a1
  }
  if (a2 == "tagfilter") {
    if (document.getElementsByClassName("tagfiltercont")[0].getElementsByClassName("show active").length == 0) {
      document.getElementsByClassName("tagfiltercont")[0].getElementsByClassName("show")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("tagfiltercont")[0].getElementsByClassName("show active")[0].id == a1) {
        document.getElementsByClassName("tagfiltercont")[0].getElementsByClassName("show active")[0].classList.remove("active")
        a1 = undefined
      } else {
        document.getElementsByClassName("tagfiltercont")[0].getElementsByClassName("show active")[0].classList.remove("active")
        document.getElementsByClassName("tagfiltercont")[0].getElementsByClassName("show")[a1].classList.add("active")
      }
    }
    f3 = a1
  }
  if (a2 == "tierfilter") {
    if (document.getElementsByClassName("tierfilter active").length == 0) {
      document.getElementsByClassName("tierfilter")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("tierfilter active")[0].id == a1) {
        document.getElementsByClassName("tierfilter active")[0].classList.remove("active")
        a1 = undefined
      } else {
        document.getElementsByClassName("tierfilter active")[0].classList.remove("active")
        document.getElementsByClassName("tierfilter")[a1].classList.add("active")
      }
    }
    f4 = a1
  }
  if (a2 == "nationality") {
    if (document.getElementsByClassName("nationality active").length == 0) {
      document.getElementsByClassName("nationality")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("nationality active")[0].id == a1) {
        document.getElementsByClassName("nationality active")[0].classList.remove("active")
        a3 = undefined
      } else {
        document.getElementsByClassName("nationality active")[0].classList.remove("active")
        document.getElementsByClassName("nationality")[a1].classList.add("active")
      }
    }
    f5 = a3
  }

  for (let i = 1; i < 6; i++) {
    switch (i) {
      case 1:
        if (f1 != undefined) {
          filters.push(f1)
          checker.push("f1")
        }
        break;
      case 2:
        if (f2 != undefined) {
          filters.push(f2)
          checker.push("f2")
        }
        break;
      case 3:
        if (f3 != undefined) {
          filters.push(f3)
          checker.push("f3")
        }
        break;
      case 4:
        if (f4 != undefined) {
          filters.push(f4)
          checker.push("f4")
        }
        break;
      case 5:
        if (f5 != undefined) {
          filters.push(f5)
          checker.push("f5")
        }
        break;
    }
  }
  if (filters.length != 0) {
    if (filters.length == 1) {
      if (checker[0] == "f1") {
        buildhulltypehtml(filters[0])
      }
      if (checker[0] == "f2") {
        buildrarityhtml(filters[0])
      }
      if (checker[0] == "f3") {
        buildtaghtml(filters[0])
      }
      if (checker[0] == "f4") {
        buildtierhtml(filters[0])
      }
      if (checker[0] == "f5") {
        buildnationalityhtml(filters[0])
      }
    } else {
      buildmultihtml(filters, checker)
    }
  } else {
    buildhtmlall();
  }
}

window.onclick = function (event) {
  if (
    !event.target.matches("." + identmain) &&
    !event.target.matches(".filter-dropdown-content") &&
    !event.target.matches(".tierfilterspan") &&
    !event.target.matches(".hulltypefilterspan") &&
    !event.target.matches(".rarityfilterspan") &&
    !event.target.matches(".nationalityfilterspan") &&
    !event.target.matches(".tagfilterspan") &&
    !event.target.matches(".tierfilter") &&
    !event.target.matches(".hulltypefilter") &&
    !event.target.matches(".rarityfilter") &&
    !event.target.matches(".natparent") &&
    !event.target.matches(".tagfilter_en") &&
    !event.target.matches(".tagfilter_ico") &&
    !event.target.matches(".tagfilter_cn") &&
    !event.target.matches(".tierfiltercont") &&
    !event.target.matches(".hulltypefiltercont") &&
    !event.target.matches(".rarityfiltercont") &&
    !event.target.matches(".nationalityfiltercont") &&
    !event.target.matches(".tagfiltercont")
  ) {
    var dropdowns = document.getElementsByClassName(identid + "-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
    identmain = undefined;
    identid = undefined;
  }
  if (
    !event.target.matches(".legend-dot-dropbtn") &&
    !event.target.matches(".legend-dropdown-content") &&
    !event.target.matches(".legendicon_en") &&
    !event.target.matches(".legendicon_cn") &&
    !event.target.matches(".legendspan_en") &&
    !event.target.matches(".legendspan_cn")
  ) {
    var dropdowns = document.getElementsByClassName("legend-dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
// Namechange function
async function shipnamecheck(a1, a2) {
  switch (a1) {
    case "en":
      languageid = "en";
      if (
        !document.getElementsByClassName("en")[0].classList.contains("active")
      ) {
        document.getElementsByClassName("en")[0].classList.add("active");
      }
      document.getElementsByClassName("jp")[0].classList.remove("active");
      document.getElementsByClassName("cn")[0].classList.remove("active");
      document.getElementsByClassName("kr")[0].classList.remove("active");
      for (
        let i = 0; i < document.getElementsByClassName("text_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("text_en")[i].classList.contains("show")
        ) {
          document.getElementsByClassName("text_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("text_jp")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_jp")[i].classList.remove("show");
        }
        if (
          document
          .getElementsByClassName("text_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_cn")[i].classList.remove("show");
        }
        if (
          document
          .getElementsByClassName("text_kr")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_kr")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("tagfilter_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("tagfilter_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tagfilter_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("tagfilter_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tagfilter_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("legendicon_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("legendicon_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendicon_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("legendicon_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendicon_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("legendspan_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("legendspan_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendspan_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("legendspan_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendspan_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("tags_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("tags_en")[i].classList.contains("show")
        ) {
          document.getElementsByClassName("tags_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("tags_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tags_cn")[i].classList.remove("show");
        }
        for (
          let ii = 0; ii < document.getElementsByClassName("tags_en")[i].children.length; ii++
        ) {
          if (
            !document
            .getElementsByClassName("tags_en")[i].children[ii].classList.contains("show")
          ) {
            document
              .getElementsByClassName("tags_en")[i].children[ii].classList.add("show");
          }
          if (
            document
            .getElementsByClassName("tags_cn")[i].children[ii].classList.contains("show")
          ) {
            document
              .getElementsByClassName("tags_cn")[i].children[ii].classList.remove("show");
          }
        }
      }
      break;
    case "jp":
      languageid = "jp";
      if (
        !document.getElementsByClassName("jp")[0].classList.contains("active")
      ) {
        document.getElementsByClassName("jp")[0].classList.add("active");
      }
      document.getElementsByClassName("en")[0].classList.remove("active");
      document.getElementsByClassName("cn")[0].classList.remove("active");
      document.getElementsByClassName("kr")[0].classList.remove("active");
      for (
        let i = 0; i < document.getElementsByClassName("text_jp").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("text_jp")[i].classList.contains("show")
        ) {
          document.getElementsByClassName("text_jp")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("text_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_en")[i].classList.remove("show");
        }
        if (
          document
          .getElementsByClassName("text_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_cn")[i].classList.remove("show");
        }
        if (
          document
          .getElementsByClassName("text_kr")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_kr")[i].classList.remove("show");
        }
      }
      // for now eng
      for (
        let i = 0; i < document.getElementsByClassName("tagfilter_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("tagfilter_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tagfilter_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("tagfilter_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tagfilter_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("legendicon_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("legendicon_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendicon_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("legendicon_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendicon_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("legendspan_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("legendspan_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendspan_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("legendspan_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendspan_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("tags_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("tags_en")[i].classList.contains("show")
        ) {
          document.getElementsByClassName("tags_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("tags_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tags_cn")[i].classList.remove("show");
        }
        for (
          let ii = 0; ii < document.getElementsByClassName("tags_en")[i].children.length; ii++
        ) {
          if (
            !document
            .getElementsByClassName("tags_en")[i].children[ii].classList.contains("show")
          ) {
            document
              .getElementsByClassName("tags_en")[i].children[ii].classList.add("show");
          }
          if (
            document
            .getElementsByClassName("tags_cn")[i].children[ii].classList.contains("show")
          ) {
            document
              .getElementsByClassName("tags_cn")[i].children[ii].classList.remove("show");
          }
        }
      }
      break;
    case "cn":
      languageid = "cn";
      if (
        !document.getElementsByClassName("cn")[0].classList.contains("active")
      ) {
        document.getElementsByClassName("cn")[0].classList.add("active");
      }
      document.getElementsByClassName("jp")[0].classList.remove("active");
      document.getElementsByClassName("en")[0].classList.remove("active");
      document.getElementsByClassName("kr")[0].classList.remove("active");
      for (
        let i = 0; i < document.getElementsByClassName("text_cn").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("text_cn")[i].classList.contains("show")
        ) {
          document.getElementsByClassName("text_cn")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("text_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_en")[i].classList.remove("show");
        }
        if (
          document
          .getElementsByClassName("text_jp")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_jp")[i].classList.remove("show");
        }
        if (
          document
          .getElementsByClassName("text_kr")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_kr")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("tagfilter_cn").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("tagfilter_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tagfilter_cn")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("tagfilter_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tagfilter_en")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("legendicon_cn").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("legendicon_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendicon_cn")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("legendicon_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendicon_en")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("legendspan_cn").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("legendspan_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendspan_cn")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("legendspan_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendspan_en")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("tags_cn").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("tags_cn")[i].classList.contains("show")
        ) {
          document.getElementsByClassName("tags_cn")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("tags_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tags_en")[i].classList.remove("show");
        }
        for (
          let ii = 0; ii < document.getElementsByClassName("tags_cn")[i].children.length; ii++
        ) {
          if (
            !document
            .getElementsByClassName("tags_cn")[i].children[ii].classList.contains("show")
          ) {
            document
              .getElementsByClassName("tags_cn")[i].children[ii].classList.add("show");
          }
          if (
            document
            .getElementsByClassName("tags_en")[i].children[ii].classList.contains("show")
          ) {
            document
              .getElementsByClassName("tags_en")[i].children[ii].classList.remove("show");
          }
        }
      }
      break;
    case "kr":
      languageid = "kr";
      if (
        !document.getElementsByClassName("kr")[0].classList.contains("active")
      ) {
        document.getElementsByClassName("kr")[0].classList.add("active");
      }
      document.getElementsByClassName("jp")[0].classList.remove("active");
      document.getElementsByClassName("en")[0].classList.remove("active");
      document.getElementsByClassName("cn")[0].classList.remove("active");
      for (
        let i = 0; i < document.getElementsByClassName("text_kr").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("text_kr")[i].classList.contains("show")
        ) {
          document.getElementsByClassName("text_kr")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("text_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_en")[i].classList.remove("show");
        }
        if (
          document
          .getElementsByClassName("text_jp")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_jp")[i].classList.remove("show");
        }
        if (
          document
          .getElementsByClassName("text_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("text_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("tagfilter_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("tagfilter_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tagfilter_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("tagfilter_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tagfilter_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("legendicon_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("legendicon_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendicon_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("legendicon_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendicon_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("legendspan_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("legendspan_en")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendspan_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("legendspan_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("legendspan_cn")[i].classList.remove("show");
        }
      }
      for (
        let i = 0; i < document.getElementsByClassName("tags_en").length; i++
      ) {
        if (
          !document
          .getElementsByClassName("tags_en")[i].classList.contains("show")
        ) {
          document.getElementsByClassName("tags_en")[i].classList.add("show");
        }
        if (
          document
          .getElementsByClassName("tags_cn")[i].classList.contains("show")
        ) {
          document
            .getElementsByClassName("tags_cn")[i].classList.remove("show");
        }
        for (
          let ii = 0; ii < document.getElementsByClassName("tags_en")[i].children.length; ii++
        ) {
          if (
            !document
            .getElementsByClassName("tags_en")[i].children[ii].classList.contains("show")
          ) {
            document
              .getElementsByClassName("tags_en")[i].children[ii].classList.add("show");
          }
          if (
            document
            .getElementsByClassName("tags_cn")[i].children[ii].classList.contains("show")
          ) {
            document
              .getElementsByClassName("tags_cn")[i].children[ii].classList.remove("show");
          }
        }
      }
      break;
  }
}

async function myFunction(a1) {
  if (a1 != identmain && identmain != undefined) {
    document.getElementById(identid).classList.remove("show");
    identmain = undefined;
    identid = undefined;
  }
  // identmain == *-dropbtn
  identmain = a1[0];
  // identid == *-dropdown
  identid = document.getElementsByClassName(identmain)[0].parentElement
    .classList[0];
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

async function getAllIndexes(arr, val, search, useloop, index) {
  var indexes = [],
    i;
  if (useloop == false) {
    if (index != undefined) {
      for (i = 0; i < index.length; i++) {
        if (arr[index[i]][search] == val) {
          indexes.push(i);
        }
      }
    } else {
      for (i = 0; i < arr.length; i++)
        if (arr[i][search] == val) indexes.push(i);
    }
  } else {
    for (i = 0; i < arr.length; i++)
      if (arr[i][search] != null) {
        for (let ii = 0; ii < arr[i][search].length; ii++) {
          if (arr[i][search][ii] == val) indexes.push(i);
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
  let str = a1;
  let result = a1.replace(" ", "");
  return result;
}

async function tiersize(a1) {
  let result;
  let rawresult;
  let b1 = (a1 * 100) / 3;
  let b2 = Math.ceil(b1 / 100) * 100;
  let margin = b2 / 10;

  result = b2 + margin + "px";
  rawresult = b2 + margin;

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
    if (a3 == "kr") {
      if (a1 < 9) {
        fontSize = "10px";
        lineHeight = "20px";
        className = "shipname";
      } else {
        fontSize = "10px";
        lineHeight = "9px";
        className = "shipnamealt";
      }
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
  a1 = a1.replace("_", " ");
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a1 == undefined) {
    await buildhtmlall();
  }

  for (let i = 0; i < shipobj.length; i++) {
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      let index = await getAllIndexes(
        shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
        a1,
        "nationality",
        false
      );
      if (index.length != 0) {
        let hullindex = i;
        let hullname = shipobj[i][0];
        let tier = Object.keys(shipobj[i][1])[ii];
        await buildit(hullindex, hullname, tier, index, shipobj);
      }
    }
  }
}

async function buildtierhtml(a1) {
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a1 == undefined) {
    await buildhtmlall();
  }
  let ii = a1.match(/\d+/)[0];

  for (let i = 0; i < shipobj.length; i++) {
    let index = await getAllIndexes(
      shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
      ii,
      "usagitier",
      false
    );
    if (index.length != 0) {
      let hullindex = i;
      let hullname = shipobj[i][0];
      let tier = a1;
      await buildit(hullindex, hullname, tier, index, shipobj);
    }
  }
}

async function buildtaghtml(a1) {
  a1 = a1.replace(" en", "");
  a1 = a1.replace(" jp", "");
  a1 = a1.replace(" cn", "");
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a1 == undefined) {
    await buildhtmlall();
  }

  for (let i = 0; i < shipobj.length; i++) {
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      let index = await getAllIndexes(
        shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
        a1,
        "tags",
        true
      );
      if (index.length != 0) {
        let hullindex = i;
        let hullname = shipobj[i][0];
        let tier = Object.keys(shipobj[i][1])[ii];
        await buildit(hullindex, hullname, tier, index, shipobj);
      }
    }
  }
}

async function buildrarityhtml(a1) {
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a1 == undefined) {
    await buildhtmlall();
  } else {
    if (a1 == "SuperRare") {
      a1 = "Super Rare";
    }
  }
  for (let i = 0; i < shipobj.length; i++) {
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      let index = await getAllIndexes(
        shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
        a1,
        "rarity",
        false
      );
      if (index.length != 0) {
        let hullindex = i;
        let hullname = shipobj[i][0];
        let tier = Object.keys(shipobj[i][1])[ii];
        await buildit(hullindex, hullname, tier, index, shipobj);
      }
    }
  }
}

async function buildit(b1, b2, b3, b4, shipobj) {
  if (document.getElementsByClassName(b2).length == 0) {
    // Hulltype class
    let t = document.createElement("div");
    t.className = shipobj[b1][0] + " all";
    let classname = shipobj[b1][0];
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
  let sizecheck = await tiersize(b4.length);
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
    await buildhtmlall();
  } else {
    if (
      a1 == "AviationBattleship" ||
      a1 == "Monitor" ||
      a1 == "Repairship" ||
      a1 == "SubmarineCarrier"
    ) {
      await buildspecialtype(a1);
    } else {
      await buildhulltype(a1);
    }
  }

  async function buildhulltype(a1) {
    let i;
    switch (a1) {
      case "battleship":
        i = 0;
        break;
      case "carrier":
        i = 1;
        break;
      case "heavycruiser":
        i = 2;
        break;
      case "lightcruiser":
        i = 3;
        break;
      case "destroyer":
        i = 4;
        break;
      case "submarine":
        i = 5;
        break;
    }
    // Hulltype class
    let t = document.createElement("div");
    t.className = shipobj[i][0] + " all";
    let classname = shipobj[i][0];
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
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      if (shipobj[i][1][Object.keys(shipobj[i][1])[ii]].length != 0) {
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

  async function buildspecialtype(a1) {
    let tier;
    let hulltypeidf;
    let idf;
    switch (a1) {
      case "AviationBattleship":
        hulltypeidf = "battleship";
        idf = 1;
        break;
      case "Monitor":
        hulltypeidf = "battleship";
        idf = 1;
        break;
      case "Repairship":
        hulltypeidf = "carrier";
        idf = 2;
        break;
      case "SubmarineCarrier":
        hulltypeidf = "submarine";
        idf = 5;
        break;
    }
    // Hulltype class
    let t = document.createElement("div");
    t.className = hulltypeidf + " all";
    let classname = hulltypeidf;
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
          tier = "t0";
          break;
        case 1:
          tier = "t1";
          break;
        case 2:
          tier = "t2";
          break;
        case 3:
          tier = "t3";
          break;
        case 4:
          tier = "t4";
          break;
        case 5:
          tier = "t5";
          break;
        case 6:
          tier = "t6";
          break;
        case 7:
          tier = "t7";
          break;
      }

      let index = await getAllIndexes(
        shipobj[idf][1][tier],
        a1,
        "hullTypeId",
        false
      );
      if (index.length != 0) {
        await buildspecialtier(tier, index, hulltypeidf);
      }
    }
  }
  async function buildspecialtier(a1, a2, a3) {
    // s == t0 t1 t2 usw
    let s = document.createElement("div");
    s.className = a1;
    let sizecheck = await tiersize(a2.length);
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

async function buildmultihtml(a1, a2) {
  let hullfilterindex = {};
  let rarityfilterindex = {};
  let tagsfilterindex = {};
  let tierfilterindex = {};
  let nationalityfilterindex = {};
  let result = {};
  let index;
  let shipobj = Object.entries(ships);
  for (let z = 0; z < a1.length; z++) {
    if (a2[z] == "f1") {
      let tier;
      let hulltypeidf
      let idf
      switch (a1[z]) {
        case "battleship":
          hulltypeidf = "Battleship"
          filtername = "battleship"
          idf = 0
          break;
        case "carrier":
          hulltypeidf = "Carrier"
          filtername = "carrier"
          idf = 1
          break;
        case "heavycruiser":
          hulltypeidf = "HeavyCruiser"
          filtername = "heavycruiser"
          idf = 2
          break;
        case "lightcruiser":
          hulltypeidf = "LightCruiser"
          filtername = "lightcruiser"
          idf = 3
          break;
        case "destroyer":
          hulltypeidf = "Destroyer"
          filtername = "destroyer"
          idf = 4
          break;
        case "submarine":
          hulltypeidf = "Submarine"
          filtername = "submarine"
          idf = 5
          break;
        case "AviationBattleship":
          hulltypeidf = "AviationBattleship"
          filtername = "battleship"
          idf = 0
          break;
        case "Monitor":
          hulltypeidf = "Monitor"
          filtername = "battleship"
          idf = 0
          break;
        case "Repairship":
          hulltypeidf = "Repairship"
          filtername = "carrier"
          idf = 2
          break;
        case "SubmarineCarrier":
          hulltypeidf = "SubmarineCarrier"
          filtername = "submarine"
          idf = 5
          break;
      }
      hullfilterindex = {
        [filtername]: {}
      }
      for (let a = 0; a < 8; a++) {
        switch (a) {
          case 0:
            tier = "t0";
            index = await getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 1:
            tier = "t1";
            index = await getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 2:
            tier = "t2";
            index = await getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 3:
            tier = "t3";
            index = await getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 4:
            tier = "t4";
            index = await getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 5:
            tier = "t5";
            index = await getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 6:
            tier = "t6";
            index = await getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 7:
            tier = "t7";
            index = await getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
        }
      }
      result["hullfilterindex"] = hullfilterindex
    }
    if (a2[z] == "f2") {
      if (a1[z] == "SuperRare") {
        a1[z] = "Super Rare";
      }
      for (let i = 0; i < shipobj.length; i++) {
        rarityfilterindex[shipobj[i][0]] = {}
        for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
          index = await getAllIndexes(
            shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
            a1[z],
            "rarity",
            false
          );
          if (index.length != 0) {
            rarityfilterindex[shipobj[i][0]][
              [Object.keys(shipobj[i][1])[ii]]
            ] = index
          }
        }
      }
      let newrarityfilterindex = await removeemptyarr(rarityfilterindex)
      result["rarityfilterindex"] = newrarityfilterindex
    }
    if (a2[z] == "f3") {
      a1[z] = a1[z].replace(" en", "");
      a1[z] = a1[z].replace(" jp", "");
      a1[z] = a1[z].replace(" cn", "");
      for (let i = 0; i < shipobj.length; i++) {
        tagsfilterindex[shipobj[i][0]] = {}
        for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
          index = await getAllIndexes(
            shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
            a1[z],
            "tags",
            true
          );
          if (index.length != 0) {
            tagsfilterindex[shipobj[i][0]][
              [Object.keys(shipobj[i][1])[ii]]
            ] = index
          }
        }
      }
      let newtagsfilterindex = await removeemptyarr(tagsfilterindex)
      result["tagsfilterindex"] = newtagsfilterindex
    }
    if (a2[z] == "f4") {
      let ii = a1[z].match(/\d+/)[0];

      for (let i = 0; i < shipobj.length; i++) {
        tierfilterindex[shipobj[i][0]] = {}
        let index = await getAllIndexes(
          shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
          ii,
          "usagitier",
          false
        );
        if (index.length != 0) {
          tierfilterindex[shipobj[i][0]][
            [Object.keys(shipobj[i][1])[ii]]
          ] = index
        }
      }
      result["tierfilterindex"] = tierfilterindex
    }
    if (a2[z] == "f5") {
      a1[z] = a1[z].replace("_", " ");

      for (let i = 0; i < shipobj.length; i++) {
        nationalityfilterindex[shipobj[i][0]] = {}
        for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
          let index = await getAllIndexes(
            shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
            a1[z],
            "nationality",
            false
          );
          if (index.length != 0) {
            nationalityfilterindex[shipobj[i][0]][
              [Object.keys(shipobj[i][1])[ii]]
            ] = index
          }
        }
      }
      let newnationalityfilterindex = await removeemptyarr(nationalityfilterindex)
      result["nationalityfilterindex"] = newnationalityfilterindex
    }
  }

  await buildmultifilter(result)
  result = {};
}

async function removeemptyarr(arr) {
  let newobj = {};
  let a1 = Object.entries(arr)
  for (let i = 0; i < a1.length; i++) {
    if (Object.entries(a1[i][1]).length == 0) {
      a1.splice(i, 1);
    }
  }
  for (let a = 0; a < a1.length; a++) {
    newobj[a1[a][0]] = {};
    for (let aa = 0; aa < Object.entries(a1[a][1]).length; aa++) {
      newobj[a1[a][0]][Object.keys(a1[a][1])[aa]] = a1[a][1][Object.keys(a1[a][1])[aa]]
    }
  }
  return newobj
}

async function buildmultifilter(result) {
  let hulltype;
  let tier;

  switch (Object.entries(result).length) {
    case 2:
      arraysobj = arraysobj
      await gotrough(result)
      break;
    case 3:
      arraysobj = arraysobj
      await gotrough(result)
      break;
    case 4:
      arraysobj = arraysobj
      await gotrough(result)
      break;
    case 5:
      arraysobj = arraysobj
      await gotrough(result)
      break;
  }

  async function gotrough(result) {
    if (result.hullfilterindex != undefined) {
      let hulltypeobj = Object.entries(result.hullfilterindex)
      hulltype = Object.entries(result.hullfilterindex)[0][0]
      await pushintoarray(hulltypeobj, result.hullfilterindex)
    }

    if (result.tierfilterindex != undefined) {
      let tierobj = Object.entries(result.tierfilterindex)
      tier = Object.keys(tierobj[0][1])[0]
      await pushintoarray(tierobj, result.tierfilterindex)
    }

    if (result.rarityfilterindex != undefined) {
      let rarityobj = Object.entries(result.rarityfilterindex)
      await pushintoarray(rarityobj, result.rarityfilterindex)
    }

    if (result.tagsfilterindex != undefined) {
      let tagsobj = Object.entries(result.tagsfilterindex)
      await pushintoarray(tagsobj, result.tagsfilterindex)
    }

    if (result.nationalityfilterindex != undefined) {
      let nationalityobj = Object.entries(result.nationalityfilterindex)
      await pushintoarray(nationalityobj, result.nationalityfilterindex)
    }
    await getmatchesfilter(arraysobj, hulltype, tier, result)
  }
}

async function pushintoarray(a1, result) {
  for (let i = 0; i < a1.length; i++) {
    for (let ii = 0; ii < Object.keys(a1[i][1]).length; ii++) {
      arraysobj[a1[i][0]][Object.keys(a1[i][1])[ii]].push(result[a1[i][0]][Object.keys(a1[i][1])[ii]])
    }
  }
}

async function getmatchesfilter(a1, a2, a3, a4) {
  let hullobj;
  let returnfilterindex;
  if (a2 != undefined) {
    hullobj = a1[a2];
    if (a3 != undefined) {
      if (hullobj[a3].length > 1 && hullobj[a3].length == Object.entries(a4).length) {
        returnfilterindex = await filter(hullobj[a3])
        let shipobj = ships;
        let newhullobj = shipobj[a2][a3]
        await buildfiltermainhtml(newhullobj, a2, a3, returnfilterindex)
      } else {
        document.getElementsByClassName("main")[0].innerHTML = "";
        let t = document.createElement("h1");
        t.className = "nomatchestext";
        t.innerText = "No matches found. Try again."
        maincont.appendChild(t);
      }
    } else {
      let newshipobj = {};
      for (let i = 0; i < Object.keys(hullobj).length; i++) {
        if (hullobj[Object.keys(hullobj)[i]].length > 1 && hullobj[Object.keys(hullobj)[i]].length == Object.entries(a4).length) {
          returnfilterindex = await filter(hullobj[Object.keys(hullobj)[i]])
          if (returnfilterindex != 0) {
            newshipobj[Object.keys(hullobj)[i]] = returnfilterindex
          }
        }
      }
      if (Object.keys(newshipobj).length != 0) {
        let shipobj = ships;
        let newhullobj = shipobj[a2]
        await buildfiltermainhtml(newhullobj, a2, a3, newshipobj)
      } else {
        document.getElementsByClassName("main")[0].innerHTML = "";
        let t = document.createElement("h1");
        t.className = "nomatchestext";
        t.innerText = "No matches found. Try again."
        maincont.appendChild(t);
      }
    }
  } else {
    if (a3 != undefined) {
      let newshipobj = {};
      for (let i = 0; i < Object.keys(a1).length; i++) {
        hullobj = a1[Object.keys(a1)[i]]
        if (hullobj[a3].length > 1 && hullobj[a3].length == Object.entries(a4).length) {
          returnfilterindex = await filter(hullobj[a3])
          if (returnfilterindex != 0) {
            newshipobj[Object.keys(a1)[i]] = {}
            newshipobj[Object.keys(a1)[i]][a3] = returnfilterindex
          }
        }
      }
      if (Object.keys(newshipobj).length != 0) {
        let shipobj = ships;
        let newhullobj = shipobj
        await buildfiltermainhtml(newhullobj, a2, a3, newshipobj)
      } else {
        document.getElementsByClassName("main")[0].innerHTML = "";
        let t = document.createElement("h1");
        t.className = "nomatchestext";
        t.innerText = "No matches found. Try again."
        maincont.appendChild(t);
      }
    } else {
      let newshipobj = {};
      for (let i = 0; i < Object.keys(a1).length; i++) {
        hullobj = a1[Object.keys(a1)[i]]
        for (let ii = 0; ii < Object.keys(a1).length; ii++) {
          if (Object.entries(hullobj)[ii][1].length > 1 && Object.entries(hullobj)[ii][1].length == Object.entries(a4).length) {
            returnfilterindex = await filter(hullobj[Object.entries(hullobj)[ii][0]])
            if (returnfilterindex != 0) {
              newshipobj[Object.keys(a1)[i]] = {}
              newshipobj[Object.keys(a1)[i]][Object.entries(hullobj)[ii][0]] = returnfilterindex
            }
          }
        }
      }
      if (Object.keys(newshipobj).length != 0) {
        let shipobj = ships;
        let newhullobj = shipobj
        await buildfiltermainhtml(newhullobj, a2, a3, newshipobj)
      } else {
        document.getElementsByClassName("main")[0].innerHTML = "";
        let t = document.createElement("h1");
        t.className = "nomatchestext";
        t.innerText = "No matches found. Try again."
        maincont.appendChild(t);
      }
    }
  }
}
async function filter(b1) {
  var result = b1.shift().filter(function (v) {
    return b1.every(function (a) {
      return a.indexOf(v) !== -1;
    });
  });
  return result
}

async function buildfiltermainhtml(a1, a2, a3, a4) {
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a2 != undefined) {
    if (a3 == undefined) {
      // Hulltype class
      let t = document.createElement("div");
      t.className = a2 + " all";
      let classname = a2;
      maincont.appendChild(t);
      // Hulltype class banner
      let b = document.createElement("img");
      b.className = a2 + "banner";
      b.style.marginRight = "30px";
      if (a2 == "heavycruiser") {
        b.src = "Assets/TierClassBanner/HeavyCruiser.png";
      } else if (a2 == "lightcruiser") {
        b.src = "Assets/TierClassBanner/LightCruiser.png";
      } else {
        b.src =
          "Assets/TierClassBanner/" +
          a2.charAt(0).toUpperCase() +
          a2.slice(1) +
          ".png";
      }
      b.draggable = false;
      document.getElementsByClassName(a2)[0].appendChild(b);

      for (let i = 0; i < Object.keys(a4).length; i++) {
        // s == t0 t1 t2 usw
        let s = document.createElement("div");
        s.className = Object.keys(a4)[i];
        let sizecheck = await tiersize(a4[Object.keys(a4)[i]].length);
        s.style.width = sizecheck.result;
        s.style.marginRight = "20px";
        document.getElementsByClassName(a2)[0].appendChild(s);

        let f = document.createElement("div");
        f.className = "tierbanner";
        f.draggable = false;
        let ttext = await tiertext(Object.keys(a4)[i]);
        f.innerHTML = ttext;
        f.style.width = sizecheck.rawresult - 10 + "px";
        document
          .getElementsByClassName(a2)[0]
          .getElementsByClassName(Object.keys(a4)[i])[0]
          .appendChild(f);
        await filltierspecial(a2, s.className, a4[Object.keys(a4)[i]]);
      }
    } else {
      // Hulltype class
      let t = document.createElement("div");
      t.className = a2 + " all";
      let classname = a2;
      maincont.appendChild(t);
      // Hulltype class banner
      let b = document.createElement("img");
      b.className = a2 + "banner";
      b.style.marginRight = "30px";
      if (a2 == "heavycruiser") {
        b.src = "Assets/TierClassBanner/HeavyCruiser.png";
      } else if (a2 == "lightcruiser") {
        b.src = "Assets/TierClassBanner/LightCruiser.png";
      } else {
        b.src =
          "Assets/TierClassBanner/" +
          a2.charAt(0).toUpperCase() +
          a2.slice(1) +
          ".png";
      }
      b.draggable = false;
      document.getElementsByClassName(a2)[0].appendChild(b);

      // s == t0 t1 t2 usw
      let s = document.createElement("div");
      s.className = a3;
      let sizecheck = await tiersize(a1.length);
      s.style.width = sizecheck.result;
      s.style.marginRight = "20px";
      document.getElementsByClassName(a2)[0].appendChild(s);

      let f = document.createElement("div");
      f.className = "tierbanner";
      f.draggable = false;
      let ttext = await tiertext(a3);
      f.innerHTML = ttext;
      f.style.width = sizecheck.rawresult - 10 + "px";
      document
        .getElementsByClassName(a2)[0]
        .getElementsByClassName(a3)[0]
        .appendChild(f);
      await filltierspecial(a2, s.className, a4);
    }
  } else {
    if (a3 != undefined) {
      for (let i = 0; i < Object.keys(a4).length; i++) {
        // Hulltype class
        let t = document.createElement("div");
        t.className = Object.keys(a4)[i] + " all";
        let classname = Object.keys(a4)[i];
        maincont.appendChild(t);
        // Hulltype class banner
        let b = document.createElement("img");
        b.className = Object.keys(a4)[i] + "banner";
        b.style.marginRight = "30px";
        if (Object.keys(a4)[i] == "heavycruiser") {
          b.src = "Assets/TierClassBanner/HeavyCruiser.png";
        } else if (Object.keys(a4)[i] == "lightcruiser") {
          b.src = "Assets/TierClassBanner/LightCruiser.png";
        } else {
          b.src =
            "Assets/TierClassBanner/" +
            Object.keys(a4)[i].charAt(0).toUpperCase() +
            Object.keys(a4)[i].slice(1) +
            ".png";
        }
        b.draggable = false;
        document.getElementsByClassName(Object.keys(a4)[i])[0].appendChild(b);

        // s == t0 t1 t2 usw
        let s = document.createElement("div");
        s.className = a3;
        let sizecheck = await tiersize(Object.entries(a4)[0][1][a3].length);
        s.style.width = sizecheck.result;
        s.style.marginRight = "20px";
        document.getElementsByClassName(Object.keys(a4)[i])[0].appendChild(s);

        let f = document.createElement("div");
        f.className = "tierbanner";
        f.draggable = false;
        let ttext = await tiertext(a3);
        f.innerHTML = ttext;
        f.style.width = sizecheck.rawresult - 10 + "px";
        document
          .getElementsByClassName(Object.keys(a4)[i])[0]
          .getElementsByClassName(a3)[0]
          .appendChild(f);
        await filltierspecial(Object.keys(a4)[i], s.className, Object.entries(a4)[i][1][a3]);
      }
    } else {
      console.log(a4)
      console.log(Object.keys(a4))
      for (let i = 0; i < Object.keys(a4).length; i++) {
        // Hulltype class
        let t = document.createElement("div");
        t.className = Object.keys(a4)[i] + " all";
        let classname = Object.keys(a4)[i];
        maincont.appendChild(t);
        // Hulltype class banner
        let b = document.createElement("img");
        b.className = Object.keys(a4)[i] + "banner";
        b.style.marginRight = "30px";
        if (Object.keys(a4)[i] == "heavycruiser") {
          b.src = "Assets/TierClassBanner/HeavyCruiser.png";
        } else if (Object.keys(a4)[i] == "lightcruiser") {
          b.src = "Assets/TierClassBanner/LightCruiser.png";
        } else {
          b.src =
            "Assets/TierClassBanner/" +
            Object.keys(a4)[i].charAt(0).toUpperCase() +
            Object.keys(a4)[i].slice(1) +
            ".png";
        }
        b.draggable = false;
        document.getElementsByClassName(Object.keys(a4)[i])[0].appendChild(b);
        for (let ii = 0; ii < Object.keys(Object.entries(a4)[i][1]).length; ii++) {
          console.log(Object.keys(Object.entries(a4)[i][1])[ii])
          // s == t0 t1 t2 usw
          let s = document.createElement("div");
          s.className = Object.keys(Object.entries(a4)[i][1])[ii];
          let sizecheck = await tiersize(Object.entries(a4)[i][1][Object.keys(Object.entries(a4)[i][1])[ii]].length);
          s.style.width = sizecheck.result;
          s.style.marginRight = "20px";
          document.getElementsByClassName(Object.keys(a4)[i])[0].appendChild(s);

          let f = document.createElement("div");
          f.className = "tierbanner";
          f.draggable = false;
          let ttext = await tiertext(Object.keys(Object.entries(a4)[i][1])[ii]);
          f.innerHTML = ttext;
          f.style.width = sizecheck.rawresult - 10 + "px";
          document
            .getElementsByClassName(Object.keys(a4)[i])[0]
            .getElementsByClassName(Object.keys(Object.entries(a4)[i][1])[ii])[0]
            .appendChild(f);
          await filltierspecial(Object.keys(a4)[i], s.className, Object.entries(a4)[i][1][Object.keys(Object.entries(a4)[i][1])[ii]]);

        }
      }
    }

  }
}

async function buildhtmlall(a1) {
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";

  for (let i = 0; i < shipobj.length; i++) {
    // Hulltype class
    let t = document.createElement("div");
    t.className = shipobj[i][0] + " all";
    let classname = shipobj[i][0];
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
    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      if (shipobj[i][1][Object.keys(shipobj[i][1])[ii]] != 0) {
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
}

async function filltier(a1, a2) {
  let lang;
  let textcheck;
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
    a.src =
      "Assets/RarityBGs/" +
      (await removespaces(ships[`${a1}`][`${a2}`][i].rarity)) +
      ".png";
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    a = document.createElement("a");
    a.className = "link";
    a.href = ships[`${a1}`][`${a2}`][i].wikiUrl;
    a.draggable = false;
    a.target = "_blank";
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
    if (languageid == "en" || languageid == "jp" || languageid == "kr") {
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
        if (languageid == "en" || languageid == "jp" || languageid == "kr") {
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
    if (languageid == "kr") {
      a.className = "text_kr show";
    } else {
      a.className = "text_kr";
    }
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
    for (let ii = 0; ii < 4; ii++) {
      a = document.createElement("span");
      switch (ii) {
        case 0:
          language = "en";
          lang = "en";
          break;
        case 1:
          language = "jp";
          lang = "jp";
          break;
        case 2:
          language = "cn";
          lang = "cn";
          break;
        case 3:
          language = "kr";
          lang = "kr";
          break;
      }
      if (ships[`${a1}`][`${a2}`][i].names[language] == null) {
        lang = "en";
        textcheck = await texthandler(
          ships[`${a1}`][`${a2}`][i].names[lang].length,
          ships[`${a1}`][`${a2}`][i].names[lang],
          lang
        );
      } else {
        textcheck = await texthandler(
          ships[`${a1}`][`${a2}`][i].names[lang].length,
          ships[`${a1}`][`${a2}`][i].names[lang],
          language
        );
      }

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
  //console.log(a1)
  // console.log(a2)
  //console.log(a3)
  let lang;
  let textcheck;
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
    a.target = "_blank";
    a.draggable = false;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // rarity
    a = document.createElement("img");
    a.className = "rarityimg";
    a.src =
      "Assets/RarityBGs/" +
      (await removespaces(ships[`${a1}`][`${a2}`][a3[i]].rarity)) +
      ".png";
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
    if (languageid == "en" || languageid == "jp" || languageid == "kr") {
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
        if (languageid == "en" || languageid == "jp" || languageid == "kr") {
          a.className = "tag" + (ii + 1) + " show";
        } else {
          a.className = "tag" + (ii + 1);
        }
        a.src =
          "Assets/TagIcons/EN/" +
          ships[`${a1}`][`${a2}`][a3[i]].tags[ii] +
          ".png";
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
          "Assets/TagIcons/CN/" +
          ships[`${a1}`][`${a2}`][a3[i]].tags[ii] +
          ".png";
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
      "Assets/HullTypeIcons/" +
      ships[`${a1}`][`${a2}`][a3[i]].hullTypeId +
      ".png";
    a.draggable = false;
    document
      .getElementsByClassName(a1)[0]
      .getElementsByClassName(a2)[0]
      .getElementsByClassName("parent")[i].appendChild(a);

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
    if (languageid == "kr") {
      a.className = "text_kr show";
    } else {
      a.className = "text_kr";
    }
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
    for (let ii = 0; ii < 4; ii++) {
      a = document.createElement("span");
      switch (ii) {
        case 0:
          language = "en";
          lang = "en";
          break;
        case 1:
          language = "jp";
          lang = "jp";
          break;
        case 2:
          language = "cn";
          lang = "cn";
          break;
        case 3:
          language = "kr";
          lang = "kr";
          break;
      }
      if (ships[`${a1}`][`${a2}`][a3[i]].names[language] == null) {
        lang = "en";
        textcheck = await texthandler(
          ships[`${a1}`][`${a2}`][i].names[lang].length,
          ships[`${a1}`][`${a2}`][i].names[lang],
          lang
        );
      } else {
        textcheck = await texthandler(
          ships[`${a1}`][`${a2}`][a3[i]].names[lang].length,
          ships[`${a1}`][`${a2}`][a3[i]].names[lang],
          language
        );
      }

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