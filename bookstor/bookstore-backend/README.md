# Bookstore Backend (Node.js + Express + MongoDB)

CRUD, searching, filtering, sorting and pagination - backend only.

## Setup
```bash
npm install
cp .env.example .env     # MONGO_URI check kar le
npm run seed             # optional: 12 sample books
npm run dev              # http://localhost:5000
```

## Endpoints
| Method | URL | Kaam |
|---|---|---|
| POST | /api/books | Book add |
| GET | /api/books | Badhi books (search/sort/pagination) |
| GET | /api/books/:id | Ek book |
| PUT | /api/books/:id | Update |
| DELETE | /api/books/:id | Delete |

## Query params (GET /api/books)
| Param | Example | Meaning |
|---|---|---|
| search | `search=harry` | title ya author ma search |
| genre | `genre=fiction` | genre filter |
| author | `author=rowling` | author filter |
| minPrice / maxPrice | `minPrice=200&maxPrice=500` | price range |
| sort | `sort=price` | title, author, price, stock, publishedYear, createdAt |
| order | `order=asc` | asc / desc |
| page, limit | `page=2&limit=5` | pagination (max limit 100) |

Example:
`GET /api/books?search=the&genre=fiction&sort=price&order=asc&page=1&limit=5`

## Sample POST body
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help",
  "price": 499,
  "stock": 20,
  "publishedYear": 2018,
  "isbn": "9780735211292"
}
```
