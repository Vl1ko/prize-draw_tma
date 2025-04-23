import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { initInitData } from '@telegram-apps/sdk';

// import '@telegram-apps/telegram-ui/dist/styles.css';
// @ts-ignore
import MainPage from './assets/pages/mainPage/mainPage.jsx'; // @ts-ignore
import HelloPage1 from './assets/pages/helloPage/helloPage1.jsx'; // @ts-ignore
import HelloPage2 from './assets/pages/helloPage/helloPage2.jsx'; // @ts-ignore;
import HelloPage3 from './assets/pages/helloPage/helloPage3.jsx'; // @ts-ignore
import MyTicketsPage from './assets/pages/myTicketsPage/myTicketsPage.jsx'; // @ts-ignore
import MyFrendsPage from './assets/pages/myFrendsPage/myFrendsPage.jsx'; // @ts-ignore
import LoteryPage from './assets/pages/loteryPage/loteryPage.jsx'; // @ts-ignore
import MainInstructionPage from './assets/pages/InstructionPage/mainInstructionPage.jsx'; // @ts-ignore
import ServiceInstructionPage1 from './assets/pages/InstructionPage/serviceInstructionPage1.jsx'; // @ts-ignore
import ServiceInstructionPage2 from './assets/pages/InstructionPage/serviceInstructionPage2.jsx'; // @ts-ignore
import ServiceInstructionPage3 from './assets/pages/InstructionPage/serviceInstructionPage3.jsx'; // @ts-ignore
import BotInInstructionPage1 from './assets/pages/InstructionPage/BotInstructionPage1.jsx'; // @ts-ignore
import BotInInstructionPage2 from './assets/pages/InstructionPage/BotInstructionPage2.jsx'; // @ts-ignore
import BotInInstructionPage3 from './assets/pages/InstructionPage/BotInstructionPage3.jsx'; // @ts-ignore
import BotInInstructionPage4 from './assets/pages/InstructionPage/BotInstructionPage4.jsx'; // @ts-ignore
import BotInInstructionPage5 from './assets/pages/InstructionPage/BotInstructionPage5.jsx'; // @ts-ignore
import TicketsDistrub from './assets/pages/ticketsDistrub/ticketsDistrub.jsx';

import './index.css';

// console.log('InitData:', initData.user.id);

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<MainPage />} />
      <Route path="hello/1" element={<HelloPage1 />} />
      <Route path="hello/2" element={<HelloPage2 />} />
      <Route path="hello/3" element={<HelloPage3 />} />
      <Route path="mytickets" element={<MyTicketsPage />} />
      <Route path="myfrends" element={<MyFrendsPage />} />
      <Route path="lotery" element={<LoteryPage />} />
      <Route path="starinstruction" element={<MainInstructionPage />} />
      <Route path="starinstruction/service/1" element={<ServiceInstructionPage1 />} />
      <Route path="starinstruction/service/2" element={<ServiceInstructionPage2 />} />
      <Route path="starinstruction/service/3" element={<ServiceInstructionPage3 />} />
      <Route path="starinstruction/Bot/1" element={<BotInInstructionPage1 />} />
      <Route path="starinstruction/Bot/2" element={<BotInInstructionPage2 />} />
      <Route path="starinstruction/Bot/3" element={<BotInInstructionPage3 />} />
      <Route path="starinstruction/Bot/4" element={<BotInInstructionPage4 />} />
      <Route path="starinstruction/Bot/5" element={<BotInInstructionPage5 />} />
      <Route path="ticketsdistrub" element={<TicketsDistrub />} />
    </Routes>
  </BrowserRouter>,
);
