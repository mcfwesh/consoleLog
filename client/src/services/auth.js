import axios from "axios";

const signup = (
  username,
  password,
  name,
  surname,
  role,
  description,
  specialization,
  imageUrl,
  github,
  codewars,
  linkedin,
  classroom
) => {
  return axios
    .post("/api/auth/signup", {
      username,
      password,
      name,
      surname,
      role,
      description,
      specialization,
      imageUrl,
      github,
      codewars,
      linkedin,
      classroom,
    })
    .then((response) => {
      //console.log(response);
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const login = (username, password, faceId) => {
  return axios
    .post("/api/auth/login", { username, password, faceId })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete("/api/auth/logout")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const project = (
  title,
  description,
  imageUrl,
  number,
  github,
  heroku,
  names,
  users
) => {
  return axios
    .post("/api/projects", {
      title,
      description,
      imageUrl,
      number,
      github,
      heroku,
      names,
      users,
    })
    .then((response) => {
      //console.log(response);
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const handleUpload = (theFile) => {
  // console.log('file in service: ', theFile)
  return axios
    .post("/api/upload", theFile)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

const saveNewThing = (newThing) => {
  // console.log('new thing is: ', newThing)
  return axios
    .post("/api/things/create", newThing)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export { signup, login, logout, project, handleUpload, saveNewThing };
