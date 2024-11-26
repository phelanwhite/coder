import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center space-y-2">
      <div className="text-xl font-medium">404 - Not Found</div>
      <p>The page you're looking for doesn't exist.</p>
      <p>
        <Link to="/" className="text-blue-500">
          Go back to Homepage
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
