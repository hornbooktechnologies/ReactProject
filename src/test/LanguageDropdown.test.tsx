import LanguageDropdown from '../components/views/pages/login/LanguageDropdown';
import renderer from 'react-test-renderer'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18nForTests'

describe('Component: LanguageDropdown', () => {

    it('LanguageDropdown renders correctly', () => {
        const tree = renderer.create(
            <I18nextProvider i18n={i18n}>
                <LanguageDropdown />
            </I18nextProvider>
        ).toJSON()
        expect(tree).toBeDefined();
    })

});


