import taco from "./setting"

export default {
    getAll  () {
        return fetch(`${taco.remoteURL}/animals`)
        .then(r => r.json())
    },
    get  (id) {
        return fetch(`${taco.remoteURL}/animals/${id}`)
        .then(r => r.json())
    }
}