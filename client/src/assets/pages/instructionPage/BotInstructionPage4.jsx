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

export default function BotInstructionPage4() {
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
      <Steps style={{ color: 'black' }} count={5} progress={4} />

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
              Оплатите нужное количество Stars
            </Text>
          }
          header={
            <Title level="1" weight="3" style={{ color: '#FFFFFF' }}>
              Шаг 4
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
            onClick={() => navigate('/starinstruction/bot/5')}
            id="NextButton"
            Component="a"
            mode="white"
            size="l"
            target="_blank"
            stretched>
            Далее
          </Button>
        </div>
      </FixedLayout>
    </AppRoot>
  );
}
