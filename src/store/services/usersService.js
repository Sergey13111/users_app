
import axios from '../../helpers/axios';

const getUsers = async () => {
  const users = await axios.get('/users');
  return users;
};

const getPosts = async (id) => {
  const posts = await axios.get(`/users/${id}/posts`);
  return posts;
};

const getAlbums = async (id) => {
  const albums = await axios.get(`/users/${id}/albums`);
  return albums;
};

const usersService = {
  getUsers,
  getPosts,
  getAlbums
};

export default usersService;