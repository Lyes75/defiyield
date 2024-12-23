import React from 'react';

interface Props {
  title: string;
  subtitle: string;
}

export function PageTitle({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold gradient-text mb-4">
        {title}
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}