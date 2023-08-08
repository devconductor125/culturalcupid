import {
  Avatar,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
} from '@mui/material';
import { NavbarContainer, HyperLink, NavPages } from './styles';
import Burger from '../../assets/icons/burger.svg';
import chatIncon from '../../assets/icons/chatIcon.svg';
import messageIcon from '../../assets/icons/messageIcon.svg';
import React, { useEffect, useRef, useState, useContext } from 'react';
import wallet from '../../assets/icons/wallet.svg';
import packages from '../../assets/icons/packages.svg';
import profileSettings from '../../assets/icons/profileSettings.svg';
import Ads from '../../assets/icons/Ads.svg';
import savedAds from '../../assets/icons/savedAds.svg';
import logout from '../../assets/icons/logout.svg';
import { AuthContext } from '../../context/Auth';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import MessageModal from '../messageModal';
import MyProfileModal from './MyProfileModal';
import Translate from '../../common/translate/Translate';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down('sm'));
  const refPolicies = useRef<HTMLUListElement>(null);
  const refMessage = useRef<HTMLUListElement>(null);
  const refAvatar = useRef<HTMLUListElement>(null);

  const [mobileView, setMobileView] = useState<boolean>(false);
  const [openPolicies, setOpenPolicies] = useState<boolean>(false);
  const [openMessages, setOpenMessage] = useState<boolean>(false);
  const [openAvatar, setOpenAvatar] = useState<boolean>(false);

  const handleView = () => {
    setMobileView(!mobileView);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        openPolicies &&
        refPolicies.current &&
        !refPolicies.current.contains(e.target as Node)
      ) {
        setOpenPolicies(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [openPolicies]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        openMessages &&
        refMessage.current &&
        !refMessage.current.contains(e.target as Node)
      ) {
        setOpenMessage(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [openMessages]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        openAvatar &&
        refAvatar.current &&
        !refAvatar.current.contains(e.target as Node)
      ) {
        setOpenAvatar(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [openAvatar]);

  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState<any>(null);
  const [profileModal, setProfileModal] = useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      axiosInstance.get(`/message/${authContext?.user?.id}`).then((res) => {
        setMessages(res.data);
      });
    })();
  }, [authContext?.user?.id]);

  const filteredMessages = messages?.filter(
    (message: any) => message?.receiverId === authContext?.user?.id
  );

  const latestMessagesFromEachSender: any = {};

  filteredMessages.forEach((msg: any) => {
    if (
      !latestMessagesFromEachSender[msg.senderId] ||
      latestMessagesFromEachSender[msg.senderId].createdAt < msg.createdAt
    ) {
      latestMessagesFromEachSender[msg.senderId] = msg;
    }
  });

  const latestMessages = Object.values(latestMessagesFromEachSender);

  return (
    <NavbarContainer>
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

      <NavPages
        container
        columnGap={2}
        justifyContent={'end'}
        color={'white'}
        shrink={media ? 'true' : 'false'}
      >
        {!localStorage.getItem('token') && (
          <Grid>
            <Typography component={'div'}>
              <HyperLink>
                <Link to={'/login'}>
                  <Translate> Sign In </Translate>
                </Link>
              </HyperLink>
            </Typography>
          </Grid>
        )}
        {localStorage.getItem('token') && (
          <>
            <Grid item textAlign={'center'}>
              <img src={chatIncon} alt="chatIcon" />
              <Typography
                component={'div'}
                sx={{ color: 'green', fontWeight: 'bold' }}
              >
                <Translate> Chat </Translate>
              </Typography>
            </Grid>
            <Grid item textAlign={'center'}>
              <img src={messageIcon} alt="messageIcon" />
              <Typography
                component={'div'}
                sx={{ color: 'green', fontWeight: 'bold' }}
              >
                <Translate> Inbox </Translate>
              </Typography>
            </Grid>
            <Grid item textAlign={'center'}>
              <img
                src={messageIcon}
                alt="messageIcon"
                onClick={() => setOpenMessage(!openMessages)}
              />
              <Typography
                component={'div'}
                sx={{ color: 'green', fontWeight: 'bold' }}
              >
                <Translate> Messages </Translate>
              </Typography>
              {openMessages && (
                <List
                  ref={refMessage}
                  sx={{
                    background: 'white',
                    color: 'black',
                    position: 'absolute',
                    right: '65px',
                    zIndex: 1,
                  }}
                >
                  {latestMessages?.map((msg: any, idx) => {
                    return (
                      <ListItem
                        key={idx}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setReceiver(msg?.sender)}
                      >
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                          primary={msg?.user?.username}
                          secondary={msg?.content}
                        />
                        <Box marginLeft={'45px'} marginBottom={'25px'}>
                          <span>5m</span>
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Grid>
            <Grid item>
              <Typography
                component={'div'}
                onClick={() => setOpenAvatar(!openAvatar)}
              >
                <Avatar />
                {openAvatar && (
                  <List
                    ref={refAvatar}
                    sx={{
                      background: 'white',
                      color: 'black',
                      position: 'absolute',
                      right: '20px',
                    }}
                  >
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <Avatar />
                        </IconButton>
                      }
                    >
                      <ListItemButton onClick={() => setProfileModal(true)}>
                        <ListItemText
                          primary={authContext?.user?.username || 'guest'}
                        />
                      </ListItemButton>
                    </ListItem>
                    {authContext?.user?.isAdmin && (
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/admin')}>
                          <ListItemIcon>
                            <img src={profileSettings} />
                          </ListItemIcon>
                          <ListItemText
                            primary={<Translate> Admin Panel </Translate>}
                          />
                        </ListItemButton>
                      </ListItem>
                    )}
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => navigate('/wallet')}>
                        <ListItemIcon>
                          <img src={wallet} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Translate> Wallet </Translate>}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton onClick={() => navigate('/plan')}>
                        <ListItemIcon>
                          <img src={packages} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Translate> My packages </Translate>}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => navigate('/profile')}>
                        <ListItemIcon>
                          <img src={profileSettings} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Translate> My Profile Settings </Translate>}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => navigate('/my-ads')}>
                        <ListItemIcon>
                          <img src={Ads} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Translate> My Ads </Translate>}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <img src={savedAds} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Translate> My Saved Ads </Translate>}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Link to={'/'}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                          <ListItemIcon>
                            <img src={logout} />
                          </ListItemIcon>
                          <ListItemText
                            primary={<Translate> Log Out </Translate>}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  </List>
                )}
              </Typography>
            </Grid>
            <MyProfileModal
              open={profileModal}
              onClose={() => setProfileModal(false)}
            />
          </>
        )}
      </NavPages>
      {media && (
        <Box onClick={handleView}>
          <IconButton>
            <img src={Burger} alt="burgerIcon" />
          </IconButton>
        </Box>
      )}
      {media && mobileView && <MobileNavBar />}
      {receiver && (
        <MessageModal
          open={receiver}
          onClose={() => setReceiver(null)}
          receiver={receiver}
        />
      )}
    </NavbarContainer>
  );
};

const MobileNavBar = () => {
  return (
    <nav
      style={{
        width: '260px',
        background: 'white',
        borderRadius: 5,
        position: 'absolute',
        top: '20%',
        zIndex: 1,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to={'/knowledge-base'}>
              <ListItemText primary="Knowledge base" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to={'/about'}>
              <ListItemText primary="About" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to={'/Support'}>
              <ListItemText primary="support" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to={'/contact'}>
              <ListItemText primary="Contact" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to={'/policies/terms-of-services'}>
              <ListItemText primary="Terms of Services" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to={'/policies/privacy-policy'}>
              <ListItemText primary="Privacy policy" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to={'/policies/cancellation-policy'}>
              <ListItemText primary="Cancellation policy" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to={'/policies/upload-agreement'}>
              <ListItemText primary="Upload agreement" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};

export default Navbar;
