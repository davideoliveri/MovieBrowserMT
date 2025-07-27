import React, { useState, useEffect } from 'react';

export const Footer: React.FC = () => {
  const [thisYear, setThisYear] = useState(0);

  useEffect(() => {
    setThisYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="footer__copyright">Copyright © {thisYear}</div>
    </footer>
  );
};
