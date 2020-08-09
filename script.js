async function getjson() {
    try {
    let data = await fetch("ships.json")
    let result = await data.json();
    return result
    } catch (e) {
      console.error(e);
    }
  }
  
  getjson()
  .then(result => console.log(result.destroyer.t0[0].tags.en))