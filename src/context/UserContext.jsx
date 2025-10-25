import React, { createContext, useContext, useState, useCallback } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2023-10-24T10:30:00Z'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Inactive',
      lastActive: '2023-10-23T15:45:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current users for pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handler for adding a new user
  const addUser = useCallback((newUser) => {
    setUsers(prevUsers => [...prevUsers, { ...newUser, id: Date.now() }]);
    setIsAddUserModalOpen(false);
  }, []);

  // Handler for updating a user
  const updateUser = useCallback((updatedUser) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setIsEditUserModalOpen(false);
    setCurrentUser(null);
  }, []);

  // Handler for deleting a user
  const deleteUser = useCallback((userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  }, []);

  // Handler for opening edit modal
  const openEditModal = useCallback((user) => {
    setCurrentUser(user);
    setIsEditUserModalOpen(true);
  }, []);

  const value = {
    users: currentUsers,
    totalUsers: filteredUsers.length,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    isAddUserModalOpen,
    setIsAddUserModalOpen,
    isEditUserModalOpen,
    setIsEditUserModalOpen,
    currentUser,
    addUser,
    updateUser,
    deleteUser,
    openEditModal
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
