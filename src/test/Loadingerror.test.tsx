import React from 'react';
import i18n from './i18nForTests' // your i18n config file
import { render, screen } from '@testing-library/react';
import LoadingError from './../components/common/LoadingError';
import { I18nextProvider } from 'react-i18next'

test('renders all documents in the list', () => {
    const c = render(
      <I18nextProvider i18n={i18n}> // actually give translation to your component
         <LoadingError />
      </I18nextProvider>
    );
    expect(() => c.getByText(i18n.t('LABELS.FAILED_LOAD_DATA'))).toBeDefined();
});