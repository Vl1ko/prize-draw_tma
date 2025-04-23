import '@telegram-apps/telegram-ui/dist/styles.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// @ts-ignore
import MainPage from './assets/pages/mainPage/mainPage';
// @ts-ignore
import MainPageC from './assets/pages/mainPage/mainPagecopy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="two" element={<MainPageC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// export default function App() {
//   return (
//     <AppRoot>
//       <IconButton mode="bezeled" size="s"></IconButton>
//     </AppRoot>
//   );
// }
