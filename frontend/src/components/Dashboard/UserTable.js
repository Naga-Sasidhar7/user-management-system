import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    role: '',
    status: ''
  });

  // Demo users data
  const demoUsers = [
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

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(demoUsers);
      setLoading(false);
    }, 500);
  }, []);

  // Handle edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      role: user.role,
      status: user.status
    });
  };

  // Save edit
  const handleSaveEdit = () => {
    if (!editingUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === editingUser.id 
        ? { ...user, ...editForm }
        : user
    );
    
    setUsers(updatedUsers);
    setEditingUser(null);
    toast.success('User updated successfully!');
  };

  // Handle delete
  const handleDelete = (userId) => {
    if (userId === '1') {
      toast.error('Cannot delete admin user!');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      toast.success('User deleted successfully!');
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>User Management</h2>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <span style={styles.userCount}>
            {filteredUsers.length} user(s) found
          </span>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noData}>
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} style={styles.tableRow}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.fullName}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    {editingUser?.id === user.id ? (
                      <select
                        value={editForm.role}
                        onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                        style={styles.select}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    ) : (
                      <span style={{
                        ...styles.badge,
                        ...(user.role === 'admin' ? styles.adminBadge : styles.userBadge)
                      }}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {editingUser?.id === user.id ? (
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                        style={styles.select}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    ) : (
                      <span style={{
                        ...styles.badge,
                        ...(user.status === 'active' ? styles.activeBadge : styles.inactiveBadge)
                      }}>
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      {editingUser?.id === user.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            style={styles.saveButton}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            style={styles.cancelButton}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            style={styles.editButton}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            style={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '20px',
    marginTop: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    margin: 0
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  searchInput: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '250px'
  },
  userCount: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '10px'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    background: '#f8f9fa'
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px'
  },
  tableRow: {
    borderBottom: '1px solid #e9ecef'
  },
  td: {
    padding: '12px 15px',
    fontSize: '14px',
    color: '#212529'
  },
  noData: {
    padding: '40px',
    textAlign: 'center',
    color: '#6c757d',
    fontSize: '16px'
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  adminBadge: {
    background: '#d1ecf1',
    color: '#0c5460'
  },
  userBadge: {
    background: '#d4edda',
    color: '#155724'
  },
  activeBadge: {
    background: '#d4edda',
    color: '#155724'
  },
  inactiveBadge: {
    background: '#f8d7da',
    color: '#721c24'
  },
  select: {
    padding: '4px 8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  editButton: {
    padding: '6px 12px',
    background: '#ffc107',
    color: '#212529',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  deleteButton: {
    padding: '6px 12px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  saveButton: {
    padding: '6px 12px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  cancelButton: {
    padding: '6px 12px',
    background: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: '500'
  }
};

// Add CSS animation for spinner
const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default UserTable;