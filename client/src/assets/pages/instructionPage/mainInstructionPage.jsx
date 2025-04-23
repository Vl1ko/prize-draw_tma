import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { Link, useNavigate } from 'react-router-dom';

import { initBackButton } from '@telegram-apps/sdk';

import {
  AppRoot,
  Placeholder,
  List,
  Card,
  FixedLayout,
  Caption,
  Image,
  LargeTitle,
  Badge,
  Title,
  Text,
  Section,
} from '@telegram-apps/telegram-ui';

import Star from './star.svg';
import arrow_r from './arrow_r.svg';
import Apple from './apple.svg';
import pm from './PlayMarket.svg';
import creditCard from './CreditCard.svg';

export default function MainInstructionPage() {
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
      }}>
      <div className="carousel">
        <Placeholder
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            top: '0',
            left: '0',
            right: '0',
            bottom: `${window.innerHeight / 10}px`,
          }}
          header={
            <Title level="1" weight="3" style={{ color: '#FFFFFF' }}>
              Есть два способа для покупки Stars:
            </Title>
          }>
          <img
            style={{
              width: '160px',
            }}
            alt="Telegram sticker"
            src={Star}
          />
        </Placeholder>
      </div>
      <FixedLayout vertical="bottom" style={{ padding: '16px' }}>
        <List
          style={{
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0',
            padding: '0',
            height: '200px',
          }}>
          <Card
            onClick={() => navigate('/starinstruction/service/1')}
            style={{
              alignSelf: 'center',
              height: '100%',
              margin: '4px',
              flex: '1',
              backgroundColor: '#3395FF',
            }}>
            <Card.Cell
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#3395FF',
              }}>
              <Caption
                level="1"
                weight="3"
                style={{
                  color: '#FFFFFF',
                }}>
                С ТЕЛЕФОНА
              </Caption>
              <img
                src={arrow_r}
                alt="arrow_r"
                style={{ position: 'absolute', right: '24px', top: '22px', cursor: 'pointer' }}
              />
            </Card.Cell>
            <List key=".0" style={{}}>
              <Caption style={{ color: '#FFFFFF', margin: '0', padding: '0' }}>
                Доступно для тех, у кого работает Apple и Google Pay
              </Caption>
              <div style={{ display: 'flex' }}>
                <img src={Apple} style={{ marginTop: '8px' }} />
                <img src={pm} style={{ marginTop: '8px', marginLeft: '32px' }} />
              </div>
            </List>
          </Card>
          <Card
            onClick={() => navigate('/starinstruction/bot/1')}
            style={{
              alignSelf: 'center',
              margin: '4px',
              flex: '1',
              height: '100%',
              backgroundColor: '#3395FF',
            }}>
            <Card.Cell
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#3395FF',
              }}>
              <Caption
                level="1"
                weight="3"
                style={{
                  color: '#FFFFFF',
                }}>
                С КАРТЫ
              </Caption>
              <img
                src={arrow_r}
                alt="arrow_r"
                style={{ position: 'absolute', right: '24px', top: '22px', cursor: 'pointer' }}
              />
            </Card.Cell>
            <List key=".0" style={{}}>
              <Caption style={{ color: '#FFFFFF', margin: '0', padding: '0' }}>
                Доступно для всех
              </Caption>
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  justifyContent: 'center',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}>
                <img src={creditCard} style={{ magin: '0', marginTop: '16px', padding: 0 }} />
              </div>
            </List>
          </Card>
        </List>
      </FixedLayout>
    </AppRoot>
  );
}
