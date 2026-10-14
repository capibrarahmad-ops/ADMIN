import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { FilePlus, FileCheck, AlertCircle } from 'lucide-react';

export default function ContentFormModal({
  isOpen,
  onClose,
  onSubmit,
  contentToEdit = null
}) {
  const isEditing = Boolean(contentToEdit);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Guides',
    status: 'Published',
    author: 'Elena Rostova',
    slug: '',
    summary: '',
    tags: 'Workspaces, Slate'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contentToEdit) {
      setFormData({
        title: contentToEdit.title || '',
        category: contentToEdit.category || 'Guides',
        status: contentToEdit.status || 'Published',
        author: contentToEdit.author || 'Elena Rostova',
        slug: contentToEdit.slug || '',
        summary: contentToEdit.summary || '',
        tags: Array.isArray(contentToEdit.tags) ? contentToEdit.tags.join(', ') : 'Slate'
      });
      setErrors({});
    } else {
      setFormData({
        title: '',
        category: 'Guides',
        status: 'Draft',
        author: 'Elena Rostova',
        slug: '',
        summary: '',
        tags: 'Workspaces, Docs'
      });
      setErrors({});
    }
  }, [contentToEdit, isOpen]);

  // Auto slug generation from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const autoSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === '' || prev.slug === autoSlug.slice(0, -1) ? autoSlug : prev.slug
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Document title is required';
    } else if (formData.title.trim().length < 4) {
      newErrors.title = 'Title must be at least 4 characters long';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'URL slug is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit Slate Document: ${contentToEdit.title}` : 'Create New Slate Document'}
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Document Title <span style={{ color: 'var(--danger-solid)' }}>*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Master Guide to Real-Time Collaborative Canvas"
            value={formData.title}
            onChange={handleTitleChange}
          />
          {errors.title && (
            <div className="form-error-msg">
              <AlertCircle size={13} /> {errors.title}
            </div>
          )}
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              URL Slug <span style={{ color: 'var(--danger-solid)' }}>*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. master-guide-collaborative-canvas"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
            {errors.slug && (
              <div className="form-error-msg">
                <AlertCircle size={13} /> {errors.slug}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Guides">Guides</option>
              <option value="Security">Security</option>
              <option value="Product Updates">Product Updates</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Community">Community</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Elena Rostova"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Publication Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Published">Published (Public)</option>
              <option value="Draft">Draft (Internal)</option>
              <option value="Under Review">Under Review</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Summary / Abstract</label>
          <textarea
            className="form-textarea"
            placeholder="Brief overview summarizing the document content..."
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Tags <span className="form-label-hint">(comma-separated)</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Workspaces, Collaboration, Enterprise"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div className="modal-footer" style={{ marginInline: '-1.5rem', marginBottom: '-1.5rem', marginTop: '1.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? <FileCheck size={16} /> : <FilePlus size={16} />}
            <span>{isEditing ? 'Save Updates' : 'Publish Document'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
