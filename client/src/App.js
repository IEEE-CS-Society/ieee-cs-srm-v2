import './App.css';
import BrandingCard from '../src/components/cards/components/BrandingCard';
import WebDevelopmentCard from '../src/components/cards/components/WebDevCard';
import DigitalMarketingCard from '../src/components/cards/components/DigitalMarketingCard';
import MobileAppCard from '../src/components/cards/components/MobileAppCard';
import SeoCard from '../src/components/cards/components/SeoCard';
import UserTestingCard from '../src/components/cards/components/UserTestingCard';
import Testimonials from '../src/components/cards/components/Testimonials';
import SignupPage from '../src/components/Login/SignupPage';
import LoginPage from '../src/components/Login/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route
                        path="*"
                        element={
                            <div className="container mx-auto p-4">
                                <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                                <p className="text-xl">Please sign up or log in to get started.</p>
                            </div>
                        }
                    />
                </Routes>
            </Router>

            <div className="bg-custom-black text-white py-16 px-8 min-h-screen">
                <div className="container mx-auto max-w-screen-xl">
                    <h2
                        className="text-4xl mb-8 text-center"
                        style={{fontFamily: 'Roboto', fontSize: '40px', fontWeight: 'bold', color: '#FFFFFF'}}
                    >
                        We Offer
                    </h2>
                    <p
                        className="text-center mb-12"
                        style={{fontFamily: 'Roboto', fontSize: '16px', color: '#9E9E9E'}}
                    >
                        Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta
                        feugiat
                        <br/> scelerisque in elit. Morbi rhoncus, tellus, eros consequat magna
                        semper orci a
                        <br/> tincidunt.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <BrandingCard/>
                        <WebDevelopmentCard/>
                        <DigitalMarketingCard/>
                        <MobileAppCard/>
                        <SeoCard/>
                        <UserTestingCard/>
                    </div>
                </div>
            </div>

            <Testimonials/>
        </div>
    );
}

export default App;
