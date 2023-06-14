import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getJira(): Promise<any> {
    const url = 'https://ari-us.atlassian.net/rest/agile/1.0/board/3/issue';
    const headers = {
      Authorization:
        'Basic TWluaGF6dWwuSGFzYW5AYnJhaW5zdGF0aW9uLTIzLmNvbTpBVEFUVDN4RmZHRjA1SFpvcVBRMFpqaEhqemU2UkdBc1BoSDNycTVJXzFJdjhZa2g4dDJEN053NHdwaWhPalJOX0R0RjlKREhHcmRGSm1ScVBQRW1FdmlWbEtjRE9VS05fWFN1MTFld0QwbXBfYmdlMTc2eElmZTN1aXlnckg0OV8xLWFMLUdUcUhFSTN2SDhyUURxZmxYSnZPakQ3eDRGM18xWjVPTzM3MjFEM2NoaDZubnlGZlk9RjMwRjBBNDA=',
      Cookie:
        'atlassian.xsrf.token=6636e62f-8a68-42e7-9f30-6d4eff66797a_9f1c07ec8f6e25584d28b76526517d0e331d19d1_lin',
    };

    try {
      const response = await axios.get(url, { headers });
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
