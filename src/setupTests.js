import Enzyme from 'enzyme'; /* eslint-disable-line */
import Adapter from 'enzyme-adapter-react-16'; /* eslint-disable-line */

// @ts-ignore
Enzyme.configure({ adapter: new Adapter() });
