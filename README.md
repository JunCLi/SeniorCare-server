# Server-Graphql-Apollo-BP
A server boilerplate for using graphql with postgres and apolloclient

## How to use
### Postgres configurations
1. In 'configure/development.js', change schema name from 'boilerplate' to desired postgres schema name.
2. If using different postgres credentials, change host, user, and password from 'localhost', 'postgres', and 'root' to appropriate postgres credentials. 
3. Update postgres schema tables in 'migrations/createPostgresSchema.js'.

### Seeding configurations
1. Import seeds as arrays of objects in 'seeds/configureSeeds.js'.
2. Inside promise.all, map through array, change 'boilerplate.users' to desired postgres schema and table. ex. 'my_app.items'.

### Datasources
1. Change or add datasources inside 'datasources/'. Replace 'datasources/placeholderApi.js' and 'datasources/placeholderDatabase' as appropriate.
2. Add datasources to context inside 'datasources/datasources.js'.

### Resolvers
1. Change or add resolvers inside 'resolvers/'.
2. Add resolvers to context inside of 'resolvers/resolvers.js' using the spread operator.

### Schema
1. Change or add graphql schemas inside of 'graphqlSchema/'.
2. Query and Mutation types must be extended.
3. Add Schema modules to context inside 'graphqlSchema/typeDefs.js' by placing inside the array.

### Cookies
1. In 'utils/authentication/configureAuth.js', change cookieName and cookieSigniture as appropriate
2. Create and set cookies using the functions in 'utils/authentication/setCookie.js'.
3. The second argument the createCookie is the number of hours you want the cookie to last.