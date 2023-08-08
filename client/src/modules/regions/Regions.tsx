import React from 'react';
import Africa from '../../assets/regions/AFR.png';
import All from '../../assets/regions/ALL.png';
import Asia from '../../assets/regions/ASIA.png';
import Australia from '../../assets/regions/AUS.png';
import Europe from '../../assets/regions/EUR.png';
import NorthAmerica from '../../assets/regions/NA.png';
import SouthAmerica from '../../assets/regions/SA.png';
import { Grid } from '@mui/material';

const Regions = () => {
  const regions = [
    {
      title: 'Worldwide',
      img: All,
    },
    {
      title: 'Asia',
      img: Asia,
    },
    {
      title: 'Africa',
      img: Africa,
    },
    {
      title: 'Australia',
      img: Australia,
    },
    {
      title: 'Europe',
      img: Europe,
    },
    {
      title: 'North America',
      img: NorthAmerica,
    },
    {
      title: 'South America',
      img: SouthAmerica,
    },
  ];
  return (
    <Grid
      container
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={2}
      flexDirection={'column'}
    >
      <h1
        style={{
          fontWeight: 'bold',
          color: 'green',
          fontSize: 48,
          fontFamily: 'Yeseva One',
        }}
      >
        Regions
      </h1>
      <Grid
        container
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
      >
        {regions?.map((region, idx) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={1.6}
              lg={1.6}
              key={idx}
              sx={{
                textAlign: 'center',
                fontSize: 22,
                color: 'green',
                fontWeight: 'bold',
              }}
            >
              <div
                style={{
                  background: 'green',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  height: 165,
                  width: 165,
                }}
              >
                <img
                  src={region.img}
                  alt=""
                  style={{ width: 150, height: 140 }}
                />
              </div>
              <span>{region.title}</span>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Regions;
