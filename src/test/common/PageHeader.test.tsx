import PageHeader from '../../components/common/PageHeader';
import renderer from 'react-test-renderer'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18nForTests'

describe('Component: PageHeader', () => {

    it('PageHeader renders correctly', () => {
        const tree = renderer.create(
            <I18nextProvider i18n={i18n}>
                <PageHeader />
            </I18nextProvider>
        ).toJSON()
        expect(tree).toBeDefined();
    })

});


