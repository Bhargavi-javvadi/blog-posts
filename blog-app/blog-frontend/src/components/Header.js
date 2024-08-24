import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">ZuAI</div>
      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="join-now">Join Now</button>
      </div>
    </div>
  );
};

export default Header;
