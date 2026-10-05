import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Araf. All rights reserved. Crafted with precision for the web.
        </p>
      </div>
    </footer>
  );
}
