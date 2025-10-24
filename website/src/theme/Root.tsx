import React from 'react';
import AssistantFAB from '@site/src/components/AssistantFAB';

export default function Root({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
      <AssistantFAB />
    </>
  );
}
