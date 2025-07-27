import React, { useState, useEffect } from 'react';

export const Footer: React.FC = () => {
  const [thisYear, setThisYear] = useState(0);

  useEffect(() => {
    setThisYear(new Date().getFullYear());
  }, []);

  return <footer className="footer">Copyright © {thisYear}</footer>;
};
