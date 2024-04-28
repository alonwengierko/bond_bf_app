import React, { useState } from 'react';

interface Props {
    onSubmit: (isin: string) => void;
  }

function BondForm({ onSubmit }: Props) {
  const [isin, setIsin] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(isin);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ISIN:
        <input
          type="text"
          value={isin}
          onChange={(e) => setIsin(e.target.value)}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default BondForm;