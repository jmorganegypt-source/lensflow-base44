import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Download, Trash2, RotateCw } from 'lucide-react';
import CustomerForm from '../components/CustomerForm';
import CustomerCard from '../components/CustomerCard';

export default function SalesRepPortal() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [syncing, setSyncing] = useState(null);
  const [hubspotConnected, setHubspotConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const init = async () => {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setAuthChecking(false);
      if (currentUser) {
        fetchCustomers();
      }
    };
    init();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    const data = await base44.entities.Customer.list('-created_date');
    setCustomers(data);
    setLoading(false);
  };

  const handleCustomerCreated = () => {
    setShowForm(false);
    fetchCustomers();
  };

  const handleDelete = async (customerId) => {
    await base44.entities.Customer.delete(customerId);
    fetchCustomers();
  };

  const handleConnectHubspot = async () => {
    const url = await base44.connectors.connectAppUser('6a158d724efc9633889457e2');
    const popup = window.open(url, '_blank');
    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
        setHubspotConnected(true);
      }
    }, 500);
  };

  const handleDisconnectHubspot = async () => {
    await base44.connectors.disconnectAppUser('6a158d724efc9633889457e2');
    setHubspotConnected(false);
  };

  const handleSyncToCRM = async (customer) => {
    setSyncing(customer.id);
    try {
      await base44.functions.invoke('syncToCRMAppUser', { customerId: customer.id });
      fetchCustomers();
    } catch (error) {
      console.error('Sync failed:', error);
    }
    setSyncing(null);
  };

  return (
    <div className="min-h-screen p-6" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#0a0e1a' }}>Customer Cards</h1>
          <div className="flex gap-3">
            {user && !hubspotConnected && (
              <button
                onClick={handleConnectHubspot}
                className="px-6 py-3 rounded-lg font-semibold text-white"
                style={{ background: '#3b82f6' }}
              >
                🔵 Connect HubSpot
              </button>
            )}
            {user && hubspotConnected && (
              <button
                onClick={handleDisconnectHubspot}
                className="px-6 py-3 rounded-lg font-semibold text-white"
                style={{ background: '#ef4444' }}
              >
                ✓ HubSpot Connected
              </button>
            )}
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white"
              style={{ background: '#C99A2E' }}
            >
              <Plus className="w-5 h-5" /> New Customer
            </button>
          </div>
        </div>

        {authChecking ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto"></div>
        </div>
      ) : !user ? (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-500 mb-4">Please log in to access the Sales Rep Portal.</p>
          <button
            onClick={() => base44.auth.redirectToLogin()}
            className="px-6 py-3 rounded-lg font-semibold text-white"
            style={{ background: '#C99A2E' }}
          >
            Log In
          </button>
        </div>
      ) : showForm ? (
        <div className="mb-8">
          <CustomerForm onSuccess={handleCustomerCreated} />
        </div>
      ) : loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">No customers yet. Create one to get started.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onDelete={() => handleDelete(customer.id)}
                onSync={() => handleSyncToCRM(customer)}
                syncing={syncing === customer.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}