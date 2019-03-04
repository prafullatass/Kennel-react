import Settings from "./setting"

export default {
    getAll  () {
        return fetch(`${Settings.remoteURL}/animalOwners`)
        .then(r => r.json())
    },
    get  (id) {
        return fetch(`${Settings.remoteURL}/animalOwners/${id}`)
        .then(r => r.json())
    },
    addAnimalOwner(newAnimalOwner) {
        return fetch(`${Settings.remoteURL}/animalOwners`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnimalOwner)
        }).then(data => data.json())
      }
}