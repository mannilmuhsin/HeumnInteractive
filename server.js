const express = require('express');
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const userRoutes = require('./routes/userRoutes');
const { protect } = require('./middlewares/authMiddleware');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/users', userRoutes);

app.use('/graphql', protect, graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
