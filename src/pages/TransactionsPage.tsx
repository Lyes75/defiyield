import React from 'react';
import { useTransactionStatus } from '../hooks/useTransactionStatus';
import { Card } from '../components/UI/Card';
import { PageTitle } from '../components/Layout/PageTitle';
import { CheckCircle2, XCircle, Clock, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';

export function TransactionsPage() {
  const { transactions } = useTransactionStatus();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="secondary" leftIcon={ArrowLeft}>
            Back to Home
          </Button>
        </Link>
      </div>

      <PageTitle
        title="Transaction History"
        subtitle="View and track all your cross-chain arbitrage transactions"
      />

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-200 mb-2">
                No transactions yet
              </h3>
              <p className="text-gray-400">
                Your transaction history will appear here once you start trading
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <Card key={tx.hash} className="hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {tx.status === 'confirmed' && (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    )}
                    {tx.status === 'failed' && (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    {tx.status === 'pending' && (
                      <Clock className="w-6 h-6 text-yellow-400 animate-spin" />
                    )}
                    <div>
                      <p className="text-lg font-medium text-gray-200">
                        {tx.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-gray-400">
                          {new Date(tx.timestamp).toLocaleString()}
                        </p>
                        <p className={`text-sm ${
                          tx.status === 'confirmed' ? 'text-green-400' :
                          tx.status === 'failed' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 p-2 rounded-full hover:bg-blue-400/10 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}