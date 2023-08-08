import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './modules/header';
import Home from './pages/home/index';
import Footer from './modules/footer';
import { Routes, Route, Outlet } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './modules/navbar';
import 'pure-react-carousel/dist/react-carousel.es.css';
import About from './pages/about';
import TermsOfServices from './pages/terms-of-services';
import PrivacyPolicy from './pages/privacy-policy';
import CancellationPolicy from './pages/cancellation-policy';
import UploadAgreement from './pages/upload-agreement';
import KnowledgeBase from './pages/knowledge-base';
import Support from './pages/support';
import Contact from './pages/contact';
import Login from './modules/login';
import Register from './modules/register';
import { AuthProvider } from './context/Auth';
import Categories from './modules/categories';
import Stripe from './pages/Stripe';
import Wallet from './pages/wallet';
import Charge from './pages/charge';
import Plan from './pages/plans';
import CategoryDetails from './pages/category-details';
import AdminHome from './pages/admin/pages/Home';
import WebContent from './pages/admin/pages/WebContent';
import MyAds from './pages/myAds/MyAds';
import Profile from './pages/profile/Profile';
import Storage from './pages/admin/pages/Storage';
import SMTP from './pages/admin/pages/SMTP';
import { useEffect, useState } from 'react';
import { getStaticContent } from './api/content';
import Payments from './pages/admin/pages/Payments';
import Keys from './pages/admin/pages/Keys';
import Analytics from './pages/admin/pages/Analytics';
import Uploads from './pages/admin/pages/Uploads';
import Theme from './pages/admin/pages/Theme';
import axios from 'axios';
import Plans from './pages/admin/pages/Plans';
import ManageCategores from './pages/admin/pages/ManageCategores';
import AdminIndex from './pages/admin/pages/AdminIndex';
import Trash from './pages/admin/pages/Trash';
import Ads from './pages/admin/pages/Ads';
import './App.css';

const URL = import.meta.env.VITE_LOCAL_DOAMIN;


console.log("Helelelelelele", import.meta.env.VITE_LOCAL_DOAMIN)

function App() {
  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      background: {
        default: '#343537',
      },
    },
    typography: {
      fontFamily: ['Heebo', 'sans-serif', 'Parisienne', 'cursive'].join(','),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          a {
            text-decoration: none;
            :hover {
              color: #FF6063;
              cursor: pointer;
            }
          }
          .carousel {
            position: relative;
          }
        `,
      },
    },
  });
  const [content, setContent] = useState<any>({});
  const [gaId, setGaId] = useState(null);

  useEffect(() => {
    (async () => {
      const c = await getStaticContent();
      setContent(c);
    })();
  }, []);

  useEffect(() => {
    axios
      .get(URL + '/analytics')
      .then((response) => setGaId(response.data.googleAnalyticCode))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (content?.favicon) {
      const link: HTMLLinkElement =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = content?.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    if (content?.siteName && content?.siteSlogan) {
      document.title = `${content?.siteName} - ${content?.siteSlogan}`;
    }
    // if (content?.background) {
    //   document.body.style.backgroundColor = content?.background;
    // }
  }, [content]);

  useEffect(() => {
    if (gaId) {
      const scriptContent = `
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document,'script', 'dataLayer', '${gaId}');
    `;

      const scriptElement = document.createElement('script');
      scriptElement.innerText = scriptContent;
      document.body.appendChild(scriptElement);
    }
  }, [gaId]);

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang) {
      return;
    } else {
      localStorage.setItem('lang', 'en');
    }
  }, []);

  const BasicLayout = () => {
    return (
      <>
        {!content?.maintainence ? (
          <>
            {' '}
            <Header />
            <Navbar />
            <Categories />
            <Outlet />
            <Footer content={content} />
          </>
        ) : (
          <>
            <div
              style={{
                color: '#fff',
                fontSize: '30px',
                fontWeight: 'bold',
                textAlign: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Sorry, We're under maintainence!
            </div>
          </>
        )}
      </>
    );
  };

  const PagesLayout = () => {
    return (
      <>
        <Outlet />;
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={<Home content={content} />} />
            <Route path={'/category/:id'} element={<CategoryDetails />} />

            <Route path="/" element={<BasicLayout />}>
              <Route path="stripe" element={<Stripe />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="charge" element={<Charge />} />
              <Route path="plan" element={<Plan />} />
              <Route path="my-ads" element={<MyAds />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/" element={<PagesLayout />}>
              <Route path="policies">
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-of-services" element={<TermsOfServices />} />
                <Route
                  path="cancellation-policy"
                  element={<CancellationPolicy />}
                />

                <Route path="upload-agreement" element={<UploadAgreement />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="knowledge-base" element={<KnowledgeBase />} />
              <Route path="support" element={<Support />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="/" element={<BasicLayout />}>
              <Route path="about" element={<About />} />
              <Route path="stripe" element={<Stripe />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="charge" element={<Charge />} />
              <Route path="plan" element={<Plan />} />
              <Route path="my-ads" element={<MyAds />} />
              <Route path="profile" element={<Profile />} />

              <Route path="support" element={<Support />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            {/* Admin  */}
            <Route path={'/admin'} element={<AdminIndex />} />
            <Route path={'/admin/home'} element={<AdminHome />} />
            <Route path={'/admin/web-content'} element={<WebContent />} />
            <Route path={'/admin/storage'} element={<Storage />} />
            <Route path={'/admin/smtp'} element={<SMTP />} />
            <Route path={'/admin/payments'} element={<Payments />} />
            <Route path={'/admin/keys'} element={<Keys />} />
            <Route path={'/admin/analytics'} element={<Analytics />} />
            <Route path={'/admin/uploads'} element={<Uploads />} />
            <Route path={'/admin/theme'} element={<Theme />} />
            <Route path={'/admin/plans'} element={<Plans />} />
            <Route path={'/admin/categories'} element={<ManageCategores />} />
            <Route path={'/admin/trash'} element={<Trash />} />
            <Route path={'/admin/ads'} element={<Ads />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
