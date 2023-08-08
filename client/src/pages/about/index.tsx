import { Grid, Typography, Box } from '@mui/material';
import youtubePic from '../../assets/youtubePic.png';
import Data from './content';
import StaticPagesHeader from '../../modules/StaticPages/StaticPagesHeader';
import StaticPagesNav from '../../modules/StaticPages/StaticPagesNav';

const About = () => {
  return (
    <div>
      <StaticPagesHeader />
      <StaticPagesNav title="About" />
      <Grid container columnSpacing={10}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            fontWeight: 800,
            fontSize: '16px',
            color: '#000',
          }}
        >
          <Typography paddingLeft={'20px'} component={'div'}>
            <Data />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign={'center'} sx={{ padding: 2 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px 0px',
            }}
          >
            <button
              style={{
                background: 'green',
                padding: '10px 15px',
                borderRadius: '8px',
                color: '#fff',
                fontSize: 22,
              }}
            >
              Watch on Facebook
            </button>
            <button
              style={{
                background: 'green',
                padding: '10px 15px',
                borderRadius: '8px',
                color: '#fff',
                fontSize: 22,
                marginLeft: 6,
              }}
            >
              Watch on Youtube
            </button>
          </div>
          <img style={{ width: '100%' }} src={youtubePic} alt="youtube pic" />
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
