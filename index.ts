import 'dotenv/config';
import Application from '~/infrastructure/bootstrap/application';
import useContainer from '~/infrastructure/hooks/dependencies.hook';

const container = useContainer();
const app = new Application(container);
app.run();
