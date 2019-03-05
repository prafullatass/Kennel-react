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
    addNewAnimal(newAnimal) {
        return fetch(`${taco.remoteURL}/animals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnimal)
        }).then(data => data.json())
      },
      put(editedAnimal) {
        return fetch(`${taco.remoteURL}/animals/${editedAnimal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedAnimal)
        }).then(data => data.json());
      }
}