import client from "./client";
const endPoint = "/users";

const users = [
  {
    _id: "6040b72bc90a5b0e6c61580a",
    userName: "john",
    email: "john1@domain.com",
    phone: 987654321,
    jobCategory: "6040b72bc90a5b0e6c61580a",
    categoryName: "electrician",

    isAdmin: false,
    approved: false,
    rating: 0,
    workPlace: "fleelance",
    image:
      "http://192.168.43.21:5000/assets/1618565724538IMG_20200124_110611.jpg_full.jpg",
  },
  {
    _id: "6040b82bc90a5b0e6c61580a",
    userName: "sarah",
    email: "muthoni@domain.com",
    phone: 234567899,
    jobCategory: "6040b72bc90a5b0e6c61580a",
    categoryName: "electrician",

    isAdmin: false,
    approved: true,
    rating: 0,
    workPlace: "fleelance",
    image:
      "http://192.168.43.21:5000/assets/1618565817743IMG_20200124_110611.jpg_full.jpg",
  },
  {
    _id: "6080e575e1cd42153ca3470a",
    userName: "emily",
    email: "emily@domain.com",
    phone: 123456789,
    jobCategory: "6080e34a4c697a1674d0164a",
    categoryName: "electrician",
    isAdmin: false,
    approved: false,
    rating: 0,
    workPlace: "fleelance",
    image:
      "http://192.168.43.21:5000/assets/1619060084800IMG_20200302_171137.jpg_full.jpg",
  },
];

const register = (userInfo, onUploadProgress) => {
  const data = new FormData();
  data.append("userName", userInfo.userName);
  data.append("email", userInfo.email);
  data.append("phone", parseInt(userInfo.phone));
  data.append("location", userInfo.city + ", " + userInfo.location);
  data.append("password", userInfo.password);
  data.append("workPlace", userInfo.workPlace);
  data.append("jobCategory", userInfo.jobCategory._id);

  data.append("image", {
    name: "image" + Date.now().toString(),
    type: "image/jpeg",
    uri: userInfo.image,
  });

  // category.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image " + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );

  console.log("userInfo to send  like", data);

  return client.post(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getUser = (id) => client.get(endPoint + "/" + id);

const getMembers = (category) =>
  client.get(endPoint + "/" + "members" + "/" + category);
// const getMembers = (category) => {
//   return {
//     data: users.filter((user) => user.jobCategory == category),
//     ok: true,
//   };
// };

const getUnapproved = () =>
  client.get(endPoint + "/" + "000000000000000000000000");
// const getUnapproved = () => {
//   return {
//     ok: true,
//     data: users.filter((user) => user.approved === false),
//   };
// };

const updateUser = (id, path) => client.patch(endPoint + "/" + id, path);

export default { register, getUser, getMembers, getUnapproved, updateUser };
