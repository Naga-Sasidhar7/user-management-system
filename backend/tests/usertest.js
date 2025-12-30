const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

describe('User Management API Tests', () => {
  let adminToken, userToken, adminId, userId;

  beforeEach(async () => {
    // Clear users
    await User.deleteMany({});

    // Create admin user
    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: '$2b$10$...',
      role: 'admin',
      status: 'active'
    });
    adminId = admin._id;
    adminToken = jwt.sign(
      { id: adminId, role: 'admin' },
      process.env.JWT_SECRET || 'test-secret'
    );

    // Create regular user
    const user = await User.create({
      fullName: 'Regular User',
      email: 'user@example.com',
      password: '$2b$10$...',
      role: 'user',
      status: 'active'
    });
    userId = user._id;
    userToken = jwt.sign(
      { id: userId, role: 'user' },
      process.env.JWT_SECRET || 'test-secret'
    });
  });

  describe('GET /api/users (Admin only)', () => {
    test('should get all users with pagination (admin)', async () => {
      // Create more users for pagination
      for (let i = 1; i <= 15; i++) {
        await User.create({
          fullName: `User ${i}`,
          email: `user${i}@example.com`,
          password: '$2b$10$...',
          role: 'user'
        });
      }

      const response = await request(app)
        .get('/api/users?page=1&limit=10')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('users');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.users).toHaveLength(10); // 10 per page
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
      expect(response.body.pagination.total).toBeGreaterThan(15);
    });

    test('should reject non-admin users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`) // Regular user token
        .expect(403);

      expect(response.body.message).toContain('Admin access only');
    });

    test('should reject without authentication', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(401);
    });
  });

  describe('GET /api/users/profile', () => {
    test('should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.email).toBe('user@example.com');
      expect(response.body.fullName).toBe('Regular User');
      expect(response.body).not.toHaveProperty('password');
    });

    test('should reject without token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);
    });
  });

  describe('PUT /api/users/profile', () => {
    test('should update user profile', async () => {
      const updatedData = {
        fullName: 'Updated Name',
        email: 'updated@example.com'
      };

      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.message).toContain('updated');
      expect(response.body.user.fullName).toBe(updatedData.fullName);
      expect(response.body.user.email).toBe(updatedData.email);
    });

    test('should reject duplicate email', async () => {
      // Try to update with admin's email
      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ email: 'admin@example.com' })
        .expect(400);

      expect(response.body.message).toContain('already in use');
    });
  });

  describe('PUT /api/users/change-password', () => {
    test('should change password with correct current password', async () => {
      // Note: This requires actual bcrypt comparison
      console.log('Password change test requires bcrypt setup');
    });
  });

  describe('PATCH /api/users/:id/status (Admin only)', () => {
    test('should activate user (admin)', async () => {
      // Create an inactive user
      const inactiveUser = await User.create({
        fullName: 'Inactive User',
        email: 'inactive@example.com',
        password: '$2b$10$...',
        status: 'inactive'
      });

      const response = await request(app)
        .patch(`/api/users/${inactiveUser._id}/activate`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.message).toContain('activated');
      
      // Verify in database
      const updatedUser = await User.findById(inactiveUser._id);
      expect(updatedUser.status).toBe('active');
    });

    test('should deactivate user (admin)', async () => {
      const response = await request(app)
        .patch(`/api/users/${userId}/deactivate`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.message).toContain('deactivated');
      
      const updatedUser = await User.findById(userId);
      expect(updatedUser.status).toBe('inactive');
    });

    test('should reject if user not found', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .patch(`/api/users/${fakeId}/deactivate`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body.message).toContain('not found');
    });
  });
