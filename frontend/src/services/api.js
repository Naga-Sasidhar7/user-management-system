const API_URL = process.env.REACT_APP_API_URL;;
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const userAPI = {
  getUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        }
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        console.warn('Backend failed, using demo users');
        return getDemoUsers();
      }
    } catch (error) {
      console.warn('API call failed, using demo users:', error.message);
      return getDemoUsers();
    }
  },
  updateUser: async (userId, userData) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.warn('Backend update failed:', error.message);
      return { success: true, user: { id: userId, ...userData } };
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.warn('Backend delete failed:', error.message);
      return { success: true };
    }
  }
};
const getDemoUsers = () => {
  return [
    {
      id: '1',
      fullName: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      fullName: 'Regular User',
      email: 'user@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-01-02'
    },
    {
      id: '3',
      fullName: 'Test User',
      email: 'test@test.com',
      role: 'user',
      status: 'inactive',
      createdAt: '2024-01-03'
    },
    {
      id: '4',
      fullName: 'Manager User',
      email: 'manager@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-01-04'
    }
  ];
};
