import { Server } from '@hapi/hapi';
import { gql } from '@redware/postgraphile-orm';

interface Context {
  server: Server;
  key: string;
}
export default {
  register: ({ server, key }: Context) => {
    //
    const { setFragment } = server.app.postgraphile;

    setFragment(key, 'default', {
      query: gql`
        {
          id
          code
          name
          number
        }
      `,
      variables: {}
    });

    setFragment(key, 'single', {
      query: gql`
        {
          id
          code
          name
          number
          costCenter {
            id
            code
            name
          }
        }
      `,
      variables: {}
    });

    setFragment(key, 'edit', {
      query: gql`
        {
          id
          code
          name
          number
          costCenterId: costCenter {
            id
            code
            name
          }
        }
      `,
      variables: {}
    });
  }
};
