import taco from "./setting"

export default {
    getAll  () {
        return fetch(`${taco.remoteURL}/employees`)
        .then(r => r.json())
    },
    get  (id) {
        return fetch(`${taco.remoteURL}/employees/${id}`)
        .then(r => r.json())
    }
}