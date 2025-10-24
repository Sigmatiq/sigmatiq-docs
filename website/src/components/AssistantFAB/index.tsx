import React from 'react';
import styles from './styles.module.css';

export default function AssistantFAB() {
  const handleClick = () => {
    // Open getting started page
    window.location.href = '/docs/getting-started/intro';
  };

  return (
    <button
      className={styles.assistantFab}
      aria-label="Get Help"
      title="Get Help"
      onClick={handleClick}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4.5A4 4 0 0 1 4 15V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v8z"/>
      </svg>
    </button>
  );
}
