import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Flag
} from 'lucide-react';
import Badge from '../common/Badge';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import ReportDetailsModal from './ReportDetailsModal';
import ExportModal from './ExportModal';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function ReportTable() {
  const { reports, updateReportStatus } = useAdmin();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedReport, setSelectedReport] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchSearch =
        r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.reportedItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.reporter.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSeverity = severityFilter === 'ALL' || r.severity.toUpperCase() === severityFilter;
      const matchStatus = statusFilter === 'ALL' || r.status.toUpperCase() === statusFilter;

      return matchSearch && matchSeverity && matchStatus;
    });
  }, [reports, searchQuery, severityFilter, statusFilter]);

  // Paginated slice
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage, pageSize]);

  const handleQuickResolve = (id) => {
    updateReportStatus(id, 'Resolved');
    toast.success(`Report ${id} marked as Resolved.`);
  };

  const handleQuickDismiss = (id) => {
    updateReportStatus(id, 'Dismissed');
    toast.info(`Report ${id} dismissed.`);
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
              placeholder="Search reports by ID, topic, reporter..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Severity Filter */}
          <select
            className="select-filter"
            value={severityFilter}
            onChange={(e) => {
              setSeverityFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
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
            <option value="PENDING">Pending</option>
            <option value="UNDER REVIEW">Under Review</option>
            <option value="RESOLVED">Resolved</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowExportModal(true)}
        >
          <Download size={15} />
          <span>Export Audit Report</span>
        </button>
      </div>

      {/* Reports Table or Empty State */}
      {filteredReports.length === 0 ? (
        <EmptyState
          icon={Flag}
          title="No incident reports match your query"
          description="All flagged items in this filter bracket have been reviewed or resolved."
          action={
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearchQuery('');
                setSeverityFilter('ALL');
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
                  <th>Report ID & Subject</th>
                  <th>Flagged Target</th>
                  <th>Severity</th>
                  <th>Reporter</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedReports.map((r) => (
                  <tr key={r.id}>
                    <td style={{ maxWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--navy-600)' }}>
                          {r.id}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--navy-400)' }}>•</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--navy-500)', fontWeight: 500 }}>{r.category}</span>
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.88rem', lineHeight: 1.3 }}>
                        {r.subject}
                      </div>
                    </td>
                    <td style={{ color: 'var(--navy-700)', fontSize: '0.84rem' }}>
                      {r.reportedItem}
                    </td>
                    <td>
                      <Badge variant={r.severity}>{r.severity}</Badge>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--navy-800)', fontSize: '0.86rem' }}>
                        {r.reporter}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)' }}>
                        {r.reporterEmail}
                      </div>
                    </td>
                    <td style={{ color: 'var(--navy-500)', fontSize: '0.82rem' }}>
                      {r.date}
                    </td>
                    <td>
                      <Badge variant={r.status}>{r.status}</Badge>
                    </td>
                    <td>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        {/* View Details */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Inspect incident report"
                          onClick={() => setSelectedReport(r)}
                        >
                          <Eye size={15} />
                        </button>

                        {/* Quick Resolve */}
                        {r.status !== 'Resolved' && (
                          <button
                            type="button"
                            className="action-icon-btn"
                            title="Mark resolved"
                            onClick={() => handleQuickResolve(r.id)}
                          >
                            <CheckCircle size={15} style={{ color: 'var(--success-solid)' }} />
                          </button>
                        )}

                        {/* Quick Dismiss */}
                        {r.status !== 'Dismissed' && (
                          <button
                            type="button"
                            className="action-icon-btn"
                            title="Dismiss report"
                            onClick={() => handleQuickDismiss(r.id)}
                          >
                            <XCircle size={15} style={{ color: 'var(--navy-400)' }} />
                          </button>
                        )}
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
            totalItems={filteredReports.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {/* Report Details Modal */}
      <ReportDetailsModal
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
        onUpdateStatus={(id, status) => {
          updateReportStatus(id, status);
          toast.success(`Report status updated to ${status}.`);
        }}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        reportsCount={reports.length}
      />
    </div>
  );
}
