# Gutendex

Gutendex is a React/Vite app for browsing public-domain books from the
Gutendex API. The app lets users search for books, filter by category, move
through paginated results, open a detail page for each book, and save favorite
books locally in the browser.

The project uses React Router for navigation, TanStack Query for API fetching
and caching, CSS modules for component styling, and localStorage to keep
favorites available after a page refresh.

## Suggested reading order

If you are reading the code to understand how the app works, this order follows
the flow of the application from startup to UI behavior:

1. `src/main.jsx` - See where React starts, how global providers wrap the app,
   and how the development-only request monitor works.
2. `src/routes.jsx` and `src/App.jsx` - See how React Router chooses pages and
   where child routes render through `<Outlet />`.
3. `src/State/*.jsx` - Read the context providers next. These files explain the
   shared state for category, search, page number, favorites, and the mobile
   menu.
4. `src/Logic/queryClient.js` - Understand how TanStack Query is configured,
   cached, and persisted to localStorage.
5. `src/Logic/bookQueries.js` - Read the API hooks after the query client. This
   is where Gutendex requests, query keys, loading states, and prefetching come
   together.
6. `src/Pages/HomePage.jsx` - See how API results and local favorites become
   the book grid shown on the main page.
7. `src/Components/Header.jsx` and the files in `src/Components` - Follow the
   controls for search, category filters, pagination, navigation, reset, and
   favorites.
8. `src/Pages/BookDetails.jsx` and `src/Pages/AboutPage.jsx` - Finish with the
   secondary pages that use the shared layout and query patterns.
9. `src/index.css` and `src/styles/*.css` - Read the styles last, once you know
   which components use each class.
