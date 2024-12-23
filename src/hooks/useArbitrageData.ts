import { useState, useEffect } from 'react';
import { ArbitrageOpportunity } from '../types';
import { mockOpportunities } from '../mocks/opportunities';

export function useArbitrageData() {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>(mockOpportunities);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      // In production, this would be an API call
      setTimeout(() => {
        setOpportunities(mockOpportunities);
        setLastUpdate(new Date());
        setIsLoading(false);
      }, 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    opportunities,
    isLoading,
    lastUpdate,
  };
}