const BASE_URL = 'http://localhost:3000';

export const fetchPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);
  return res.json();
};

export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const fetchComments = async () => {
  const res = await fetch(`${BASE_URL}/comments`);
  return res.json();
};
