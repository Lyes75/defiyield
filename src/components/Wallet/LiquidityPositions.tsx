import React from 'react';
import { Card } from '../UI/Card';
import { useLiquidityPositions } from '../../hooks/useLiquidityPositions';
import { formatCurrency } from '../../utils/formatting';
import { Droplets } from 'lucide-react';

export function LiquidityPositions() {
  const { positions, isLoading } = useLiquidityPositions();

  if (isLoading) {
    return (
      <Card>
        <div className="flex items-center space-x-2">
          <Droplets className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="text-gray-400">Loading positions...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-200">Your Liquidity Positions</h2>
      {positions.length === 0 ? (
        <Card>
          <div className="text-center py-6">
            <Droplets className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400">No active liquidity positions found</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {positions.map((position) => (
            <Card key={position.id}>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-200">
                      {position.token0Symbol}/{position.token1Symbol}
                    </h3>
                    <p className="text-sm text-gray-400">{position.poolName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold gradient-text">
                      {formatCurrency(position.totalValue)}
                    </p>
                    <p className="text-sm text-gray-400">Total Value</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Token Amounts</p>
                    <p className="text-sm text-gray-200">
                      {position.token0Amount} {position.token0Symbol}
                    </p>
                    <p className="text-sm text-gray-200">
                      {position.token1Amount} {position.token1Symbol}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Fee Tier</p>
                    <p className="text-sm text-gray-200">{position.feeTier}%</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}