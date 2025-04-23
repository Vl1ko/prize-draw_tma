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

import Duck from './duck1.gif';
import axios from 'axios';

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
      <Steps count={3} progress={1} />

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
              В наших розыгрышах участвуют только реальные пользователи, никаких ботов
            </Text>
          }
          header={
            <Title level="1" weight="3" style={{ color: '#FFFFFF' }}>
              Честные розыгрыши
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
          onClick={() => navigate('/hello/2')}
          id="NextButton"
          Component="a"
          mode="filled"
          size="l"
          target="_blank"
          stretched>
          Далее
        </Button>
      </FixedLayout>
    </AppRoot>
  );
}
