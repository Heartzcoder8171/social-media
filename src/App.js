import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Feed from './components/Feed';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link}>Feed</NavLink>
        <NavLink to="/top-users" style={styles.link}>Top Users</NavLink>
        <NavLink to="/trending-posts" style={styles.link}>Trending Posts</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending-posts" element={<TrendingPosts />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    padding: '10px',
    backgroundColor: '#222',
    marginBottom: '20px',
  },
  link: {
    marginRight: '15px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default App;
