import instance from "./api.service";

const endPoint = "/post";

const getAllPosts = async () => {
  const response = await instance.get(`${endPoint}`);
  console.log(response);
  return response.data;
};

const getPost = async (id) => {
  const response = await instance.get(`${endPoint}/${id}`);
  return response.data;
};

const createPost = async (data) => {
  const response = await instance.post(`${endPoint}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updatePost = async (id, data) => {
  const response = await instance.put(`${endPoint}/${id}`, data);
  return response.data;
};

const deletePost = async (id) => {
  const response = await instance.delete(`${endPoint}/${id}`);
  return response.data;
};

const filterPosts = async (location) => {
  const response = await instance.get(
    `${endPoint}?lat=${location.lat}&lng=${location.lng}`
  );
  return response.data;
};

const PostService = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  filterPosts,
};

export default PostService;
