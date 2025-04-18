import { useEffect, useState } from 'react';
import { fetchUsers, fetchPosts } from '../services/api';

function TopUsers() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await fetchUsers();
        const posts = await fetchPosts();

        const userPostCount = {};
        posts.forEach(post => {
          userPostCount[post.userId] = (userPostCount[post.userId] || 0) + 1;
        });

        const usersWithPostCount = users.map(user => ({
          ...user,
          postCount: userPostCount[user.id] || 0
        }));

        const sorted = usersWithPostCount.sort((a, b) => b.postCount - a.postCount);
        setTopUsers(sorted.slice(0, 5));
      } catch (err) {
        console.error('Error fetching top users:', err);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>🏆 Top Users</h2>
      {topUsers.map(user => (
        <div key={user.id} style={styles.card}>
          <img src={`https://i.pravatar.cc/100?u=${user.id}`} alt="avatar" style={styles.avatar} />
          <div>
            <h3>{user.name}</h3>
            <p>Posts: {user.postCount}</p>
            <p>Email: {user.email}</p>
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
    background: '#eef5ff',
  },
  avatar: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
  }
};

export default TopUsers;
