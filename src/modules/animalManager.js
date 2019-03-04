import taco from "./setting"

export default {
    getAll  () {
        return fetch(`${taco.remoteURL}/animals`)
        .then(r => r.json())
    },
    get  (id) {
        return fetch(`${taco.remoteURL}/animals/${id}`)
        .then(r => r.json())
    },
    addAnimal(newAnimal) {
        return fetch(`${taco.remoteURL}/animals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnimal)
        }).then(data => data.json())
      }
}