import axios from 'axios';
import {CONFIG} from '../config';

type Category = '[CV]' | '[offer]' | '[discussion]' | '[spam]';

export async function categorizeMessage(message: string): Promise<Category> {
  const {data, status} = await axios.post<Category>(
    CONFIG.services.agent.url + '/api/message/categorize',
    {message}
  );
  if (status === 200) {
    return data;
  }
  throw new Error('Unable to categorize message');
}
