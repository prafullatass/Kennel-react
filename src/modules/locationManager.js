import Settings from "./setting"

export default {
    getAll  () {
        return fetch(`${Settings.remoteURL}/locations`)
        .then(r => r.json())
    },
    get  (id) {
        return fetch(`${Settings.remoteURL}/locations/${id}`)
        .then(r => r.json())
    }
}