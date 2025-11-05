import { useEffect, useState } from 'react';
import { getDestinations } from '@/lib/codewords';

export default function ApiStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    async function checkApi() {
      try {
        await getDestinations({});
        setStatus('connected');
      } catch (error) {
        setStatus('error');
      }
    }
    checkApi();
  }, []);

  if (status === 'checking') return null;

  if (status === 'error') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <div className="text-yellow-600 mr-2">⚠️</div>
          <div>
            <h3 className="font-semibold text-yellow-800">API Access Issue</h3>
            <p className="text-sm text-yellow-700">
              Using demo data. Check your API key permissions for full functionality.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <div className="text-green-600 mr-2">✅</div>
        <div>
          <h3 className="font-semibold text-green-800">API Connected</h3>
          <p className="text-sm text-green-700">All systems operational</p>
        </div>
      </div>
    </div>
  );
}