import React from "react";

const NotFoundPage = () => {
  return (
    <div className="text-center space-y-2">
      <div className="text-xl font-medium">404 - Not Found</div>
      <p>The page you're looking for doesn't exist.</p>
      <p>
        <a href="/" className="text-blue-500">
          Go back to Homepage
        </a>
      </p>
    </div>
  );
};

export default NotFoundPage;
