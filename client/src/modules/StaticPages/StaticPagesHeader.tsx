import React, { useRef, useState } from 'react';
import { HyperLink, NavPages } from '../navbar/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Translate from '../../common/translate/Translate';

const StaticPagesHeader = () => {
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down('sm'));
  const [openPolicies, setOpenPolicies] = useState<boolean>(false);
  const refPolicies = useRef<HTMLUListElement>(null);
  return (
    <div style={{ padding: 12 }}>
      <Link to="/" style={{ fontWeight: 600, fontSize: 24, color: '#000' }}>
        Home
      </Link>
      <NavPages container columnGap={2} shrink={media ? 'true' : 'false'}>
        <Grid item>
          <HyperLink>
            <Link to={'/knowledge-base'}>
              <Translate> Knowledge Base</Translate>
            </Link>
          </HyperLink>
        </Grid>
        <Grid item>
          <HyperLink>
            <Link to={'/about'}>
              <Translate> About </Translate>
            </Link>
          </HyperLink>
        </Grid>
        <Grid item>
          <HyperLink>
            <Link to={'/support'}>
              <Translate> Support </Translate>
            </Link>
          </HyperLink>
        </Grid>
        <Grid item>
          <HyperLink>
            <Link to={'/contact'}>
              <Translate> Contact </Translate>
            </Link>
          </HyperLink>
        </Grid>
        <Grid item>
          <HyperLink onClick={() => setOpenPolicies(!openPolicies)}>
            <Translate> Our policies </Translate>
          </HyperLink>
          {openPolicies && (
            <nav
              style={{
                width: '260px',
                background: 'white',
                borderRadius: 5,
                position: 'absolute',
                zIndex: 1,
              }}
            >
              <List ref={refPolicies}>
                <Link to={'/policies/terms-of-services'}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="Terms of Services" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={'/policies/privacy-policy'}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="Privacy policy" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={'/policies/cancellation-policy'}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="Cancellation policy" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={'/policies/upload-agreement'}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="Upload agreement" />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </nav>
          )}
        </Grid>
      </NavPages>
    </div>
  );
};

export default StaticPagesHeader;
