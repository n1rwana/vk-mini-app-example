import React, { useState } from 'react';

import {
  Button,
  Cell,
  ConfigProvider,
  Epic,
  Group,
  Link,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
  Spacing,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  View
} from '@vkontakte/vkui';

import { Icon28GridLayoutOutline, Icon28SettingsOutline } from '@vkontakte/icons';

import HomePanel from './features/Home';
import Persik from './features/Persik';
import Popouts from './features/Popouts';

import IconFromImage from './components/IconFromImage';

import PersikImg from '../img/persik.png';

const Home = ({
  activeStory,
  appearance,
  fetchedUser,
  go,
  hasHeader,
  isDesktop,
  isLoading,
  isMobile,
  platform,
  setAppearance,
  setLoading, 
  setPopout
}) => {

  const [showPopoutsIcon, setShowPopoutsIcon] = useState(false);

  /**
   * Здесь можно поменять размер меню и контента соответственно.
   */
  const menuWidth = "280px";
  const contentWidth = "660px";

  /**
   * Пропсы, которые будут передаются на все панели.
   * 
   * В массиве панелей ниже Вам в параметре component нужно дописать {...defaultProps},
   * чтобы эти пропсы передались, например <Persik id="persik" {...defaultProps} />
   */
  const defaultProps = {
    isMobile: isMobile,
    isLoading: isLoading,
    setLoading: setLoading,
    go: go,
    setPopout: setPopout,
    foo: "bar"
  }

  /**
   * Массив объектов, содержащий информацию о панелях, которые есть в приложении. 
   * Просто укажите нужные панели по примеру, дальше приложение всё сделает само.
   * 
   * @param {string} id — ID панели
   * @param {Array} menuTriggers — массив с ID панелей, при открытии которых панель подсвечивается в меню как открытая
   * @param {string} name — Название панели
   * @param {JSX} menuIcon — Иконка для меню. желательно из VK Icons размером 28. Можно мой компонент <IconFromImage /> :)
   * @param {JSX} showInMenu — Условие, при котором ссылка на панель должна быть показана в меню, например (2 + 2 === 4). true чтобы отобразить в любом случае
   * @param {JSX} component — Собственно сам импортированный компонент панели с пропсами. Обязательно укажите пропс id равный id панели
   * @param {JSX} panelHeader — Компонент PanelHeader для панели. Если он указан, прописывать ещё один в коде панели не нужно.
   */
  const panels = [
    {
      id: "home",
      menuTriggers: ["home"],
      name: "Главная",
      menuIcon: <Icon28GridLayoutOutline />,
      showInMenu: true,
      component: <HomePanel id="home" {...defaultProps} fetchedUser={fetchedUser} />,
      panelHeader: <PanelHeader>Главная</PanelHeader>
    },
    {
      id: "persik",
      menuTriggers: ["persik"],
      name: "Персик",
      menuIcon: <IconFromImage image={PersikImg} size={28} />,
      showInMenu: (2 + 2 === 4),
      component: <Persik id="persik" {...defaultProps} />,
      panelHeader: <PanelHeader left={<PanelHeaderBack onClick={() => window.history.back()} />}>Persik</PanelHeader>
    },
    {
      id: "popouts",
      menuTriggers: ["popouts"],
      name: "Popouts",
      menuIcon: showPopoutsIcon ? <Icon28SettingsOutline /> : null,
      showInMenu: true,
      component: <Popouts id="popouts" {...defaultProps} showPopoutsIcon={showPopoutsIcon} setShowPopoutsIcon={setShowPopoutsIcon} />,
      panelHeader: <PanelHeader left={<PanelHeaderBack onClick={() => window.history.back()} />}>{isLoading ? "Загрузка..." : "Popouts"}</PanelHeader>
    },
  ];

  /**
   * Инфорация о баннере, который отображается под меню в десктопной версии сервиса. 
   * Оставьте пустым, чтобы баннер не отображался.
   * 
   * P. S. Оставить пустым, это const bannerInfo = {}
   * 
   * @param {string} text — Текст баннера, желательно не длинный.
   * @param {string} image — Ссылка на картинку (будет выведена в размерах 48x48px; margin-right: 10px).
   * @param {string} additional — link либо children
   * @param {object} link — Ссылка (href), которая открывается при нажатии на кнопку (button). 
   * @param {JSX} children — Выводится, если link = null или если additional = children
   */
  const bannerInfo = {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: PersikImg,
    additional: "children",
    link: {
      href: "https://vk.com/feed",
      button: <Button size="s" mode="secondary" stretched>Подробнее</Button>
    },
    children: <Button size="s" mode="secondary" stretched onClick={() => setAppearance(appearance === "light" ? "dark" : "light")}>Сменить тему</Button>
  };

  return (
    <ConfigProvider platform={platform} appearance={appearance}>
      <SplitLayout style={{ justifyContent: "center", marginTop: "10px" }}>
        {isDesktop &&
          <SplitCol fixed width={menuWidth} maxWidth={menuWidth}>
            <Panel>
              {hasHeader && <PanelHeader />}
              <Group>
                {panels.map(panel =>
                  panel.showInMenu &&
                  <Cell
                    key={panel.id}
                    disabled={activeStory === panel.id}
                    style={panel.menuTriggers.includes(activeStory) ? {
                      backgroundColor: "var(--button_secondary_background)",
                      borderRadius: 8
                    } : {}}
                    data-story={panel.id}
                    onClick={() => go(panel.id)}
                    before={panel.menuIcon}
                  >
                    {panel.name}
                  </Cell>
                )}
              </Group>
              {bannerInfo !== {} &&
                <Group>
                  <SimpleCell disabled multiline before={<img src={bannerInfo.image} width={48} height={48} style={{ marginRight: "10px" }} />}>
                    {bannerInfo.text}
                  </SimpleCell>
                  <Spacing size={10} />
                  {bannerInfo.link != null ?
                    bannerInfo.additional === "link" ?
                      <Link href={bannerInfo.link.href} target="_blank">
                        {bannerInfo.link.button}
                      </Link>
                      : bannerInfo.children
                    : bannerInfo.children
                  }
                </Group>
              }
            </Panel>
          </SplitCol>
        }
        <SplitCol
          animate={true}
          spaced={isDesktop}
          width={isDesktop ? contentWidth : '100%'}
          maxWidth={isDesktop ? contentWidth : '100%'}
        >
          <Epic activeStory={activeStory} tabbar={isMobile && (
            <Tabbar>
              {panels.map(panel =>
                panel.showInMenu &&
                <TabbarItem
                  key={panel.id}
                  onClick={() => go(panel.id)}
                  selected={panel.menuTriggers.includes(activeStory)}
                  data-story={panel.id}
                  text={panel.name}
                >
                  {panel.menuIcon}
                </TabbarItem>
              )}
            </Tabbar>
          )}>
            {panels.map(panel =>
              <View
                id={panel.id}
                key={panel.id}
                activePanel={panel.id}
              >
                <Panel
                  id={panel.id}
                >
                  {panel.panelHeader}
                  {panel.component}
                </Panel>
              </View>
            )}
          </Epic>
        </SplitCol>
      </SplitLayout>
    </ConfigProvider>
  );
}

export default Home;
