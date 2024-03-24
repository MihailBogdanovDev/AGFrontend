// pages/_error.tsx

'use client';

import React from 'react';

function Error({ statusCode, message }: { statusCode?: number; message?: string }) {
    return (
      <p>
        {message ||
          (statusCode
            ? `An error ${statusCode} occurred on the server`
            : 'An error occurred on the client')}
      </p>
    );
  }

Error.getInitialProps = ({ res, err }: { res?: any; err?: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
