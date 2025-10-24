import React from 'react';
import Logo from '@theme-original/Navbar/Logo';
import type LogoType from '@theme/Navbar/Logo';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof LogoType>;

export default function LogoWrapper(props: Props): JSX.Element {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <Logo {...props} />
      <span style={{
        fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: '20px',
        fontWeight: 700,
        letterSpacing: '1px',
        lineHeight: 1,
        display: 'flex',
      }}>
        <span style={{color: 'var(--sigmatiq-teal)'}}>SIGMA</span>
        <span style={{color: 'var(--sigmatiq-golden)'}}>TIQ</span>
      </span>
    </div>
  );
}
