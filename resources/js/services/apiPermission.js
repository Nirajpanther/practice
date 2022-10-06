import Http from "./Http";

export default {
  getPermissions() {
    return new Promise((resolve, reject) => {
      Http.get("http://lara-sanctum.test/api/permission")
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },

  createPermission(data) {
    return new Promise((resolve, reject) => {
      Http.post("http://lara-sanctum.test/api/permission/add", data)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },

  showPermission(id) {
    return new Promise((resolve, reject) => {
      Http.get("http://lara-sanctum.test/api/permission/edit/" + id)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },

  updatePermission(id, data) {
    return new Promise((resolve, reject) => {
      Http.post("http://lara-sanctum.test/api/permission/update/" + id, data)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },

  deletePermission(id) {
    return new Promise((resolve, reject) => {
      Http.delete("http://lara-sanctum.test/api/permission/delete/" + id)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err.response.data);
        });
    });
  },
};
