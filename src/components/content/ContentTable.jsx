import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Globe,
  FileText
} from 'lucide-react';
import Badge from '../common/Badge';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import ConfirmDialog from '../common/ConfirmDialog';
import ContentFormModal from './ContentFormModal';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function ContentTable() {
  const {
    content,
    addContent,
    updateContent,
    deleteContent
  } = useAdmin();

  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState(null);
  const [contentToDelete, setContentToDelete] = useState(null);

  // Filtered Content
  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || item.status.toUpperCase() === statusFilter;
      const matchCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [content, searchQuery, statusFilter, categoryFilter]);

  // Paginated Content
  const paginatedContent = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContent.slice(start, start + pageSize);
  }, [filteredContent, currentPage, pageSize]);

  const handleFormSubmit = (formData) => {
    if (contentToEdit) {
      updateContent(contentToEdit.id, formData);
      toast.success(`Document "${formData.title}" updated.`);
    } else {
      const newDoc = addContent(formData);
      toast.success(`New document "${newDoc.title}" created.`);
    }
  };

  const handleDeleteConfirm = () => {
    if (contentToDelete) {
      deleteContent(contentToDelete.id);
      toast.success(`Document "${contentToDelete.title}" deleted.`);
      setContentToDelete(null);
    }
  };

  const handleTogglePublish = (item) => {
    const nextStatus = item.status === 'Published' ? 'Draft' : 'Published';
    updateContent(item.id, { status: nextStatus });
    toast.info(`Document status set to ${nextStatus}.`);
  };

  return (
    <div className="card">
      {/* Controls Bar */}
      <div className="table-controls-bar">
        <div className="table-filters-group">
          {/* Search Field */}
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon-prefix" />
            <input
              type="text"
              className="search-input-field"
              placeholder="Search documents by title, author, slug..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

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
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="UNDER REVIEW">Under Review</option>
            <option value="SCHEDULED">Scheduled</option>
          </select>

          {/* Category Filter */}
          <select
            className="select-filter"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">All Categories</option>
            <option value="Guides">Guides</option>
            <option value="Security">Security</option>
            <option value="Product Updates">Product Updates</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Community">Community</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setContentToEdit(null);
            setIsFormOpen(true);
          }}
        >
          <Plus size={16} />
          <span>New Document</span>
        </button>
      </div>

      {/* Content Table or Empty State */}
      {filteredContent.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents found"
          description="Try broadening your search query or reset status and category filters."
          action={
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setCategoryFilter('ALL');
              }}
            >
              Clear Filters
            </button>
          }
        />
      ) : (
        <>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title & URL Slug</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Last Modified</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContent.map((item) => (
                  <tr key={item.id}>
                    <td style={{ maxWidth: '300px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem', lineHeight: 1.3 }}>
                        {item.title}
                      </div>
                      <div style={{ color: 'var(--navy-400)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                        /{item.slug}
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--navy-700)',
                          background: 'var(--navy-100)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px'
                        }}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td style={{ color: 'var(--navy-700)', fontWeight: 500 }}>
                      {item.author}
                    </td>
                    <td>
                      <Badge variant={item.status}>{item.status}</Badge>
                    </td>
                    <td style={{ color: 'var(--navy-600)', fontVariantNumeric: 'tabular-nums' }}>
                      {item.views.toLocaleString()}
                    </td>
                    <td style={{ color: 'var(--navy-500)', fontSize: '0.84rem' }}>
                      {item.updatedAt}
                    </td>
                    <td>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        {/* Toggle Publish Quick Action */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title={item.status === 'Published' ? 'Unpublish to draft' : 'Publish to live'}
                          onClick={() => handleTogglePublish(item)}
                        >
                          <Globe
                            size={15}
                            style={{
                              color: item.status === 'Published' ? 'var(--success-solid)' : 'var(--navy-400)'
                            }}
                          />
                        </button>

                        {/* Edit Content */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Edit document"
                          onClick={() => {
                            setContentToEdit(item);
                            setIsFormOpen(true);
                          }}
                        >
                          <Edit2 size={15} />
                        </button>

                        {/* Delete Content */}
                        <button
                          type="button"
                          className="action-icon-btn danger"
                          title="Delete document"
                          onClick={() => setContentToDelete(item)}
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
            totalItems={filteredContent.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {/* Add / Edit Content Form Modal */}
      <ContentFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setContentToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        contentToEdit={contentToEdit}
      />

      {/* Delete Content Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(contentToDelete)}
        onClose={() => setContentToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Slate Document"
        message={`Are you sure you want to delete "${contentToDelete?.title}"? This will remove the document and its published permalink.`}
        confirmText="Permanently Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
