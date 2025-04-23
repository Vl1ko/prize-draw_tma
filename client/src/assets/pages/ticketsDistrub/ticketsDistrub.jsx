import '@telegram-apps/telegram-ui/dist/styles.css';

import { Fragment } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { initBackButton } from '@telegram-apps/sdk';
import { initInitData } from '@telegram-apps/sdk';
import {
  Placeholder,
  AppRoot,
  Accordion,
  Image,
  List,
  Slider,
  FixedLayout,
  Card,
  Caption,
  LargeTitle,
  Title,
  AvatarStack,
  Badge,
  Text,
  Banner,
  Button,
  Cell,
} from '@telegram-apps/telegram-ui';

import Star from './star.svg';
import Tickets from './tickets.svg';
import TicketsTitle from './ticketsTitle.svg';
import Iphone from './iphone.svg';

import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { useEffect, useState } from 'react';
import RenderFromTemplateContext from 'next/dist/client/components/render-from-template-context';

export default function TicketsDistrub() {
  const URL = import.meta.env.VITE_SERVER_URL;

  const tg = window.Telegram.WebApp;
  tg.setBottomBarColor('#0F0F0F');
  tg.setHeaderColor('#0F0F0F');
  tg.setBackgroundColor('#0F0F0F');

  const [posts, setPosts] = useState([]);
  const [tickets, setTicketsPosts] = useState([]);
  const [loteryResult, setLoteryResult] = useState([]);
  const [winDatePosts, setWinDate] = useState([]);

  const navigate = useNavigate();
  const initData = initInitData();
  const [backButton] = initBackButton();
  let fixedButton;
  let loteryState = '';

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function dayTitle(number) {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'дней';
    var last_num = number % 10;
    if (last_num == 1) return 'день';
    if ([2, 3, 4].includes(last_num)) return 'дня';
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'дней';
  }

  backButton.show();
  backButton.on('click', () => {
    navigate('/myfrends');
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${URL}api/v1/tickets?userID=er`);

      const loteryResult = await axios(
        `${URL}api/v1/tickets?userID=${initData?.user?.id}&lotteryID=1`,
      );

      const hTickets = await axios(`${URL}api/v1/tickets/getReferal?userID=${initData?.user?.id}`);

      const winDate = await axios(`${URL}api/v1/lotterys?id=1`);
      const dayLeft = Math.round(
        (new Date(winDate.data[0].endTime).getTime() - new Date()) / (24 * 3600 * 1000),
      );

      // setIsPlayerPosts(isPlayer.data.isPlayer);
      setTicketsPosts(hTickets.data);
      setPosts(result.data.length);
      setLoteryResult(loteryResult.data.length);
      // setWinDate(dayLeft);

      console.log(loteryResult.data.length);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    fetchData();
  }, []);

  console.log('Posts:', posts);

  function ticketTitle(number) {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'билетов';
    var last_num = number % 10;
    if (last_num == 1) return 'билет';
    if ([2, 3, 4].includes(last_num)) return 'билета';
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'билетов';
  }

  function showLotery(state) {
    if (state == 'expanded') {
      loteryState = '';
    } else {
      loteryState = 'expanded';
    }
  }

  if (Number(tickets) > 0) {
    return (
      <AppRoot
        style={{
          background: '#0F0F0F',
          width: window.innerWidth,
          height: window.innerHeight,
        }}>
        <List
          style={{
            borderRadius: '16px 16px 0 0',
            background: '#0F0F0F',
            paddingTop: '6px',
            paddingLeft: '4px',
            paddingRight: '4px',
            height: '100%',
          }}>
          <List
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              margin: '0 auto',
            }}>
            <Card
              style={{
                alignSelf: 'center',
                margin: '4px',
                flex: '1',
                height: '110px',
                backgroundColor: '#212121',
              }}>
              <Card.Cell
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#212121',
                }}>
                <Caption
                  level="1"
                  weight="3"
                  style={{
                    color: '#AAAAAA',
                  }}>
                  БИЛЕТЫ
                </Caption>
              </Card.Cell>

              <List
                key=".0"
                style={{
                  position: 'relative',
                }}>
                <img
                  alt="Tickets"
                  src={Tickets}
                  style={{
                    // display: 'block',
                    // objectFit: 'cover',
                    // margin: '-10px 115px ',
                    // cursor: 'pointer',
                    // position: 'absolute',
                    // right: '0px',
                    //  om: '-10px',
                    position: 'absolute',
                    top: '-40px',
                    right: '-10px',
                    transform: 'scale(0.8) rotate(-5deg)',
                  }}
                />
                <LargeTitle
                  weight="2"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    marginLeft: '20px',
                    color: '#FFFFFF',
                  }}>
                  {tickets} шт
                </LargeTitle>
              </List>
            </Card>

            <Card
              style={{
                alignSelf: 'center',
                margin: '4px',
                flex: '1',
                height: '110px',
                backgroundColor: '#212121',
              }}>
              <Card.Cell
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#212121',
                }}>
                <Caption
                  level="1"
                  weight="3"
                  style={{
                    color: '#AAAAAA',
                  }}>
                  РОЗЫГРЫШИ
                </Caption>
              </Card.Cell>

              <List
                key=".0"
                style={{
                  position: 'relative',
                }}>
                <LargeTitle
                  weight="2"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    marginLeft: '20px',
                    color: '#FFFFFF',
                  }}>
                  {1}
                </LargeTitle>
              </List>
            </Card>
          </List>
          <List
            style={{
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
              width: '100%',
              margin: '0 auto',
            }}>
            <Accordion expanded>
              <Accordion.Summary
                // onClick={() => {
                //   showLotery(loteryState);
                //   console.log(loteryState);
                // }}
                style={{
                  borderRadius: '16px 16px 0 0',
                  backgroundColor: '#212121',
                  margin: 0,
                }}>
                <CardCell
                  style={{
                    margin: 0,
                    padding: '0',
                    textAlign: 'left',
                    backgroundColor: '#212121',
                    color: '#FFFFFF',
                  }}
                  before={<Image size={40} src={Iphone} />}
                  subhead={
                    <Caption style={{ color: '#AAAAAA' }}>
                      Розыгрыш через {winDatePosts} {dayTitle(winDatePosts)}
                    </Caption>
                  }>
                  iPhone 15 pro Max{' '}
                  {
                    <Badge mode="secondary" type="number">
                      <div>{loteryResult} 🎟️</div>
                    </Badge>
                  }
                </CardCell>
              </Accordion.Summary>
              <Accordion.Content
                style={{ backgroundColor: '#212121', borderRadius: '0 0 16px 16px' }}>
                <Slider
                  id="slider"
                  onChange={function noRefCheck() {
                    setPosts(arguments[0]);
                  }}
                  step={1}
                  min={0}
                  max={Number(tickets)}
                  after={<Text style={{ color: '#FFFFFF' }}>{posts}</Text>}
                />
              </Accordion.Content>
            </Accordion>
          </List>
        </List>
        {/* <>{fixedButton}</> */}
        {
          <FixedLayout
            vertical="bottom"
            style={{
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingBottom: '16px',
              opacity: `${Number(posts) + 0.5}`,
            }}>
            <Button
              before={<img src={Star} />}
              onClick={() => {
                for (let i = 0; i <= Number(posts); i++) {
                  if (i != Number(posts)) {
                    axios.post(`${URL}api/v1/tickets`, {
                      ticketId: `${getRandomInt(1000, 9999)}-${getRandomInt(
                        1000,
                        9999,
                      )}-${getRandomInt(1000, 9999)}`,
                      lotteryId: 1,
                      userId: `${initData?.user?.id}`,
                      ticketFrom: 'user',
                    });
                  } else
                    setTimeout(() => {
                      location.reload();
                    }, 2000);

                  console.log('ticket');
                }
              }}
              id="NextButton"
              Component="a"
              mode="filled"
              size="l"
              target="_blank"
              stretched>
              Распределить билеты
            </Button>
          </FixedLayout>
        }
      </AppRoot>
    );
  } else {
    return (
      <AppRoot
        style={{
          background: '#0F0F0F',
          width: window.innerWidth,
          height: window.innerHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Placeholder
          action={
            <Button
              size="l"
              id="NextButton"
              Component="a"
              mode="filled"
              target="_blank"
              style={{ background: '#222222', color: '#FFFFFF' }}
              onClick={() => navigate('/')}
              stretched>
              Вернуться на главную
            </Button>
          }
          description="Ваши билеты были распределены по розыгрышам и теперь вероятность победы увеличилась"
          header={
            <Title weight="2" style={{ color: '#FFFFFF' }}>
              Шанс выиграть увеличился
            </Title>
          }>
          <img alt="Telegram sticker" className="blt0jZBzpxuR4oDhJc8s" src={TicketsTitle} />
        </Placeholder>
      </AppRoot>
    );
  }
}
