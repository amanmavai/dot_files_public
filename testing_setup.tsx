import { render as rtlRender } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next'; // import i18next for mocking
import { theme } from 'your-theme-file'; // import your custom theme if any
import { store } from 'your-store-file'; // import your redux store

// Mock i18n setup
i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {}, // Empty or minimal translations for testing
      },
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

function setDesktopScreenSize() {
  window.innerWidth = 1024; // Set the screen width to desktop size (1024px or greater)
  window.dispatchEvent(new Event('resize')); // Dispatch the resize event to trigger re-render
}

function render(
  ui: React.ReactElement,
  {
    route = '/',
    initialState = {},
    ...renderOptions
  } = {}
) {
  setDesktopScreenSize(); // Ensure tests always run in desktop mode

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ReduxProvider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <ChakraProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              {children}
            </I18nextProvider>
          </ChakraProvider>
        </MemoryRouter>
      </ReduxProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
