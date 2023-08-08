import { Typography } from '@mui/material';
import React from 'react';
import Translate from '../../common/translate/Translate';

const StaticPagesNav = ({ title }: { title: string }) => {
  const langs = [
    'عربي',
    'English',
    'Français',
    'Español',
    'Italiano',
    '中国人',
    'Pусский',
    'हिंदी',
  ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'green',
        flexDirection: 'column',
        padding: '10px 0px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
          columnGap: 12,
          color: '#fff',
        }}
      >
        {langs.map((lang, idx) => (
          <div key={idx}>{lang}</div>
        ))}
      </div>
      <Typography
        fontFamily={'Parisienne'}
        textAlign={'center'}
        color={'white'}
        fontSize={'48px'}
        fontWeight={400}
      >
        <Translate>{title}</Translate>
      </Typography>
    </div>
  );
};

export default StaticPagesNav;
