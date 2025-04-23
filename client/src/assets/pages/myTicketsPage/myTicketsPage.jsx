import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { Link, useNavigate } from 'react-router-dom';

import {
  AppRoot,
  Placeholder,
  Button,
  Badge,
  Card,
  Image,
  List,
  Caption,
  Text,
  Skeleton,
  IconButton,
  Title,
} from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { initInitData, initBackButton } from '@telegram-apps/sdk';

import Ticket from './ticket.svg';
import TicketSM from './ticket_sm.svg';
import Copy from './copy.svg';

import axios from 'axios';
import { useEffect, useState } from 'react';

function MyTicketsPage_user() {
  const URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const initData = initInitData();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${URL}api/v1/tickets?userID=${initData.user.id}&lotteryID=1`);
      console.log(result.data);
      setIsVisible(false);
    };
    fetchData();
  }, []);

  return (
    <AppRoot
      style={{
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0F0F0F',
        height: window.innerHeight,
        width: window.innerWidth,
      }}>
      <Skeleton visible={isVisible} style={{ width: '100%', height: '100%' }}>
        <Placeholder
          style={{
            paddingTop: '25%',
            display: 'flex',
            margin: '0 auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          action={
            <Button
              style={{ background: '#2990FF' }}
              onClick={() => navigate('/')}
              size="l"
              after={
                <Badge style={{ color: '#2990FF' }} mode="white" type="number">
                  1
                </Badge>
              }
              stretched>
              Смотреть розыгрыши
            </Button>
          }
          description={
            <Text
              style={{
                color: '#AAAAAA',
              }}>
              Билеты приобретаются на странице конкурса, после чего они будут отображаться здесь.
              Билету будет присвоен свой номер ID, любой из них может быть выигрышным"
            </Text>
          }
          header={
            <Title style={{ color: '#FFFFFF' }} level="3" weight="2">
              Тут будут ваши билеты
            </Title>
          }>
          <img alt="Ticket" className="blt0jZBzpxuR4oDhJc8s" src={Ticket} />
        </Placeholder>
      </Skeleton>
    </AppRoot>
  );
}

function MyTicketsPage_player() {
  const URL = import.meta.env.VITE_SERVER_URL;

  const [posts, setPosts] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const initData = initInitData();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (event) => {
    setIsShown(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${URL}api/v1/tickets?userID=${initData.user.id}&lotteryID=1`);
      console.log(result.data);
      setPosts(result.data);
      setIsVisible(false);
    };
    fetchData();
  }, []);

  return (
    <AppRoot
      style={{
        padding: '0',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0F0F0F',
        height: window.innerHeight,
        width: window.innerWidth,
      }}>
      <Skeleton visible={isVisible} style={{ width: '100%', height: '100%' }}>
        <List
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0',
            padding: '8px',
            paddingTop: '16px',
          }}>
          <Card
            style={{
              alignSelf: 'center',
              margin: '0px',
              flex: '1',
              minHeight: '120px',
              backgroundColor: '#212121',
            }}>
            <Card.Cell
              after={
                <Badge
                  style={{
                    backgroundColor: '#2990FF',
                  }}
                  type="number">
                  {posts.length}
                </Badge>
              }
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
                IPHONE 15 PRO MAX НА 512 GB
              </Caption>
            </Card.Cell>
            {posts.map((item) => (
              <CardCell
                style={{
                  backgroundColor: '#212121',
                }}
                before={<Image size={40} src={TicketSM} />}
                after={
                  <>
                    <IconButton
                      onClick={function noRefCheck() {
                        handleClick;
                        navigator.clipboard.write(item.ticketId);
                      }}
                      ref={{
                        current: '[Circular]',
                      }}
                      style={{
                        backgroundColor: '#212121',
                      }}
                      size="s">
                      <img src={Copy} />
                    </IconButton>
                    {isShown && <div>Hold to record audio. Tap to switch to video.</div>}
                  </>
                }
                subhead={<Caption style={{ color: 'AAAAAA' }}>ID билета</Caption>}>
                <Text style={{ color: '#FFFFFF' }}>{item.ticketId}</Text>
              </CardCell>
            ))}
          </Card>
        </List>
      </Skeleton>
    </AppRoot>
  );
}

export default function MyTicketsPage() {
  const URL = import.meta.env.VITE_SERVER_URL;
  const tg = window.Telegram.WebApp;
  tg.setBottomBarColor('#0F0F0F');
  tg.setHeaderColor('#0F0F0F');
  tg.setBackgroundColor('#0F0F0F');

  const initData = initInitData();
  const navigate = useNavigate();
  const [backButton] = initBackButton();
  backButton.show();
  backButton.on('click', () => {
    navigate('/');
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${URL}api/v1/tickets?userID=${initData.user.id}&lotteryID=1`);
      setPosts(result.data);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    fetchData();
  }, []);

  // console.log('posts', posts);

  if (posts.length === 0) {
    return <MyTicketsPage_user />;
  } else {
    return <MyTicketsPage_player />;
  }
}

function MyFrendsPage_empty() {
  const navigate = useNavigate();

  return (
    <AppRoot
      style={{
        padding: '0',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0F0F0F',
        height: window.innerHeight,
        width: window.innerWidth,
      }}>
      <List
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          margin: '0',
          paddingTop: '16px',
        }}>
        <Card
          style={{
            alignSelf: 'center',
            margin: '0px 8px',
            flex: '1',
            minHeight: '180px',
            backgroundColor: '#212121',
          }}>
          <Card
            style={{
              position: 'absolute',
              alignSelf: 'center',
              flex: '1',
              height: '100%',
              width: '100%',
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
                БИЛЕТЫ ЗА ВАШИХ ДРУЗЕЙ
              </Caption>
            </Card.Cell>
            <List
              key=".0"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
              }}>
              <img
                alt="Tickets"
                src={Tickets}
                style={{
                  position: 'absolute',
                  right: '0',
                  bottom: '2.5rem',
                }}
              />
              <LargeTitle
                weight="2"
                style={{
                  marginLeft: '20px',
                  position: 'absolute',
                  bottom: '7rem',
                  color: 'var(--tgui--primary_text_color)',
                }}>
                +3 шт
              </LargeTitle>
              <Button
                onClick={() => navigate('/ticketsdistrub')}
                size="s"
                mode="gray"
                style={{
                  marginLeft: '20px',
                }}>
                Использовать билеты
              </Button>
            </List>
          </Card>
        </Card>
      </List>
      <Caption
        level="1"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '8px 0px',
          flex: '1',
          textAlign: 'center',
          color: '#AAAAAA',
        }}>
        Эти билеты вы можете добавить в активный розыгрыш
      </Caption>
      <List
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          margin: '0',
          paddingTop: '8px',
        }}>
        <Card
          style={{
            alignSelf: 'center',
            margin: '0px 8px 4px',
            flex: '1',
            minHeight: '120px',
            backgroundColor: '#212121',
          }}>
          <Card.Cell
            after={
              <Badge mode="gray" type="number">
                1
              </Badge>
            }
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
              ВАШИ ДРУЗЬЯ
            </Caption>
          </Card.Cell>
          {/* {posts.map((item) => ( */}
          <CardCell
            style={{
              backgroundColor: '#212121',
            }}
            before={<Avatar size={40} src={TicketSM} />}
            after={
              <>
                +1 🎟
                {/* {isShown && <div>Hold to record audio. Tap to switch to video.</div>} */}
              </>
            }>
            <Text>{23432}</Text>
          </CardCell>
          {/* ))} */}
        </Card>
      </List>
    </AppRoot>
  );
}
