import client from "./client";

const endPoint = "/categories";

const getCategories = () => client.get(endPoint);
// const getCategories = () => {
//   return {
//     data: options,
//     ok: true,
//   };
// };

const addCategories = (category, onUploadProgress) => {
  const data = new FormData();
  data.append("category", category.label);
  data.append("tagline", category.tagline);
  data.append("image", {
    name: "service" + Date.now().toString(),
    type: "image/jpeg",
    uri: category.image,
  });

  console.log("service to send like", data);

  return client.post(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const deleteCategory = (id) => client.delete(endPoint + "/" + id);

export default {
  getCategories: getCategories,
  addCategory: addCategories,
  deleteCategory: deleteCategory,
};
