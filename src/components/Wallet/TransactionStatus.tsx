import React from 'react';
import { Card } from '../UI/Card';
import { useTransactionStatus } from '../../hooks/useTransactionStatus';
import { CheckCircle2, XCircle, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Button';

interface Props {
  showViewAll?: boolean;
}

export function TransactionStatus({ showViewAll = false }: Props) {
  const { transactions } = useTransactionStatus();
  const recentTransactions = transactions.slice(0, 3);

  if (transactions.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-200">Recent Transactions</h2>
        {showViewAll && transactions.length > 3 && (
          <Link to="/transactions">
            <Button variant="secondary" rightIcon={ArrowRight}>
              View All
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {recentTransactions.map((tx) => (
          <Card key={tx.hash} className="hover:bg-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {tx.status === 'confirmed' && (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                )}
                {tx.status === 'failed' && (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                {tx.status === 'pending' && (
                  <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                )}
                <div>
                  <p className="text-gray-200">{tx.description}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <a
                href={`https://etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}