import Http from "./Http";

export default {
  showList() {
    return new Promise((resolve, reject) => {
      Http.get("http://crud-api.test/api")
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err);
        });
    });
  },

  deletePost(id) {
    return new Promise((resolve, reject) => {
      Http.delete("http://crud-api.test/api/delete/" + id)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err);
        });
    });
  },

  showPost(id) {
    return new Promise((resolve, reject) => {
      Http.get("http://crud-api.test/api/" + id)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err);
        });
    });
  },

  createPost(data) {
    return new Promise((resolve, reject) => {
      Http.post("http://crud-api.test/api/create", data)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err);
        });
    });
  },

  editPost(id, data) {
    return new Promise((resolve, reject) => {
      Http.post("http://crud-api.test/api/update/" + id, data)
        .then(function (res) {
          return resolve(res.data);
        })
        .catch(function (err) {
          return reject(err);
        });
    });
  },
};
