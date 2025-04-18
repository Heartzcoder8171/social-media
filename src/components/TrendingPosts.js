import { useEffect, useState } from 'react';
import { fetchPosts, fetchComments } from '../services/api';

function TrendingPosts() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const posts = await fetchPosts();
        const comments = await fetchComments();

        const commentCountMap = {};
        comments.forEach(comment => {
          commentCountMap[comment.postId] = (commentCountMap[comment.postId] || 0) + 1;
        });

        const postsWithComments = posts.map(post => ({
          ...post,
          commentCount: commentCountMap[post.id] || 0
        }));

        const sorted = postsWithComments.sort((a, b) => b.commentCount - a.commentCount);
        setTrending(sorted.slice(0, 5));
      } catch (err) {
        console.error('Error fetching trending posts:', err);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>🔥 Trending Posts</h2>
      {trending.map(post => (
        <div key={post.id} style={styles.card}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p><strong>Comments:</strong> {post.commentCount}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    background: '#fff7e6'
  }
};

export default TrendingPosts;
