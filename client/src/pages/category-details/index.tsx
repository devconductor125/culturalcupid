import { Grid } from '@mui/material';
import { useState } from 'react';
import StyledCard, { CardProps } from '../../modules/card';
import { GridCard } from '../home/styles';
import { useQuery } from '@tanstack/react-query';
import { getPostCategories } from '../../api/category';
import { useParams } from 'react-router-dom';
import SimpleBackdrop from '../../common/backdrop';
import ChatModal from '../../modules/chatModal';
import ShareModal from '../../modules/shareModal';
import MessageModal from '../../modules/messageModal';
import StyledButton from '../../common/button';
import Translate from '../../common/translate/Translate';
import Header from '../../modules/header';
import Navbar from '../../modules/navbar';
import FindPost from '../../modules/posts/findPost';

const CategoryDetails = () => {
  const [chatModal, setChatModal] = useState<boolean>(false);
  const [shareModal, setShareModal] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const [searcgPostModal, setSearchPostModal] = useState<boolean>(false);
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ['category', id],
    () => getPostCategories(id || ''),
    {
      select: (data) => data.data.Post as CardProps[],
    }
  );

  return (
    <>
      <div style={{ position: 'relative', marginBottom: '45%' }}>
        <Header />
        <Navbar />
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            left: 100,
            zIndex: 999,
          }}
        >
          <StyledButton
            label={<Translate>SEARCH ADS</Translate>}
            onClick={() => setSearchPostModal(true)}
          />
        </div>
        <video
          src="/home.mp4"
          muted
          autoPlay
          loop
          style={{ width: '98.5vw', position: 'absolute', top: 0 }}
        />
      </div>
      <Grid container sx={{ padding: 5 }}>
        {data &&
          data.map((val: CardProps, idx: number) => (
            <GridCard item key={idx} xs={12} sm={12} md={3}>
              <StyledCard
                data={val}
                setChatModal={() => setChatModal(true)}
                setMessageModal={() => setMessageModal(true)}
                setShareModal={() => setShareModal(true)}
              />
            </GridCard>
          ))}
        <ChatModal open={chatModal} onClose={() => setChatModal(false)} />
        <ShareModal open={shareModal} onClose={() => setShareModal(false)} />
        {/* <MessageModal
        open={messageModal}
        onClose={() => setMessageModal(false)}
        /> */}
        <FindPost
          open={searcgPostModal}
          onClose={() => setSearchPostModal(false)}
        />
        <SimpleBackdrop open={isLoading} />
      </Grid>
    </>
  );
};

export default CategoryDetails;
