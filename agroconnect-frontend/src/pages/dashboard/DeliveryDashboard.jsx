import React, { useEffect, useState } from 'react';

function DeliveryDashboard() {
  const [view, setView] = useState('stats');
  const [stats, setStats] = useState({});
  const [commission, setCommission] = useState(5);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulated fetch – replace with real API calls
    setStats({
      totalUsers: 1240,
      totalOrders: 352,
      totalEarnings: 87230,
      activeFarmers: 120,
      activeConsumers: 900,
    });

    setTransactions([
      { id: 1, user: 'Farmer A', amount: 4500, date: '2024-05-01' },
      { id: 2, user: 'Farmer B', amount: 3000, date: '2024-05-03' },
    ]);
  }, []);

  const handleCommissionChange = (e) => {
    setCommission(e.target.value);
  };

  const updateCommission = () => {
    // Implement backend update
    alert(`Commission updated to ${commission}%`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setView('stats')} className="btn">Stats</button>
        <button onClick={() => setView('transactions')} className="btn">Transactions</button>
        <button onClick={() => setView('commission')} className="btn">Set Commission</button>
      </div>

      {view === 'stats' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 border rounded shadow">Total Users: {stats.totalUsers}</div>
          <div className="p-4 border rounded shadow">Total Orders: {stats.totalOrders}</div>
          <div className="p-4 border rounded shadow">Total Earnings: ₹{stats.totalEarnings}</div>
          <div className="p-4 border rounded shadow">Active Farmers: {stats.activeFarmers}</div>
          <div className="p-4 border rounded shadow">Active Consumers: {stats.activeConsumers}</div>
        </div>
      )}

      {view === 'transactions' && (
        <div className="border rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th>ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b">
                  <td>{tx.id}</td>
                  <td>{tx.user}</td>
                  <td>₹{tx.amount}</td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'commission' && (
        <div className="border rounded shadow p-4 max-w-md">
          <h3 className="text-lg font-semibold mb-2">Update Platform Commission</h3>
          <input
            type="number"
            value={commission}
            onChange={handleCommissionChange}
            className="border p-2 rounded w-full mb-3"
            min="0"
            max="100"
          />
          <button onClick={updateCommission} className="btn bg-green-600 text-white">Save</button>
        </div>
      )}
    </div>
  );
}

export default DeliveryDashboard;
