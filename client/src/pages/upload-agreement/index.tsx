import { Typography, Grid, Box } from '@mui/material';
import youtubePic from '../../assets/youtubePic.png';
import Data from './content';

// import china from '../../assets/icons/china.png';
// import france from '../../assets/icons/france.png';
// import russia from '../../assets/icons/russia.png';
// import UK from '../../assets/icons/united-kingdom.png';
// import egypt from '../../assets/icons/egypt.png';
// import india from '../../assets/icons/india.png';
// import Translate from '../../common/translate/Translate';
import StaticPagesHeader from '../../modules/StaticPages/StaticPagesHeader';
import StaticPagesNav from '../../modules/StaticPages/StaticPagesNav';

const UploadAgreement = () => {
  return (
    <Box>
      <StaticPagesHeader />
      <StaticPagesNav title="Upload agreement" />
      {/* <Box display={'flex'} width={'100%'} justifyContent={'center'}>
        <Box padding={2}>
          <img
            src={china}
            alt="china"
            style={{ width: '40px', cursor: 'pointer' }}
          />
        </Box>
        <Box padding={2}>
          <img
            src={france}
            alt="france"
            style={{ width: '40px', cursor: 'pointer' }}
          />
        </Box>
        <Box padding={2}>
          <img
            src={russia}
            alt="russia"
            style={{ width: '40px', cursor: 'pointer' }}
          />
        </Box>
        <Box padding={2}>
          <img src={UK} alt="UK" style={{ width: '40px', cursor: 'pointer' }} />
        </Box>
        <Box padding={2}>
          <img
            src={egypt}
            alt="egypt"
            style={{ width: '40px', cursor: 'pointer' }}
          />
        </Box>
        <Box padding={2}>
          <img
            src={india}
            alt="india"
            style={{ width: '40px', cursor: 'pointer' }}
          />
        </Box>
      </Box> */}
      <Grid container columnSpacing={10}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ fontWeight: 500, fontSize: '16px', color: '#000', padding: 2 }}
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
    </Box>
  );
};

export default UploadAgreement;
