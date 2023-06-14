import { Injectable } from '@nestjs/common';
import axios from 'axios';

const auth =
  'Basic TWluaGF6dWwuSGFzYW5AYnJhaW5zdGF0aW9uLTIzLmNvbTpBVEFUVDN4RmZHRjA1SFpvcVBRMFpqaEhqemU2UkdBc1BoSDNycTVJXzFJdjhZa2g4dDJEN053NHdwaWhPalJOX0R0RjlKREhHcmRGSm1ScVBQRW1FdmlWbEtjRE9VS05fWFN1MTFld0QwbXBfYmdlMTc2eElmZTN1aXlnckg0OV8xLWFMLUdUcUhFSTN2SDhyUURxZmxYSnZPakQ3eDRGM18xWjVPTzM3MjFEM2NoaDZubnlGZlk9RjMwRjBBNDA=';

@Injectable()
export class AppService {
  async getJira(): Promise<any> {
    const url = 'https://ari-us.atlassian.net/rest/agile/1.0/board/3/issue';
    const headers = {
      Authorization: auth,
      Cookie:
        'atlassian.xsrf.token=6636e62f-8a68-42e7-9f30-6d4eff66797a_9f1c07ec8f6e25584d28b76526517d0e331d19d1_lin',
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async createIssue(createData: object): Promise<any> {
    let data = JSON.stringify(createData);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ari-us.atlassian.net/rest/api/2/issue',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
        Cookie:
          'atlassian.xsrf.token=6636e62f-8a68-42e7-9f30-6d4eff66797a_9f1c07ec8f6e25584d28b76526517d0e331d19d1_lin',
      },
      data: data,
    };

    return await axios
      .request(config)
      .then((response) => {
        let data = JSON.stringify(response.data);

        return data;
      })
      .catch((error) => {
        return error;
      });
  }
}
