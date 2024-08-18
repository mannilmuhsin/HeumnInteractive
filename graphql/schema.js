const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Book {
    _id: ID!
    title: String!
    author: String!
    ISBN: String!
    publicationDate: String
    genre: String
    copies: Int!
  }

  type Borrow {
    _id: ID!
    user: User!
    book: Book!
    borrowDate: String!
    returnDate: String
  }

  type Query {
    users: [User!]!
    books: [Book!]!
    borrowHistory: [Borrow!]!
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User!
    addBook(title: String!, author: String!, ISBN: String!, publicationDate: String, genre: String, copies: Int!): Book!
    borrowBook(bookId: ID!): Borrow!
    returnBook(borrowId: ID!): Borrow!
  }
`);
