import '../../../index.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { Fragment } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { initBackButton } from '@telegram-apps/sdk';
import { initInitData, initClosingBehavior } from '@telegram-apps/sdk';
import {
  AppRoot,
  Skeleton,
  Image,
  List,
  Section,
  Card,
  Caption,
  LargeTitle,
  Avatar,
  AvatarStack,
  Badge,
  Text,
  Button,
  Cell,
} from '@telegram-apps/telegram-ui';

import Star from './star.gif';
import Tickets from './tickets.svg';
import ArrowR from './arrow_r.svg';
import MiniArror from './miniArror.svg';
import Iphone from './iphone.svg';
import Avatar1 from './avatar1.svg';
import Avatar2 from './avatar2.svg';
import Avatar3 from './avatar3.svg';

import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const tg = window.Telegram.WebApp;
  tg.setBottomBarColor('#0F0F0F');
  tg.setHeaderColor('#007AFF');
  tg.setBackgroundColor('#0F0F0F');
  tg.disableVerticalSwipes();

  const [closingBehavior] = initClosingBehavior();
  closingBehavior.enableConfirmation();

  const URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const initData = initInitData();
  const [backButton] = initBackButton();
  backButton.hide();
  const getTickets = 1;
  const startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
  console.log('startParam:', startParam);

  const [posts, setPosts] = useState([]);
  const [isPlayerPosts, setIsPlayerPosts] = useState([]);
  const [winDatePosts, setWinDate] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  function dayTitle(number) {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'дней';
    const last_num = number % 10;
    if (last_num == 1) return 'день';
    if ([2, 3, 4].includes(last_num)) return 'дня';
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'дней';
  }

  console.log('initData:', initData?.user?.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${URL}api/v1/tickets?userID=${initData?.user?.id}&lotteryID=1`);
        console.log(`${URL}api/v1/tickets?userID=${initData?.user?.id}&lotteryID=1`);

        const isPlayer = await axios(
          `${URL}api/v1/lotterys/isPlayer?userID=${initData?.user?.id}&lotteryID=1`,
        );

        const winDate = await axios(`${URL}api/v1/lotterys?id=1`);

        const dayLeft = Math.round(
          (new Date(winDate.data[0].endTime).getTime() - new Date()) / (24 * 3600 * 1000),
        );

        document.body.scrollTop = document.documentElement.scrollTop = 0;

        setIsPlayerPosts(isPlayer.data.isPlayer);
        console.log('IsPlayer:', isPlayerPosts);
        setPosts(result.data);
        console.log('Posts:', result.data);
        setWinDate(dayLeft);
        setIsVisible(false);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();
  }, []);

  axios.get(`${URL}api/v1/users?tgID=${initData?.user?.id}`).then((response) => {
    try {
      if (response.data.length === 0) {
        navigate('/hello/1');
        axios.post(`${URL}api/v1/users`, {
          tgID: `${initData?.user?.id}`,
          inviteId: `${startParam}`,
          userName: `${initData?.user?.username}`,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  return (
    <div className="body">
      <AppRoot
        style={{
          background: '#007AFF',
          width: window.innerWidth,
          padding: '0',
          overflow: 'hidden',
          height: window.innerHeight,
          margin: '0',
        }}>
        <Skeleton
          visible={isVisible}
          style={{ width: window.innerWidth, height: window.innerHeight }}>
          <Cell
            onClick={() => navigate('/starinstruction')}
            before={<img style={{ width: '35px' }} src={Star} />}
            after={
              <Button
                style={{
                  color: '#007AFF',
                }}
                mode="white"
                size="s">
                Инструкция
              </Button>
            }
            style={{
              background: '#007AFF',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              verticalAlign: 'center',
              alignItems: 'center',
              paddingTop: '4px',
              paddingBottom: '4px',
            }}>
            <Text weight="2" style={{ color: 'white' }}>
              Как купить Stars?
            </Text>
          </Cell>
          <List
            style={{
              borderRadius: '16px 16px 0 0',
              background: '#0F0F0F',
              padding: '0',
              margin: '0',
              height: '100%',
            }}>
            <List
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                margin: '0',
                padding: '4px',
              }}>
              <Card
                onClick={() => navigate('/mytickets')}
                style={{
                  alignSelf: 'center',
                  margin: '4px',
                  flex: '1',
                  minHeight: '180px',
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
                    ВАШИ БИЛЕТЫ
                  </Caption>
                  <img
                    src={ArrowR}
                    alt="arrow_r"
                    style={{
                      position: 'absolute',
                      right: '24px',
                      top: '22px',
                      cursor: 'pointer',
                    }}
                  />
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
                      position: 'absolute',
                      right: '0px',
                      transform: 'scale(1.3) rotate(-5deg)',
                    }}
                  />
                  <LargeTitle
                    weight="2"
                    style={{
                      position: 'absolute',
                      top: '60px',
                      left: '24px',
                      color: '#FFFFFF',
                    }}>
                    {posts.length} шт
                  </LargeTitle>
                </List>
              </Card>

              <Card
                onClick={() => navigate('/myfrends')}
                style={{
                  alignSelf: 'center',
                  height: '20vh',
                  margin: '4px',
                  flex: '1',
                  minHeight: '180px',
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
                    ВАШИ ДРУЗЬЯ
                  </Caption>
                </Card.Cell>
                <img
                  src={ArrowR}
                  alt="arrow_r"
                  style={{
                    position: 'absolute',
                    right: '24px',
                    top: '22px',
                    cursor: 'pointer',
                  }}
                />
                <AvatarStack
                  style={{
                    marginTop: '0',
                    marginLeft: '20px',
                  }}>
                  <Fragment key=".0">
                    <Avatar
                      size={40}
                      src={Avatar1}
                      style={{
                        backgroundColor: '#DF2ECB',
                      }}
                    />
                    <Avatar
                      size={40}
                      src={Avatar2}
                      style={{
                        backgroundColor: '#2990FF',
                      }}
                    />
                    <Avatar
                      size={40}
                      src={Avatar3}
                      style={{
                        backgroundColor: '#8833FF',
                      }}
                    />
                  </Fragment>
                </AvatarStack>
                <Section.Footer
                  style={{
                    marginTop: '12px',
                    marginRight: '20px',
                    marginLeft: '20px',
                    padding: '0px',
                    textAlign: 'left',
                  }}>
                  <Caption style={{ color: '#AAAAAA' }}>
                    Зови друзей - получай билеты за каждого
                  </Caption>
                </Section.Footer>
              </Card>
            </List>
            <List
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: window.innerWidth,

                margin: '0 auto',
                paddingTop: '0px',
                paddingRight: '8px',
                paddingLeft: '8px',
              }}>
              <Card
                style={{
                  alignSelf: 'center',

                  // margin: '4px',
                  flex: '1',
                  minHeight: '120px',
                  backgroundColor: '#212121',
                }}>
                <Card.Cell
                  after={
                    <>
                      {(isPlayerPosts && (
                        <Badge
                          type="number"
                          mode="gray"
                          style={{
                            color: '#FFFFFF',
                          }}>
                          1
                        </Badge>
                      )) || (
                        <Badge
                          type="number"
                          mode="primary"
                          style={{
                            backgroundColor: '#2990FF',
                            color: '#FFFFFF',
                          }}>
                          1
                        </Badge>
                      )}
                    </>
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
                    {(isPlayerPosts && <>ВЫ УЧАСТВУЕТЕ</>) || <>НОВЫЕ РОЗЫГРЫШИ</>}
                  </Caption>
                </Card.Cell>

                <CardCell
                  onClick={() => navigate('/lotery')}
                  style={{
                    textAlign: 'left',
                    backgroundColor: '#212121',
                    color: '#FFFFFF',
                  }}
                  after={<img src={MiniArror} />}
                  before={<Image size={40} src={Iphone} />}
                  subtitle={
                    <Caption style={{ color: '#AAAAAA' }}>
                      Розыгрыш через {winDatePosts} {dayTitle(winDatePosts)}
                    </Caption>
                  }>
                  iPhone 15 pro Max
                </CardCell>
              </Card>
            </List>
          </List>
        </Skeleton>
      </AppRoot>
    </div>
  );
}
