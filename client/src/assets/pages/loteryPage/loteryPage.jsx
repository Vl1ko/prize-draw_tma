import React from 'react';
// import './flow.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { initInvoice, initInitData, initBackButton } from '@telegram-apps/sdk';

import {
  AppRoot,
  List,
  Caption,
  Image,
  Card,
  LargeTitle,
  Badge,
  Text,
  FixedLayout,
  Button,
  Cell,
  Subheadline,
  Skeleton,
} from '@telegram-apps/telegram-ui';

import Header from './header.svg';
import Star from './star.svg';
import Emodji1 from './emodji1.svg';
import Emodji2 from './emodji2.svg';
import Emodji3 from './emodji3.svg';
import PremiumBot from './PremiumBot.svg';
import Tickets from './tickets.svg';
import ArrowR from './arrow_r.svg';

import { useEffect, useState } from 'react';

function LoteryPage_user() {
  const URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const initData = initInitData();
  const invoice = initInvoice();

  const tg = window.Telegram.WebApp;
  tg.setBottomBarColor('#0F0F0F');
  tg.setHeaderColor('#007AFF');
  tg.setBackgroundColor('#0F0F0F');

  const [allTicketsPosts, setAllTickets] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function getPreCheckoutQuery() {
    var preCheckoutQuery;
    await axios
      .get(
        `https://api.telegram.org/bot2200531326:AAEqSvJx2lnlA6n9yd0B4iFEAaeIp5a_HSE/test/getUpdates`,
      )
      .then((response) =>
        axios
          .post(
            `https://api.telegram.org/bot2200531326:AAEqSvJx2lnlA6n9yd0B4iFEAaeIp5a_HSE/test/answerPreCheckoutQuery`,
            {
              pre_checkout_query_id:
                response.data.result[response.data.result.length - 1].pre_checkout_query.id,
              ok: true,
            },
          )
          .then(() =>
            axios.post(`${URL}api/v1/tickets`, {
              ticketId: `${getRandomInt(1000, 9999)}-${getRandomInt(1000, 9999)}-${getRandomInt(
                1000,
                9999,
              )}`,
              lotteryId: 1,
              userId: `${initData?.user?.id}`,
              ticketFrom: 'buy',
            }),
          )
          .then(() => {
            navigate('/');
          }),
      );

    // const data = response.json();

    // const preCheckoutQuery = data.result.findLast((update) => update.pre_checkout_query);
    // console.log(preCheckoutQuery);

    return preCheckoutQuery.pre_checkout_query.id;
  }

  useEffect(() => {
    const fetchData = async () => {
      const allTickets = await axios(`${URL}api/v1/lotterys/tickets?id=1`);

      setAllTickets(allTickets.data);
      setIsVisible(false);
    };

    fetchData();
  }, []);

  return (
    <AppRoot
      id="scroll"
      className="scroll"
      style={{
        background: '#007AFF',
        width: window.innerWidth,
      }}>
      <Skeleton
        visible={isVisible}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
        }}>
        <Cell
          onClick={() => navigate('/starinstruction')}
          before={<img style={{ width: '25px' }} src={Star} />}
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
          <Text style={{ color: 'white' }} weight="2">
            Как купить Stars?
          </Text>
        </Cell>
        <List
          style={{
            borderRadius: '16px 16px 0 0',
            backgroundColor: '#0F0F0F',
            paddingTop: '6px',
            paddingLeft: '4px',
            paddingRight: '4px',
            height: '100%',
          }}>
          <Image
            style={{
              alignSelf: 'center',
              margin: '4px auto',
              marginTop: '8px',
            }}
            size={window.innerWidth - 16}
            src={Header}
          />
          <List
            style={{
              display: 'flex',
              margin: 0,
              padding: 0,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Card
              style={{
                alignSelf: 'center',
                margin: '4px',
                marginBottom: '0px',
                flex: '1',
                minHeight: '100px',
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
                    color: 'var(--tgui--subtitle_text_color)',
                  }}>
                  СТОИМОСТЬ БИЛЕТА
                </Caption>
                <div
                  style={{
                    display: 'flex',
                  }}>
                  <LargeTitle
                    weight="2"
                    style={{
                      color: '#FFFFFF',
                    }}>
                    100
                  </LargeTitle>
                  <img
                    style={{
                      marginLeft: '8px',
                    }}
                    src={Star}
                    alt="Telegram PrizeDraw"
                  />
                </div>
              </Card.Cell>
            </Card>
            <Card
              style={{
                alignSelf: 'center',
                margin: '4px',
                marginBottom: '0px',
                flex: '1',
                minHeight: '100px',
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
                    color: 'var(--tgui--subtitle_text_color)',
                  }}>
                  ВСЕГО УЧАСТНИКОВ
                </Caption>
                <LargeTitle
                  weight="2"
                  style={{
                    color: '#FFFFFF',
                  }}>
                  {allTicketsPosts}
                </LargeTitle>
              </Card.Cell>
            </Card>
          </List>
          <List
            style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              margin: '0 auto',
              padding: '8px',
            }}>
            <Card
              style={{
                alignSelf: 'center',
                flex: '1',
                margin: '0px',
                padding: '0px',
                minHeight: '100px',
                backgroundColor: '#212121',
              }}>
              <Card.Cell
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'var(--tgui--primary_bg_color)',
                }}>
                <Caption
                  level="1"
                  weight="3"
                  style={{
                    color: 'var(--tgui--subtitle_text_color)',
                  }}>
                  ОПИСАНИЕ РОЗЫГРЫША
                </Caption>
              </Card.Cell>
              <Badge
                style={{
                  marginLeft: '16px',
                  color: '#2990FF',
                  backgroundColor: '#223242',
                }}
                mode="secondary"
                type="number">
                Высокий шанс выиграть
              </Badge>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '16px',
                  marginRight: '16px',
                  marginTop: '8px',
                  marginBottom: '16px',
                  color: '#FFFFFF',
                }}>
                <Text>
                  Честный розыгрыш iPhone 15 Pro Max! Для участия нужно всего лишь купить билет —
                  никаких дополнительных условий.
                  <br />
                  <br />
                </Text>
                <Text>
                  Мы гарантируем, что в розыгрыше участвуют только реальные люди, никаких ботов.{' '}
                  <br />
                  <br />
                </Text>
                <Text>
                  Благодаря ограниченному количеству билетов, у каждого участника будет высокий шанс
                  на победу.
                  <br />
                  <br />
                </Text>
                <Text>
                  Розыгрыш состоится 12 апреля и будет проводиться в прямом эфире, чтобы вы могли
                  лично убедиться в его честности. Не упустите свой шанс стать обладателем новейшего
                  iPhone 15 Pro Max!
                </Text>
              </div>
            </Card>
          </List>
          <Cell
            style={{
              alignSelf: 'center',
              margin: '4px auto',
              flex: '1',
              height: '80px',
              backgroundColor: 'var(--tgui--primary_code_highlight)',
              borderRadius: '16px',
              width: window.innerWidth - 32,
            }}
            after={
              <Button
                Component="a"
                href="https://t.me/PremiumBot"
                style={{
                  background: 'var(--tgui--button_color)',
                }}
                size="s">
                <Subheadline level="2" weight="2">
                  Купить
                </Subheadline>
              </Button>
            }
            before={<Image src={PremiumBot} />}>
            <Text style={{ color: '#FFFFFF' }}>Premium Bot</Text>
          </Cell>
          <List
            style={{
              width: '100%',
              minHeight: '280px',
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollbarWidth: 'none',
              padding: '8px',
              margin: '0px',
            }}>
            <Card
              style={{
                overflow: 'visible',
                display: 'block',
                minWidth: '160px',
                textAlign: 'center',
                height: '160px',
                margin: '4px',
                padding: '16px',
                backgroundColor: '#212121',
              }}>
              <Caption
                level="1"
                weight="2"
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: 'var(--tgui--subtitle_text_color)',
                }}>
                БИЛЕТЫ ОГРАНИЧЕНЫ
              </Caption>
              <img style={{ position: 'absolute', left: '25%', top: '65%' }} src={Emodji1} />
            </Card>
            <Card
              style={{
                overflow: 'visible',
                display: 'block',
                minWidth: '160px',
                textAlign: 'center',
                height: '160px',
                margin: '4px',
                padding: '16px',
                backgroundColor: '#212121',
              }}>
              <Caption
                level="1"
                weight="2"
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: 'var(--tgui--subtitle_text_color)',
                }}>
                ВЫСОКИЙ ШАНС НА ПОБЕДУ
              </Caption>
              <img style={{ position: 'absolute', left: '25%', top: '65%' }} src={Emodji2} />
            </Card>
            <Card
              style={{
                overflow: 'visible',
                display: 'block',
                minWidth: '160px',
                textAlign: 'center',
                height: '160px',
                margin: '4px',
                padding: '16px',
                backgroundColor: '#212121',
              }}>
              <Caption
                level="1"
                weight="2"
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: 'var(--tgui--subtitle_text_color)',
                }}>
                РОЗЫГРЫШИ В ПРЯМОМ ЭФИРЕ
              </Caption>
              <img style={{ position: 'absolute', left: '25%', top: '65%' }} src={Emodji3} />
            </Card>
          </List>
        </List>

        <FixedLayout
          vertical="bottom"
          style={{ paddingLeft: '8px', paddingRight: '8px', paddingBottom: '16px' }}>
          <Button
            style={{ backgroundColor: '#2990FF', color: '#FFFFFF' }}
            before={<img src={Star} />}
            onClick={() => {
              axios
                .post(
                  'https://api.telegram.org/bot2200531326:AAEqSvJx2lnlA6n9yd0B4iFEAaeIp5a_HSE/test/createInvoiceLink',
                  // 'https://api.telegram.org/bot6314250194:AAEYiv2Ff_Rur1Qq6zPNenN0wzSe-kTJIn0/createInvoiceLink',

                  {
                    title: 'Билет для участия в розыгрыше iPhone 15 Pro Max',
                    description: 'Билет для участия в розыгрыше iPhone 15 Pro Max',
                    payload: `${Math.random()}pay`,
                    currency: 'XTR',
                    prices: [
                      { amount: 100, label: 'Билет для участия в розыгрыше iPhone 15 Pro Max' },
                    ],
                  },
                )

                .then((response) => {
                  invoice.open(response.data.result.split('$')[1]).then(() => {
                    getPreCheckoutQuery()
                      .then((preCheckoutQuery) => {
                        console.log(preCheckoutQuery);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  });
                });
            }}
            id="NextButton"
            Component="a"
            mode="filled"
            size="l"
            target="_blank"
            stretched>
            Купить билет, 100
          </Button>
        </FixedLayout>
      </Skeleton>
    </AppRoot>
  );
}

function LoteryPage_player() {
  const URL = import.meta.env.VITE_SERVER_URL;
  const tg = window.Telegram.WebApp;
  tg.setBottomBarColor('#0F0F0F');
  tg.setHeaderColor('#0F0F0F');
  tg.setBackgroundColor('#0F0F0F');

  const navigate = useNavigate();

  const initData = initInitData();
  const [ticketsPosts, setTicketsPosts] = useState([]);
  const [allTicketsPosts, setAllTickets] = useState([]);
  const [userWinChance, setUserWinChance] = useState([]);
  const [winDatePosts, setWinDate] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  function dayTitle(number) {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'дней';
    var last_num = number % 10;
    if (last_num == 1) return 'день';
    if ([2, 3, 4].includes(last_num)) return 'дня';
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'дней';
  }

  function ticketTitle(number) {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'билетов';
    var last_num = number % 10;
    if (last_num == 1) return 'билет';
    if ([2, 3, 4].includes(last_num)) return 'билета';
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'билетов';
  }

  useEffect(() => {
    const fetchData = async () => {
      const userTickets = await axios(
        `${URL}api/v1/tickets/inLottery?userID=${initData.user.id}&lotteryID=1`,
      );
      const allTickets = await axios(`${URL}api/v1/lotterys/tickets?id=1`);
      const winDate = await axios(`${URL}api/v1/lotterys?id=1`);

      const winChance = Math.round((Number(userTickets.data) / allTickets.data) * 100);
      const dayLeft = Math.round(
        (new Date(winDate.data[0].endTime).getTime() - new Date()) / (24 * 3600 * 1000),
      );

      if (dayLeft <= 0) {
        axios.post(`${URL}api/v1/getWinner`, {
          id: 1,
        });
        setWinDate(0);
      } else {
        setWinDate(dayLeft);
      }

      console.log('dayLeft:', dayLeft);

      setTicketsPosts(userTickets.data);
      setAllTickets(allTickets.data);
      setUserWinChance(winChance);
      setIsVisible(false);

      console.log('winChance:', winChance);
    };

    fetchData();
  }, []);

  return (
    <AppRoot
      id="scroll"
      className="scroll"
      style={{
        background: '#0F0F0F',

        width: window.innerWidth,
        overflow: 'scroll',
      }}>
      <Skeleton
        visible={isVisible}
        style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}>
        <List
          style={{
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0',
            padding: '4px',
            paddingTop: '12px',
            paddingBottom: '0px',
          }}>
          <Card
            style={{
              alignSelf: 'center',
              margin: '4px',
              flex: '1',
              minHeight: '180px',
            }}>
            <img src={Header} style={{ minHeight: '180px' }}></img>
          </Card>
          <Card
            onClick={() => navigate('/mytickets')}
            style={{
              alignSelf: 'center',
              margin: '4px',
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
                    color: 'var(--tgui--subtitle_text_color)',
                  }}>
                  БИЛЕТОВ
                  <br />В РОЗЫГРЫШЕ
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
                    right: '0rem',
                    bottom: '3rem',
                    transform: 'scale(1.3) rotate(-5deg)',
                  }}
                />
                <LargeTitle
                  weight="2"
                  style={{
                    position: 'absolute',
                    bottom: '6rem',
                    left: '20px',
                    color: '#FFFFFF',
                  }}>
                  {ticketsPosts} шт
                </LargeTitle>
              </List>
            </Card>
            <img src={Header} style={{ opacity: '0', minHeight: '180px' }}></img>
          </Card>
        </List>
        <List
          style={{
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0',
            padding: '4px',
            paddingTop: '0px',
            paddingBottom: '0px',
          }}>
          <Card
            style={{
              alignSelf: 'center',
              margin: '4px',
              flex: '1',
              minHeight: '180px',
              backgroundColor: '#212121',
            }}>
            <Card
              onClick={() => navigate('/mytickets')}
              style={{
                position: 'absolute',
                alignSelf: 'center',
                margin: '4px',
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
                    color: 'var(--tgui--subtitle_text_color)',
                  }}>
                  ВЕРОЯТНОСТЬ
                  <br />
                  ПОБЕДЫ
                </Caption>
                {/* <img
                src={ArrowR}
                alt="arrow_r"
                style={{
                  position: 'absolute',
                  right: '24px',
                  top: '22px',
                  cursor: 'pointer',
                }}
              /> */}
              </Card.Cell>

              <List key=".0" style={{ position: 'absolute', bottom: '1rem' }}>
                <Caption style={{ color: 'var(--tgui--subtitle_text_color)' }}>
                  {allTicketsPosts} {ticketTitle(allTicketsPosts)}
                </Caption>
                <LargeTitle
                  weight="2"
                  style={{
                    color: '#FFFFFF',
                  }}>
                  {(userWinChance < 1 && <>{`<1%`}</>) || <>{userWinChance}%</>}
                </LargeTitle>
              </List>
            </Card>
            <img src={Header} style={{ opacity: '0', minHeight: '180px' }}></img>
          </Card>
          <Card
            style={{
              alignSelf: 'center',
              margin: '4px',
              flex: '1',
              minHeight: '180px',
              backgroundColor: '#212121',
            }}>
            <Card
              style={{
                position: 'absolute',
                alignSelf: 'center',
                margin: '4px',
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
                    wordWrap: 'break-word',
                    color: 'var(--tgui--subtitle_text_color)',
                  }}>
                  КОГДА БУДЕТ
                  <br />
                  РОЗЫГРЫШ
                </Caption>
              </Card.Cell>

              <List key=".0" style={{ position: 'absolute', bottom: '1rem' }}>
                <Caption style={{ color: 'var(--tgui--subtitle_text_color)' }}>через</Caption>
                <LargeTitle
                  weight="2"
                  style={{
                    color: '#FFFFFF',
                  }}>
                  {winDatePosts} {dayTitle(winDatePosts)}
                </LargeTitle>
              </List>
            </Card>
            <img src={Header} style={{ opacity: '0', minHeight: '180px', color: '#  ' }}></img>
          </Card>
        </List>
        <List
          style={{
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0 auto',
            padding: '4px',
            paddingTop: '0px',
            paddingBottom: '0px',
          }}>
          <Card
            style={{
              alignSelf: 'center',
              flex: '1',
              margin: '4px',
              minHeight: '100px',
              backgroundColor: '#212121',
            }}>
            <Card.Cell
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--tgui--primary_bg_color)',
              }}>
              <Caption
                level="1"
                weight="3"
                style={{
                  color: 'var(--tgui--subtitle_text_color)',
                }}>
                ОПИСАНИЕ РОЗЫГРЫША
              </Caption>
            </Card.Cell>
            <Badge
              style={{
                marginLeft: '16px',
                color: '#2990FF',
                backgroundColor: '#223242',
              }}
              mode="secondary"
              type="number">
              Высокий шанс выиграть
            </Badge>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '16px',
                marginRight: '16px',
                marginTop: '8px',
                marginBottom: '16px',
                color: '#FFFFFF',
              }}>
              <Text>
                Честный розыгрыш iPhone 15 Pro Max! Для участия нужно всего лишь купить билет —
                никаких дополнительных условий.
                <br />
                <br />
              </Text>
              <Text>
                Мы гарантируем, что в розыгрыше участвуют только реальные люди, никаких ботов.{' '}
                <br />
                <br />
              </Text>
              <Text>
                Благодаря ограниченному количеству билетов, у каждого участника будет высокий шанс
                на победу.
                <br />
                <br />
              </Text>
              <Text>
                Розыгрыш состоится 12 апреля и будет проводиться в прямом эфире, чтобы вы могли
                лично убедиться в его честности. Не упустите свой шанс стать обладателем новейшего
                iPhone 15 Pro Max!
              </Text>
            </div>
          </Card>
        </List>
        <List
          style={{
            width: '100%',
            minHeight: '280px',
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            padding: '4px',
            paddingTop: '0px',
          }}>
          <Card
            style={{
              overflow: 'visible',
              display: 'block',
              minWidth: '160px',
              textAlign: 'center',
              height: '160px',
              margin: '4px',
              padding: '16px',
              backgroundColor: '#212121',
            }}>
            <Caption
              level="1"
              weight="2"
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: 'var(--tgui--subtitle_text_color)',
              }}>
              БИЛЕТЫ ОГРАНИЧЕНЫ
            </Caption>
            <img style={{ position: 'absolute', left: '25%', top: '65%' }} src={Emodji1} />
          </Card>
          <Card
            style={{
              overflow: 'visible',
              display: 'block',
              minWidth: '160px',
              textAlign: 'center',
              height: '160px',
              margin: '4px',
              padding: '16px',
              backgroundColor: '#212121',
            }}>
            <Caption
              level="1"
              weight="2"
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: 'var(--tgui--subtitle_text_color)',
              }}>
              ВЫСОКИЙ ШАНС НА ПОБЕДУ
            </Caption>
            <img style={{ position: 'absolute', left: '25%', top: '65%' }} src={Emodji2} />
          </Card>
          <Card
            style={{
              overflow: 'visible',
              display: 'block',
              minWidth: '160px',
              textAlign: 'center',
              height: '160px',
              margin: '4px',
              padding: '16px',
              backgroundColor: '#212121',
            }}>
            <Caption
              level="1"
              weight="2"
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: 'var(--tgui--subtitle_text_color)',
              }}>
              РОЗЫГРЫШИ В ПРЯМОМ ЭФИРЕ
            </Caption>
            <img style={{ position: 'absolute', left: '25%', top: '65%' }} src={Emodji3} />
          </Card>
        </List>
      </Skeleton>
    </AppRoot>
  );
}

export default function LoteryPage() {
  const URL = import.meta.env.VITE_SERVER_URL;

  const initData = initInitData();
  const navigate = useNavigate();
  const [isPlayerPosts, setIsPlayerPosts] = useState([]);
  const [backButton] = initBackButton();
  backButton.show();
  backButton.on('click', () => {
    navigate('/');
  });

  useEffect(() => {
    const fetchData = async () => {
      const isPlayer = await axios(
        `${URL}api/v1/lotterys/isPlayer?userID=${initData.user.id}&lotteryID=1`,
      );

      setIsPlayerPosts(isPlayer.data.isPlayer);
      console.log('IsPlayer:', isPlayerPosts);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    fetchData();
  }, []);
  if (isPlayerPosts) {
    return <LoteryPage_player />;
  } else {
    return <LoteryPage_user />;
  }
}
