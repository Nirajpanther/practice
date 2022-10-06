import Http from "./Http";

export default {
  getRoles() {
    return new Promise((resolve, reject) => {
      Http.get("http://lara-sanctum.test/api/role")
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },

  createRole(data) {
    return new Promise((resolve, reject) => {
      Http.post("http://lara-sanctum.test/api/role/add", data)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },

  showRole(id) {
    return new Promise((resolve, reject) => {
      Http.get("http://lara-sanctum.test/api/role/edit/" + id)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },

  updateRole(id, data) {
    return new Promise((resolve, reject) => {
      Http.post("http://lara-sanctum.test/api/role/update/" + id, data)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },

  deleteRole(id) {
    return new Promise((resolve, reject) => {
      Http.delete("http://lara-sanctum.test/api/role/delete/" + id)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },
};
