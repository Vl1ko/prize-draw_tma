import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

import {
  AppRoot,
  Badge,
  Button,
  Placeholder,
  Card,
  Skeleton,
  List,
  Caption,
  Text,
  LargeTitle,
  Avatar,
} from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { initBackButton, initInitData } from '@telegram-apps/sdk';

import Frends from './frends.svg';
import Ticket from './ticket.svg';
import TicketSM from './ticket_sm.svg';
import Copy from './copy.svg';
import Tickets from './tickets.svg';

function MyFrendsPage_empty() {
  const URL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();
  const initData = initInitData();
  const [isVisible, setIsVisible] = useState(true);
  const [userFrendsPosts, setUserFrendsPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const frends = await axios(`${URL}api/v1/users?inviteID=${initData.user.id}`);

      setUserFrendsPosts(frends.data);
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
      <Skeleton visible={isVisible} style={{ width: '100%', height: '100%', marginTop: '25%' }}>
        <Placeholder
          style={{
            marginTop: '20%',
          }}
          action={
            <Button
              style={{
                backgroundColor: '#2990FF',
                color: '#FFFFFF',
              }}
              onClick={() =>
                window.open(
                  `https://t.me/share/url?url=${encodeURIComponent(
                    `https://t.me/Vl1Testbot/testWAVl1ko?startapp=${initData.user.id}`,
                  )}`,
                )
              }
              size="l"
              stretched>
              Пригласить друзей
            </Button>
          }
          description={
            <Text style={{ color: '#AAAAAA' }}>
              За каждого приглашенного друга вы получаете 1 билет 🎟, как только друг станет
              участвовать хотябы в 1 розыгрыше
            </Text>
          }
          header={
            <Text style={{ color: '#FFFFFF' }}>
              Приглашай друзей - получай дополнительные билеты
            </Text>
          }>
          <img alt="Frends" className="blt0jZBzpxuR4oDhJc8s" src={Frends} />
        </Placeholder>
      </Skeleton>
    </AppRoot>
  );
}

function MyFrendsPage_frends() {
  const URL = import.meta.env.VITE_SERVER_URL;

  const initData = initInitData();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [tickets, setTicketsPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${URL}api/v1/users?inviteID=${initData.user.id}`);
      setPosts(result.data);

      const hTickets = await axios(`${URL}api/v1/tickets/getReferal?userID=${initData?.user?.id}`);

      if (hTickets.data <= 0) {
        setTicketsPosts(0);
      } else {
        setTicketsPosts(`+${hTickets.data}`);
      }

      for (let i = 0; i < result.data.length; i++) {
        axios
          .get(
            `https://api.telegram.org/bot2200531326:AAEqSvJx2lnlA6n9yd0B4iFEAaeIp5a_HSE/test/getUserProfilePhotos?user_id=${result.data[i].tgID}`,
          )
          .then((response) => {
            axios
              .get(
                `https://api.telegram.org/bot2200531326:AAEqSvJx2lnlA6n9yd0B4iFEAaeIp5a_HSE/test/getFile?file_id=${response.data.result.photos[0][0].file_id}`,
              )
              .then((response) => {
                setAvatar(
                  `https://api.telegram.org/file/bot2200531326:AAEqSvJx2lnlA6n9yd0B4iFEAaeIp5a_HSE/test/${response.data.result.file_path}`,
                );
              });
          });
      }
      setIsVisible(false);
    };

    fetchData();
  }, []);

  console.log('avatar', String(avatar).split(' '));

  return (
    <AppRoot
      style={{
        padding: '0',
        margin: '0',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0F0F0F',
        height: window.innerHeight,
        width: window.innerWidth,
      }}>
      <Skeleton
        visible={isVisible}
        style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}>
        <List
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0',
            padding: '4px',
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
                    left: '1.5rem',
                    position: 'absolute',
                    bottom: '7rem',
                    color: '#FFFFFF',
                  }}>
                  {tickets} шт
                </LargeTitle>
                <Button
                  onClick={() => navigate('/ticketsdistrub')}
                  size="s"
                  mode="gray"
                  style={{
                    position: 'absolute',
                    left: '1.5rem',
                    color: '#FFFFFF',
                    backgroundColor: '#323232',
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
          Эти билеты вы можете добавить в активный <br />
          розыгрыш
        </Caption>
        <List
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0',
            padding: '4px',
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
                <Badge mode="gray" type="number" style={{ color: '#FFFFFF' }}>
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
                ВАШИ ДРУЗЬЯ
              </Caption>
            </Card.Cell>
            {posts.map((item) => (
              <CardCell
                style={{
                  backgroundColor: '#212121',
                }}
                before={
                  <Avatar
                    size={40}
                    acronym={item.userName[0] + ' ' + item.userName[1]}
                    src={String(avatar).split(' ')[item.id - 1]}></Avatar>
                }
                after={
                  <>
                    <Text style={{ color: '#FFFFFF' }}>+1 🎟</Text>

                    {/* {isShown && <div>Hold to record audio. Tap to switch to video.</div>} */}
                  </>
                }>
                <Text style={{ color: '#FFFFFF' }}>{item.userName}</Text>
              </CardCell>
            ))}
          </Card>
        </List>
      </Skeleton>
    </AppRoot>
  );
}

export default function myFrendsPage() {
  const tg = window.Telegram.WebApp;
  tg.setBottomBarColor('#0F0F0F');
  tg.setHeaderColor('#0F0F0F');
  tg.setBackgroundColor('#0F0F0F');

  const URL = import.meta.env.VITE_SERVER_URL;

  const initData = initInitData();
  const navigate = useNavigate();
  const [backButton] = initBackButton();
  backButton.show();
  backButton.on('click', () => {
    navigate('/');
  });

  const [userFrendsPosts, setUserFrendsPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const frends = await axios(`${URL}api/v1/users?inviteID=${initData.user.id}`);

      setUserFrendsPosts(frends.data);
      setIsVisible(false);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    fetchData();
  }, []);

  if (userFrendsPosts.length > 0) {
    return <MyFrendsPage_frends />;
  } else {
    return <MyFrendsPage_empty />;
  }
}
