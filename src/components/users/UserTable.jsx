import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Power,
  Users as UsersIcon
} from 'lucide-react';
import Badge from '../common/Badge';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import ConfirmDialog from '../common/ConfirmDialog';
import UserFormModal from './UserFormModal';
import UserDetailsModal from './UserDetailsModal';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function UserTable() {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus
  } = useAdmin();

  const toast = useToast();

  // Search, Filter & Pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToView, setUserToView] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // Filtered & Searched data
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchRole = roleFilter === 'ALL' || u.role.toUpperCase() === roleFilter;
      const matchStatus = statusFilter === 'ALL' || u.status.toUpperCase() === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Paginated Slice
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Handle Form Submission (Add or Edit)
  const handleFormSubmit = (formData) => {
    if (userToEdit) {
      updateUser(userToEdit.id, formData);
      toast.success(`User "${formData.name}" updated successfully!`);
    } else {
      const newUser = addUser(formData);
      toast.success(`User "${newUser.name}" provisioned successfully!`);
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      toast.success(`Account for "${userToDelete.name}" deleted.`);
      setUserToDelete(null);
    }
  };

  // Handle Status Toggle
  const handleToggle = (id) => {
    const user = users.find((u) => u.id === id);
    toggleUserStatus(id);
    const newStatus = user?.status === 'Active' ? 'Inactive' : 'Active';
    toast.info(`User status updated to ${newStatus}.`);
  };

  return (
    <div className="card">
      {/* Controls Bar: Search, Filters & Action Button */}
      <div className="table-controls-bar">
        <div className="table-filters-group">
          {/* Search Field */}
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon-prefix" />
            <input
              type="text"
              className="search-input-field"
              placeholder="Search by name, email, or dept..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Role Filter */}
          <select
            className="select-filter"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="CONTRIBUTOR">Contributor</option>
            <option value="MODERATOR">Moderator</option>
            <option value="MEMBER">Member</option>
          </select>

          {/* Status Filter */}
          <select
            className="select-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setUserToEdit(null);
            setIsFormOpen(true);
          }}
        >
          <Plus size={16} />
          <span>Provision User</span>
        </button>
      </div>

      {/* Table Data or Empty State */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          icon={UsersIcon}
          title="No users match your criteria"
          description="Try clearing your search query or setting the role and status filters to 'All'."
          action={
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearchQuery('');
                setRoleFilter('ALL');
                setStatusFilter('ALL');
              }}
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Department</th>
                  <th>Registered</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="user-avatar"
                        />
                        <div className="user-cell-meta">
                          <span className="user-cell-name">{user.name}</span>
                          <span className="user-cell-email">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant={user.role}>{user.role}</Badge>
                    </td>
                    <td>
                      <Badge variant={user.status}>{user.status}</Badge>
                    </td>
                    <td style={{ color: 'var(--navy-600)' }}>
                      {user.department || 'General'}
                    </td>
                    <td style={{ color: 'var(--navy-500)', fontSize: '0.84rem' }}>
                      {user.registrationDate}
                    </td>
                    <td>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        {/* View Details */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="View user details"
                          onClick={() => setUserToView(user)}
                        >
                          <Eye size={15} />
                        </button>

                        {/* Edit User */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Edit user"
                          onClick={() => {
                            setUserToEdit(user);
                            setIsFormOpen(true);
                          }}
                        >
                          <Edit2 size={15} />
                        </button>

                        {/* Toggle Status */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title={user.status === 'Active' ? 'Deactivate account' : 'Activate account'}
                          onClick={() => handleToggle(user.id)}
                        >
                          <Power
                            size={15}
                            style={{
                              color: user.status === 'Active' ? 'var(--warning-solid)' : 'var(--success-solid)'
                            }}
                          />
                        </button>

                        {/* Delete User */}
                        <button
                          type="button"
                          className="action-icon-btn danger"
                          title="Delete user"
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {/* Add / Edit Form Modal */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setUserToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        userToEdit={userToEdit}
      />

      {/* View User Details Modal */}
      <UserDetailsModal
        isOpen={Boolean(userToView)}
        onClose={() => setUserToView(null)}
        user={userToView}
        onToggleStatus={handleToggle}
        onEdit={(user) => {
          setUserToView(null);
          setUserToEdit(user);
          setIsFormOpen(true);
        }}
      />

      {/* Delete User Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete User Account"
        message={`Are you sure you want to delete ${userToDelete?.name} (${userToDelete?.email})? All associated session tokens and permissions will be permanently revoked.`}
        confirmText="Permanently Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
