function StatusBadge({ status }) {
  const cls = {
    "WAITING": "status-waiting",
    "PAYMENT PENDING": "status-pending",
    "PAID": "status-paid",
    "DENIED": "status-denied",
    "AVAILABLE": "status-available",
    "RENTED": "status-rented"
  }[status] || "";

  return <span className={`status ${cls}`}>{status}</span>;
}

export default StatusBadge;