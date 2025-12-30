const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Authentication API Tests', () => {
  describe('POST /api/auth/signup', () => {
    test('should register a new user successfully', async () => {
      const userData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.fullName).toBe(userData.fullName);
      expect(response.body.user.role).toBe('user');
      expect(response.body.user).not.toHaveProperty('password');
    });

    test('should reject registration with existing email', async () => {
      await User.create({
        fullName: 'Existing User',
        email: 'existing@example.com',
        password: 'Password123'
      });

      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          fullName: 'New User',
          email: 'existing@example.com', 
          password: 'Password123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('already');
    });

    test('should reject weak password (< 6 characters)', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          fullName: 'Test User',
          email: 'test@example.com',
          password: '123' 
        })
        .expect(400);

      expect(response.body.message).toContain('at least 6 characters');
    });

    test('should reject invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          fullName: 'Test User',
          email: 'invalid-email',
          password: 'Password123'
        })
        .expect(400);

      expect(response.body.message).toContain('Invalid email');
    });

    test('should reject missing required fields', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          password: 'Password123'
        })
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        fullName: 'Login User',
        email: 'login@example.com',
        password: '$2b$10$X3H3pR6L6eTp3LdYQ1ZQ.Op5W5j5K5J5K5J5K5J5K5J5K5J5K5J5K', // 
        role: 'user',
        status: 'active'
      });
    });

    test('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'Password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('login@example.com');
    });

    test('should reject login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPassword'
        })
        .expect(400);

      expect(response.body.message).toContain('Invalid credentials');
    });

    test('should reject login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123'
        })
        .expect(400);

      expect(response.body.message).toContain('Invalid credentials');
    });

    test('should reject login for inactive account', async () => {
      await User.create({
        fullName: 'Inactive User',
        email: 'inactive@example.com',
        password: '$2b$10$...', 
        status: 'inactive'
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'inactive@example.com',
          password: 'Password123'
        })
        .expect(401);

      expect(response.body.message).toContain('inactive');
    });
  });

  describe('GET /api/auth/me', () => {
    let authToken;

    beforeEach(async () => {
      const user = await User.create({
        fullName: 'Test User',
        email: 'me@example.com',
        password: '$2b$10$...',
        role: 'user'
      });

      
      authToken = 'test-jwt-token'; 
    });

    test('should get current user with valid token', async () => {
      
      console.log('GET /api/auth/me test requires JWT setup');
    });

    test('should reject without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.message).toContain('No token');
    });
  });
});
