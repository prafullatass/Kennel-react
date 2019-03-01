import Settings from "./setting"

export default {
    getAll  () {
        return fetch(`${Settings.remoteURL}/owners`)
        .then(r => r.json())
    },
    get  (id) {
        return fetch(`${Settings.remoteURL}/owners/${id}`)
        .then(r => r.json())
    }
}