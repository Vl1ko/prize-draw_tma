import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { Link, useNavigate } from 'react-router-dom';
import { parseThemeParams } from '@telegram-apps/sdk';

import { initBackButton } from '@telegram-apps/sdk';

import {
  AppRoot,
  Placeholder,
  Button,
  Steps,
  FixedLayout,
  Title,
  Text,
} from '@telegram-apps/telegram-ui';

import Duck from './star.svg';

export default function ServiceInstructionPage1() {
  const navigate = useNavigate();
  // Устанавливаем основные события прикосновения
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  let xDown = null,
    yDown = null;

  // Фиксируем изначальные координаты прикосновения
  function handleTouchStart(evt) {
    const { clientX, clientY } = evt.touches[0];
    xDown = clientX;
    yDown = clientY;
  }

  // Отслеживаем движение пальца и определяем направление свайпа
  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return; // Если изначальные координаты не зафиксированы, прекращаем выполнение
    }

    const { clientX, clientY } = evt.touches[0];

    const xDiff = xDown - clientX;
    const yDiff = yDown - clientY;

    // Вычисляем, был ли свайп выполнен по горизонтали или вертикали
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      xDiff > 0 ? navigate('/starinstruction/service/2') : 'Свайп вправо';
    } else {
      console.log(yDiff > 0 ? 'Свайп вверх' : 'Свайп вниз');
    }

    // Обнуляем координаты после распознавания свайпа
    xDown = yDown = null;
  }
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
      <Steps style={{ color: '#FFFFFF' }} count={3} progress={1} />

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
              На странице конкурса нажмите кнопку Купить билет и подтвердите покупку
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
      <FixedLayout vertical="bottom" style={{ padding: '16px' }}>
        <Button
          style={{ color: '#007AFF' }}
          onClick={() => navigate('/starinstruction/service/2')}
          id="NextButton"
          Component="a"
          mode="white"
          size="l"
          target="_blank"
          stretched>
          Далее
        </Button>
      </FixedLayout>
    </AppRoot>
  );
}
