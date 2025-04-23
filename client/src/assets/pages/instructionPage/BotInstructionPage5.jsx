import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { Link, useNavigate } from 'react-router-dom';

import { initBackButton } from '@telegram-apps/sdk';

import {
  AppRoot,
  Placeholder,
  Button,
  Steps,
  FixedLayout,
  Title,
  Text,
  Card,
  Subheadline,
  Cell,
  Image,
} from '@telegram-apps/telegram-ui';

import Duck from './star.svg';
import PremiumBot from './PremiumBot.svg';

export default function BotInstructionPage5() {
  const navigate = useNavigate();

  const tg = window.Telegram.WebApp;
  tg.setBottomBarColor('#007AFF');
  tg.setHeaderColor('#007AFF');
  tg.setBackgroundColor('#007AFF');

  const [backButton] = initBackButton();
  backButton.show();
  backButton.on('click', () => {
    navigate('/');
  });

  return (
    <AppRoot
      style={{
        background: '#007AFF',
        height: window.innerHeight,
        width: window.innerWidth,
        padding: '16px',
        overflow: 'hidden',
      }}>
      <Steps style={{ color: 'black' }} count={5} progress={5} />

      <div className="carousel">
        <Placeholder
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: '32px',
            color: '#FFFFF',
          }}
          description={
            <Text style={{ color: '#FFFFFF' }} weight="3">
              Stars будут зачислены на ваш баланс, вы можете вернуться в приложение и принять
              участие в розыгрыше
            </Text>
          }
          header={
            <Title level="1" weight="3" style={{ color: '#FFFFFF' }}>
              Шаг 5
            </Title>
          }>
          <img
            style={{
              width: '160px',
            }}
            alt="Telegram sticker"
            src={Duck}
          />
        </Placeholder>
      </div>
      <FixedLayout vertical="bottom">
        <div style={{ padding: '16px' }}>
          <Button
            style={{ color: '#007AFF' }}
            onClick={() => navigate('/')}
            id="NextButton"
            Component="a"
            mode="white"
            size="l"
            target="_blank"
            stretched>
            Понятно
          </Button>
        </div>
      </FixedLayout>
    </AppRoot>
  );
}
