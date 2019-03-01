import Settings from "./setting"

export default {
    getAll  () {
        return fetch(`${Settings.remoteURL}/animalOwners`)
        .then(r => r.json())
    },
    get  (id) {
        return fetch(`${Settings.remoteURL}/animalOwners/${id}`)
        .then(r => r.json())
    }
}