import axios from 'axios';

const url = 'http://localhost:5000/api/auth/register';
const payload = {
  name: 'Test User Local 3',
  email: 'test.user.local3@example.com',
  password: 'Password123!',
  role: 'candidate'
};

(async () => {
  try {
    const res = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
    console.log('Status:', res.status);
    console.log('Body:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Body:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    process.exit(1);
  }
})();
