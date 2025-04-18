import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const data = await fetchPosts();
        const sorted = data.sort((a, b) => new Date(b.timestamp || b.createdAt || b.date) - new Date(a.timestamp || a.createdAt || a.date));
        setPosts(sorted);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchAndUpdate();
    const interval = setInterval(fetchAndUpdate, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>📡 Live Feed</h2>
      {posts.map(post => (
        <div key={post.id} style={styles.card}>
          <img src={`https://source.unsplash.com/random/100x100?sig=${post.id}`} alt="random" style={styles.image} />
          <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
    background: '#f9f9f9',
  },
  image: {
    borderRadius: '10px',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  }
};

export default Feed;
