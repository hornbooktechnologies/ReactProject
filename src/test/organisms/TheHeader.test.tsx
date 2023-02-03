import TheHeader from '../../components/organisms/TheHeader';
import renderer from 'react-test-renderer'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18nForTests'

describe('Component: TheHeader', () => {

    it('TheHeader renders correctly', () => {
        const tree = renderer.create(
            <I18nextProvider i18n={i18n}> // actually give translation to your component
                <TheHeader />
            </I18nextProvider>
        ).toJSON()
        expect(tree).toBeDefined();
    })

});


