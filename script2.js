// glossary parsed ship formatted object = PSFO
// returns PSFO (object) with needle (object) found
// if no results found, the return should be an empty PSFO.
async function filter_ship_by_ship_like_obj(needle)
{
  let ret_psfo = {};
  // k,v = hull, and (object) ships in tier
  //ships.forEach((k, v) =>
  for (let k in ships)
  {
    let v = ships[k];
    // k2, v2 = tier, (object) ship
    //v.forEach((k2, v2) => 
    for (let k2 in v)
    {
      let v2 = v[k2];
      
      v2.forEach((ffs_ship) => {
        // if needle found
        if (check_if_ship_contains_needle(ffs_ship, needle) === Object.keys(needle).length)
        {
          // checks if hull type/tier exists before writing to ret_psfo.

          // check if hull type in ret_psfo
          if (!(k in ret_psfo))
          {
            ret_psfo[k] = {};
          }

          // checks if tier in ret_psfo
          if (!(k2 in ret_psfo[k]))
          {
            ret_psfo[k][k2] = [];
          }

          // check ship exists before adding to tier
          // should be safe but we wont want to have multiple of the same ship.
          // check if duplicate exists

          ret_psfo[k][k2].push(ffs_ship);
          
        }
      });
    }
  }
  return ret_psfo;
}

// check if ship (object) contains modified-ship object (difference is really just the key name vs names)
function check_if_ship_contains_needle(ship_obj, needle)
{
  let retval = 0;

  // check if name is a parameter
  if ("name" in needle)
  {
    // no need to be case sensitive.
    // currently only localized name
    // may want to include nickname; ie. z23 as nimi
    let test_needle = needle["name"].toLowerCase();
    let test_ship_info = ship_obj['names'][languageid].toLowerCase();

    if (test_ship_info.includes(test_needle))
    {
      retval += 1;
    }
  }
  
  // check if hullType is a parameter
  if ("hullType" in needle)
  {
    let test_needle = needle["hullType"];
    let test_ship_info = ship_obj['hullType'];

    // handle edge case of large cruiser, treat it as heavy cruiser as per the game
    if (test_ship_info === "Large Cruiser")
    {
      test_ship_info = "Heavy Cruiser";
    }

    test_needle.forEach(i => {
      if (test_ship_info.includes(i))
      {
        retval += 1;
      }

      // mimic the in-game filter of "Others"
      if (i === "Others")
      {
        switch(test_ship_info){
          case "AviationBattleship":
            retval += 1;
            break;

          case "Monitor":
            retval += 1;
            break;
        }
      }

      // aliases for set
      let vanguard_alias = ["Destroyer", "Light Cruiser", "Heavy Cruiser"];
      let main_alias = ["Battle", "Aircraft", "Repair"];

      // handle vanguard/main as per the game
      if (i === "Vanguard")
      {
        vanguard_alias.forEach(i2 => {
          if (test_ship_info.includes(i2))
          {
            retval += 1;
          }
        });
      }
      else if (i === "Main")
      {
        main_alias.forEach(i2 => {
          if (test_ship_info.includes(i2))
          {
            retval += 1;
          }
        });
      }
    });
  }

  // check if nationality is a parameter
  if ("nationality" in needle)
  {
    let test_needle = needle["nationality"];
    let test_ship_info = ship_obj['nationality'];

    test_needle.forEach(i => {
      // handle edge case where "Dragon Empery" & "Eastern Radiance" means the same thing?
      if (test_ship_info.toLowerCase().replace(" ", "") === "easternradiance")
      {
        test_ship_info = "dragonempery";
      }

      // handle edge case where "Northern Parliament" & "North Union" means the same thing?
      if (test_ship_info.toLowerCase().replace(" ", "") === "northunion")
      {
        test_ship_info = "northernparliament";
      }

      if (test_ship_info.toLowerCase().replace(" ", "") === i.toLowerCase().replace(" ", ""))
      {
        retval += 1;
      }

      // "Other" is not a typo, its to mimic the game 
      if (i === "Other")
      {
        let unlabelled_nationality = ["eagleunion", "royalnavy", "sakuraempire", "ironblood", "dragonempery", "sardegnaempire", "northernparliament", "irislibre", "vichyadominion"];
        
        if (!(unlabelled_nationality.includes(test_ship_info.toLowerCase().replace(" ", ""))))
        {
          retval += 1;
        }
      }
    });
  }

  // check if rarity is a parameter
  if ("rarity" in needle)
  {
    let test_needle = needle["rarity"];
    let test_ship_info = ship_obj['rarity'];

    // treat it as SR as per the game
    if (test_ship_info === "Priority")
    {
      test_ship_info = "Super Rare";
    }

    test_needle.forEach(i => {
      if (test_ship_info === i)
      {
        retval += 1;
      }
    });
  }

  // check if tags is a parameter
  if ("tags" in needle)
  {
    let test_needle = needle["tags"];
    let test_ship_info = ship_obj['tags'];

    if (test_ship_info !== null)
    {
      // testing of subset snipped from:
      // https://stackoverflow.com/questions/38811421/how-to-check-if-an-array-is-a-subset-of-another-array-in-javascript
      // turns out to be not what i wanted
      /**
      if (!test_needle.some(val => test_ship_info.indexOf(val) === -1))
      {
        retval += 1;
      }
      **/
      test_needle.forEach(i => {
        test_ship_info.forEach(i2 => {
          if (i === i2)
          {
            retval += 1;
          }
        });
      });
    }
  }

  // check if usagitier is a parameter
  if ("usagitier" in needle)
  {
    let test_needle = needle["usagitier"];
    let test_ship_info = "t" + ship_obj['usagitier'];

    test_needle.forEach(i => {
      if (test_ship_info === i)
      {
        retval += 1;
      }
    });
  }
  
  return retval;
}

// takes the PSFO and rewrite the tier table
// forked from buildhtmlall()
async function build_ship_table_from_psfo(psfo) {
  let shipobj = Object.entries(psfo);
  document.getElementsByClassName("main")[0].innerHTML = "";

  for (let i = 0; i < shipobj.length; i++) {
    // Hulltype class
    let t = document.createElement("div");
    let hull_type_class = shipobj[i][0];
    t.className = hull_type_class + " all";
    maincont.appendChild(t);

    // Hulltype class img
    let b = document.createElement("img");
    b.className = hull_type_class + "banner";
    b.style.marginRight = "30px";

    let quick_fix_img_src = hull_type_class.charAt(0).toUpperCase() + hull_type_class.slice(1);
    quick_fix_img_src = quick_fix_img_src.replace("cruiser", "Cruiser");

    b.src = "Assets/TierClassBanner/" + quick_fix_img_src + ".png";

    // old method of adding
    /**
    
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
    **/

    b.draggable = false;
    document.getElementsByClassName(hull_type_class)[0].appendChild(b);

    // filling ships to hull-type/tier table
    let list_of_ships_in_tier = shipobj[i][1];
    for (let ii = 0; ii < Object.keys(list_of_ships_in_tier).length; ii++) {
      if (list_of_ships_in_tier[Object.keys(list_of_ships_in_tier)[ii]] != 0) {
        // s == t0 t1 t2 usw
        let s = document.createElement("div");
        s.className = Object.keys(list_of_ships_in_tier)[ii];
        let sizecheck = await tiersize(
          list_of_ships_in_tier[Object.keys(list_of_ships_in_tier)[ii]].length
        );
        s.style.width = sizecheck.result;
        s.style.marginRight = "20px";
        document.getElementsByClassName(hull_type_class)[0].appendChild(s);

        let f = document.createElement("div");
        f.className = "tierbanner";
        f.draggable = false;
        let ttext = await tiertext(Object.keys(list_of_ships_in_tier)[ii]);
        f.innerHTML = ttext;
        f.style.width = sizecheck.rawresult - 10 + "px";
        document
          .getElementsByClassName(hull_type_class)[0]
          .getElementsByClassName(Object.keys(list_of_ships_in_tier)[ii])[0]
          .appendChild(f);

        await ffs_fill_tier(psfo, hull_type_class, s.className);
      }
    }
  }
}

// ffs_fill_tier(psfo, hull_type, tier_id)
async function ffs_fill_tier(psfo, hull_type, tier_id) {
  let lang;
  let textcheck;
  for (let i = 0; i < psfo[`${hull_type}`][`${tier_id}`].length; i++) {
    // Main div
    let a = document.createElement("div");
    a.className = "parent";
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .appendChild(a);
    // rarity
    a = document.createElement("img");
    a.className = "rarityimg";
    a.src =
      "Assets/RarityBGs/" +
      (await removespaces(psfo[`${hull_type}`][`${tier_id}`][i].rarity)) +
      ".png";
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    a = document.createElement("a");
    a.className = "link";
    a.href = psfo[`${hull_type}`][`${tier_id}`][i].wikiUrl;
    a.draggable = false;
    a.target = "_blank";
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // thumbnail
    a = document.createElement("img");
    a.className = "thumbnail";
    a.src = psfo[`${hull_type}`][`${tier_id}`][i].thumbnail;
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Bannerright
    if (psfo[`${hull_type}`][`${tier_id}`][i].banner != null) {
      a = document.createElement("img");
      a.className = "bannerright";
      a.src = psfo[`${hull_type}`][`${tier_id}`][i].bannerlink;
      document
        .getElementsByClassName(hull_type)[0]
        .getElementsByClassName(tier_id)[0]
        .getElementsByClassName("parent")[i].appendChild(a);
    }
    // Bannerleft
    if (psfo[`${hull_type}`][`${tier_id}`][i].banneralt != null) {
      a = document.createElement("img");
      a.className = "bannerleft";
      a.src = psfo[`${hull_type}`][`${tier_id}`][i].banneraltlink;
      document
        .getElementsByClassName(hull_type)[0]
        .getElementsByClassName(tier_id)[0]
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
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    a = document.createElement("div");
    if (languageid == "cn") {
      a.className = "tags_cn show";
    } else {
      a.className = "tags_cn";
    }
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // tags filler
    if (psfo[`${hull_type}`][`${tier_id}`][i].tags != null) {
      for (let ii = 0; ii < psfo[`${hull_type}`][`${tier_id}`][i].tags.length; ii++) {
        a = document.createElement("img");
        if (languageid == "en" || languageid == "jp" || languageid == "kr") {
          a.className = "tag" + (ii + 1) + " show";
        } else {
          a.className = "tag" + (ii + 1);
        }
        a.src =
          "Assets/TagIcons/EN/" + psfo[`${hull_type}`][`${tier_id}`][i].tags[ii] + ".png";
        document
          .getElementsByClassName(hull_type)[0]
          .getElementsByClassName(tier_id)[0]
          .getElementsByClassName("tags_en")[i].appendChild(a);

        a = document.createElement("img");
        if (languageid == "cn") {
          a.className = "tag" + (ii + 1) + " show";
        } else {
          a.className = "tag" + (ii + 1);
        }
        a.src =
          "Assets/TagIcons/CN/" + psfo[`${hull_type}`][`${tier_id}`][i].tags[ii] + ".png";
        document
          .getElementsByClassName(hull_type)[0]
          .getElementsByClassName(tier_id)[0]
          .getElementsByClassName("tags_cn")[i].appendChild(a);
      }
    }
    // Greyblock
    a = document.createElement("img");
    a.className = "greyblock";
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Hulltype
    a = document.createElement("img");
    a.className = "hulltype";
    a.src =
      "Assets/HullTypeIcons/" + psfo[`${hull_type}`][`${tier_id}`][i].hullTypeId + ".png";
    a.draggable = false;
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
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
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock jp
    a = document.createElement("div");
    if (languageid == "jp") {
      a.className = "text_jp show";
    } else {
      a.className = "text_jp";
    }
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock kr
    a = document.createElement("div");
    if (languageid == "kr") {
      a.className = "text_kr show";
    } else {
      a.className = "text_kr";
    }
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
      .getElementsByClassName("parent")[i].appendChild(a);
    // Textblock cn
    a = document.createElement("div");
    if (languageid == "cn") {
      a.className = "text_cn show";
    } else {
      a.className = "text_cn";
    }
    document
      .getElementsByClassName(hull_type)[0]
      .getElementsByClassName(tier_id)[0]
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
      if (psfo[`${hull_type}`][`${tier_id}`][i].names[language] == null) {
        lang = "en";
        textcheck = await texthandler(
          psfo[`${hull_type}`][`${tier_id}`][i].names[lang].length,
          psfo[`${hull_type}`][`${tier_id}`][i].names[lang],
          lang
        );
      } else {
        textcheck = await texthandler(
          psfo[`${hull_type}`][`${tier_id}`][i].names[lang].length,
          psfo[`${hull_type}`][`${tier_id}`][i].names[lang],
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
      a.innerHTML = psfo[`${hull_type}`][`${tier_id}`][i].names[lang];
      document
        .getElementsByClassName(hull_type)[0]
        .getElementsByClassName(tier_id)[0]
        .getElementsByClassName("parent")[i].getElementsByClassName("text_" + language)[0]
        .appendChild(a);
    }
  }
}

// takes the info from .ffs-filter to generate ship-like object as filter.
// ffs-filter will have more parameters in the future.
async function generate_psfo()
{
  let my_filter = {};

  let ffs_filter_actives = document.querySelectorAll('.ffs-filter-body-btn-active');

  ffs_filter_actives.forEach(e => {
    let ffs_filter_name = e.getAttribute("ffs-filter-name");
    let ffs_filter_value = e.getAttribute("value");

    // 
    if (ffs_filter_value === null)
    {
      ffs_filter_value = e.value;
    }

    if (ffs_filter_value === "")
    {
      ffs_filter_value = "all";
    }

    if (ffs_filter_value !== "all")
    {
      if (ffs_filter_name === "name" && ffs_filter_value.length !== 0)
      {
        my_filter[ffs_filter_name] = ffs_filter_value;
      }
      else
      {
        if (!(ffs_filter_name in my_filter) && ffs_filter_name !== "name")
        {
          my_filter[ffs_filter_name] = []
        }
        my_filter[ffs_filter_name].push(ffs_filter_value);
      }
    }
  });

  let my_filtered_psfo = await filter_ship_by_ship_like_obj(my_filter);
  await build_ship_table_from_psfo(my_filtered_psfo);

  // added temporarily. will be removed; duplicate of a function above.
  const ffs_filters = document.querySelectorAll('.ffs-filter.active')
  ffs_filters.forEach(ffs_filter => {
    closeChangelog(ffs_filter)
  });
}

// ignores tz; not too important imho
// takes in epoch time in int and return date in string (us locale)
async function lazy_epoch_to_date(epoch)
{
  let dateObj = new Date(epoch * 1000);
  return dateObj.toLocaleString("en-US").split(",")[0].replaceAll("/", ".");
}

async function clear_filters()
{
  let ffs_filter_actives = document.querySelectorAll('.ffs-filter-body-btn-active');

  ffs_filter_actives.forEach(i => {
    // clear active if not text input
    if (i.getAttribute("ffs-filter-name") !== "name")
    {
      i.className = "ffs-filter-body-btn";
    }

    // find "All" and make active
    i.parentNode.querySelectorAll('.ffs-filter-body-btn[value=all]').forEach(i2 => {
      i2.className = "ffs-filter-body-btn ffs-filter-body-btn-active";
    });
  });
  // clear text input for name search
  ffs_filter_actives[ffs_filter_actives.length-1].parentNode.querySelectorAll('.ffs-filter-body-btn-active[ffs-filter-name=name]')[0].value = "";
}

async function restore_state_from_cookie()
{
  // valid cookie value
  let valid_lang_id = ["en", "jp", "kr", "cn"];
  let hide_banner = false;

  // set language from cookie
  if (typeof Cookies.get("languageid") === "undefined")
  {
    // set en as default
    write_state_to_cookie("languageid", valid_lang_id[0]);
  }
  else
  {
    // check if its a valid lang
    if (valid_lang_id.includes(Cookies.get("languageid")))
    {
      languageid = Cookies.get("languageid");
    }
    else
    {
      // if invalid, revert to factory settings for this key
      write_state_to_cookie("languageid", valid_lang_id[0]);
    }
  }

  // set banner visibility from cookie
  if (typeof Cookies.get("hide_banner") !== "undefined")
  {
    hide_banner = Cookies.get("hide_banner");

    if (hide_banner === "true")
    {
      document.querySelectorAll(".topbanner")[0].style.display = "none";
    }
  }
}

// no checking for now :/
async function write_state_to_cookie(key, value)
{
  // valid cookie value
  //let default_cookies = {"languageid": ["en", "jp", "kr", "cn"], "hide_banner": false};

  Cookies.set(key, value);
}