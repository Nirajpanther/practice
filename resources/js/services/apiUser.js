import Http from "./Http";

export default {
    getUsers() {
        return new Promise((resolve, reject) => {
            Http.get("http://lara-sanctum.test/api/user")
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    createUser(data) {
        return new Promise((resolve, reject) => {
            Http.post("http://lara-sanctum.test/api/user/add", data)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    showUser(id) {
        return new Promise((resolve, reject) => {
            Http.get("http://lara-sanctum.test/api/user/show/" + id)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    updateUser(id, data) {
        return new Promise((resolve, reject) => {
            Http.post("http://lara-sanctum.test/api/user/update/" + id, data)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    deleteUser(id) {
        return new Promise((resolve, reject) => {
            Http.delete("http://lara-sanctum.test/api/user/delete/" + id)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    logedUser() {
        return new Promise((resolve, reject) => {
            Http.get("http://lara-sanctum.test/api/getuser")
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },
};
