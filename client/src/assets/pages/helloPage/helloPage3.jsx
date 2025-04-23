import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { Link, useNavigate } from 'react-router-dom';

import {
  AppRoot,
  Placeholder,
  Button,
  Steps,
  FixedLayout,
  Title,
  Text,
} from '@telegram-apps/telegram-ui';

import Duck from './duck3.gif';

export default function HelloPage() {
  const navigate = useNavigate();
  const tg = window.Telegram.WebApp;
  tg.setBackgroundColor('#0F0F0F');

  return (
    <AppRoot
      style={{
        background: '#0F0F0F',
        height: window.innerHeight,
        width: window.innerWidth,
        padding: '32px',
      }}>
      <Steps count={3} progress={3} />

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
          }}
          description={
            <Text weight="3" style={{ color: '#AAAAAA' }}>
              Наслаждайтесь участием, зная, что каждое участие справедливо и защищено{' '}
            </Text>
          }
          header={
            <Title level="1" weight="3" style={{ color: '#FFFFFF' }}>
              Безопасность и доверие
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
      <FixedLayout vertical="bottom" style={{ padding: '32px' }}>
        <Button
          onClick={() => navigate('/')}
          id="NextButton"
          Component="a"
          mode="filled"
          target="_blank"
          size="l"
          stretched>
          Далее
        </Button>
      </FixedLayout>
    </AppRoot>
  );
}
