import { Grid, useMediaQuery, useTheme } from '@mui/material';
import {
  HeaderSection,
  HeaderTitle,
  HeaderTitle2,
  LanguageSiteBox,
  LogoHeader,
  SelectLanguage,
} from './styles';
import worldwide from '../../assets/icons/worldwide.svg';
import { useNavigate } from 'react-router-dom';
import { getStaticContent } from '../../api/content';
import { useEffect, useState } from 'react';
import Translate from '../../common/translate/Translate';
import { languages_list } from '../../common/languages';

const Header = () => {
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down('sm'));
  const naviagte = useNavigate();
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    (async () => {
      const c = await getStaticContent();
      setContent(c);
    })();
  }, []);

  return (
    <HeaderSection>
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={4}>
          <LogoHeader onClick={() => naviagte('/')}>
            <img
              src={content?.logo}
              alt="site logo"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </LogoHeader>
        </Grid>
        <Grid item xs={4}>
          <HeaderTitle>
            <Translate>Welcome to</Translate>
          </HeaderTitle>
          <HeaderTitle2>{content?.siteName}</HeaderTitle2>
        </Grid>
        <LanguageSiteBox item xs={4}>
          <img src={worldwide} alt="worldwide" />
          {!media && (
            <SelectLanguage
              title="Site Languages"
              defaultValue={localStorage.getItem('lang') as string}
              onChange={(e) => {
                localStorage.setItem('lang', e.target.value);
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            >
              <option value={''}>Site Languages</option>
              {/* <option value={"ar"}>Arabic</option>
              <option value={"en"}>English</option> */}
              {languages_list?.map((lang, idx) => {
                return (
                  <option value={lang.code} key={idx}>
                    {lang.name}
                  </option>
                );
              })}
            </SelectLanguage>
          )}
        </LanguageSiteBox>
      </Grid>
    </HeaderSection>
  );
};
export default Header;
