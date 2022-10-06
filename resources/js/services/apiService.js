import Http from "./Http";

export default {
    logedUser(data) {
        Http.get("http://lara-sanctum.test/sanctum/csrf-cookie");
        return new Promise((resolve, reject) => {
            Http.post("http://lara-sanctum.test/api/login", data)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data.message[0]);
                });
        });
    },

    logout() {
        return new Promise((resolve, reject) => {
            Http.get("http://lara-sanctum.test/api/logout")
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    register(data) {
        Http.get("http://lara-sanctum.test/sanctum/csrf-cookie");
        return new Promise((resolve, reject) => {
            Http.post("http://lara-sanctum.test/api/register", data)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    getStudents() {
        return new Promise((resolve, reject) => {
            Http.get("http://lara-sanctum.test/api/student")
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    createStudent(data) {
        return new Promise((resolve, reject) => {
            Http.post("http://lara-sanctum.test/api/student/add", data)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    showStudent(id) {
        return new Promise((resolve, reject) => {
            Http.get("http://lara-sanctum.test/api/student/edit/" + id)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    editStudent(data, id) {
        return new Promise((resolve, reject) => {
            Http.post("http://lara-sanctum.test/api/student/update/" + id, data)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    deleteStudent(id) {
        return new Promise((resolve, reject) => {
            Http.delete("http://lara-sanctum.test/api/student/delete/" + id)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    genterateToken(head) {
        return new Promise((resolve, reject) => {
            Http.get(
                "https://www.universal-tutorial.com/api/getaccesstoken",
                head
            )
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    getCountry(head) {
        return new Promise((resolve, reject) => {
            Http.get("https://www.universal-tutorial.com/api/countries/", head)
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    getStates(head, country) {
        return new Promise((resolve, reject) => {
            Http.get(
                "https://www.universal-tutorial.com/api/states/" + country,
                head
            )
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },

    getCities(head, state) {
        return new Promise((resolve, reject) => {
            Http.get(
                "https://www.universal-tutorial.com/api/cities/" + state,
                head
            )
                .then(function (res) {
                    return resolve(res.data);
                })
                .catch(function (err) {
                    return reject(err.response.data);
                });
        });
    },
};
