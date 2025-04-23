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
  Card,
  Subheadline,
  Cell,
  Image,
} from '@telegram-apps/telegram-ui';

import Duck from './star.svg';
import PremiumBot from './PremiumBot.svg';

import { initBackButton } from '@telegram-apps/sdk';

export default function BotInstructionPage1() {
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
      <Steps style={{ color: 'black' }} count={5} progress={1} />

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
              Перейдите в Premium Bot
            </Text>
          }
          header={
            <Title level="1" weight="3" style={{ color: '#FFFFFF' }}>
              Шаг 1
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
        <Cell
          style={{
            alignSelf: 'center',
            margin: 'auto',
            flex: '1',
            height: '80px',
            backgroundColor: '#3395FF',
            width: window.innerWidth - 32,
            borderRadius: '16px',
          }}
          after={
            // <Button
            //   href="https://t.me/PremiumBot"
            //   style={{
            //     background: '#3A99FF',
            //     сolor: '#FFFFFF',
            //   }}
            //   id="NextButton"
            //   Component="a"
            //   mode="filled"
            //   target="_blank"
            //   size="s">
            //   <Subheadline
            //     level="2"
            //     weight="2"
            //     style={{
            //       сolor: '#FFFFFF',
            //     }}>
            //     Перейти
            //   </Subheadline>
            // </Button>
            <Button
              onClick={() => (window.location.href = 'https://t.me/PremiumBot')}
              style={{
                color: '#FFFFFF',
              }}
              mode="gray"
              size="s">
              Перейти
            </Button>
          }
          before={<Image src={PremiumBot} />}>
          <Text style={{ color: '#FFFFFF' }} weight="3">
            Premium Bot
          </Text>
        </Cell>
        <div style={{ padding: '16px' }}>
          <Button
            style={{ color: '#007AFF' }}
            onClick={() => navigate('/starinstruction/bot/2')}
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
