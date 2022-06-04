/**
 * В этом файле мы определяем платформу и тему. 
 * Меню и всё остальное выводятся в панели src/panels/Home.js
 * Сами панели лежат в src/panels/features
 * 
 * Здесь ничего трогать не нужно.
 */

import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Platform,
  VKCOM,
  usePlatform
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [activeStory, setActiveStory] = useState('home-panel');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(null);
  const [platform, setPlatform] = useState("vkcom");
  const platformname = (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  const platformwithPlat = usePlatform();
  const isMobile = platform !== VKCOM;
  const isDesktop = !isMobile;
  const hasHeader = platform !== VKCOM;
  const lights = ['bright_light', 'vkcom_light'];
  const [appearance, setAppearance] = useState('light');
  const [isLoading, setLoading] = useState(false);
  const [history, setHistory] = useState(['home-panel']);

  function useScheme(scheme, needChange = false) {
    let isLight = lights.includes(scheme);

    if (needChange) {
      isLight = !isLight;
    }
    console.log(isLight)
    setAppearance(isLight ? 'light' : 'dark');

    bridge.send('VKWebAppSetViewSettings', {
      'status_bar_style': isLight ? 'dark' : 'light',
      'action_bar_color': isLight ? '#000' : '#FFF'
    });
  }

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        useScheme(data.scheme)
      }
    });

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();

    setPlatform(platformname ? platformwithPlat : Platform.VKCOM);
  }, []);

  const go = (target) => {
    setLoading(true);
    window.history.pushState({ panel: target }, target);
    setActiveStory(target);
    setHistory([...history, target]);
  };

  const goBack = () => {
    if (history.length === 1) {
      bridge.send("VKWebAppClose", { "status": "success" });
    } else if (history.length > 1) {
      history.pop();
      setActiveStory(history[history.length - 1]);
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', () => goBack());
  })

  return (
    <ConfigProvider appearance={appearance} platform={platform}>
      <AdaptivityProvider>
        <AppRoot>
          <View activePanel={activePanel} history={history} onSwipeBack={goBack} popout={popout}>
            <Home
              activeStory={activeStory}
              appearance={appearance}
              fetchedUser={fetchedUser}
              go={go}
              hasHeader={hasHeader}
              isDesktop={isDesktop}
              isLoading={isLoading}
              isMobile={isMobile}
              platform={platform}
              setAppearance={setAppearance}
              setLoading={setLoading}
              setPopout={setPopout}
            />
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
