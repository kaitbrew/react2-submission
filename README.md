# Needle & Groove Records App

## Description

A single-page application for "Needle & Groove Records" independent vinyl record store specializing in alternative, rock, and rare vinyl finds.

## Features

- Home page with store information
- Shop page with searchable, responsive grid of albums
- Admin portal for creating, editing & deleting album entries

## Component Architecture

```
src/
├── api/
│     └── Albums.js            # fetch/post/patch wrappers using native fetch
├── components/
│     ├── NavBar/
│     │     └── NavBar.jsx     # navigation links
│     ├── StoreBanner/
│     │     ├── StoreBanner.jsx  # home page header, fetches store_info
│     │     └── StoreBanner.module.css
│     ├── ShopPage/
│     │     ├── ShopPage.jsx     # fetches albums, handles search
│     │     └── ShopPage.module.css
│     ├── FilterSidebar/
│     │     ├── FilterSidebar.jsx# search input component
│     │     └── FilterSidebar.module.css
│     ├── ProductGrid/
│     │     ├── ProductGrid.jsx  # grid layout
│     │     └── ProductGrid.module.css
│     ├── ProductCard/
│     │     ├── ProductCard.jsx  # individual album card
│     │     └── ProductCard.module.css
│     ├── AdminPortal/
│     │     ├── AdminPortal.jsx  # renders create & edit forms
│     │     └── AdminPortal.module.css
│     ├── ProductForm/
│     │     ├── ProductForm.jsx   # create-album form
│     │     └── ProductForm.module.css
│     ├── EditAlbumForm/
│     │     ├── EditAlbumForm.jsx # edit-album form
│     │     └── EditAlbumForm.module.css
│     ├── TextInput/
│     └── SubmitButton/
└── hooks/
      ├── useFetch.js           # custom fetch hook (data, loading, error)
      └── useFormFields.js      # form-state management hook
```

## Tech Stack

- **Build & Bundler:** Vite
- **Frontend:** React, React Router
- **Styling:** CSS Modules, Material-UI (MUI)
- **Mock API:** json-server
- **Testing:** Vitest, React Testing Library

## Getting Started

### Clone the repo

```bash
git clone <repo-url>
cd react2-submission
```

### Install dependencies

```bash
npm install
```

### Run the mock API server

```bash
npm run server
# serves db.json at http://localhost:4000
```

### Run the development server

```bash
npm run dev
# open http://localhost:5173
```

### Execute all tests

```bash
npm test
```

## CRUD Functionality & Testing

### 1. Read (GET)

**API:**
- `fetchAlbums()` and `fetchStoreInfo()` in `src/api/Albums.js`
- All GET logic is wrapped by the `useFetch` hook.

**UI:**
- **Home:** StoreBanner loads `store_info/1` and displays name, description, phone.
- **Shop:** ShopPage loads `/albums`, renders ProductGrid and FilterSidebar.

**Tests:**
- useFetch tests stub `global.fetch` to simulate 200 and error responses, verify loading → success → error flows.
- ShopPage test mocks useFetch to return an array of albums, renders the grid, types into the search box, and asserts that the list filters correctly.

**Challenges & Solutions:**
- *Hanging real fetch:* default `fetch()` never resolves in JSDOM → stub `global.fetch` in tests.
- *Hook-mock ordering:* if useFetch is imported before the mock is applied, the real fetch runs → hoist `vi.mock('../hooks/useFetch')` to top of test files.

### 2. Create (POST)

**API:**
- `createAlbum(album)` posts to `/albums` with JSON body.

**UI:**
- ProductForm controlled form with `useFormFields` hook; validates inputs, shows error/success messages.

**Tests:**
- ProductForm tests spy on `createAlbum`, render the form, leave fields empty to trigger validation errors, fill in valid data, click submit, and assert that `createAlbum` was called with the correct object and that the success message appears.

**Challenges & Solutions:**
- *Module exports immutable:* assigning `api.createAlbum = vi.fn()` throws "only a getter" → use `vi.spyOn(api, 'createAlbum')`.
- *Asynchronous form state:* using `getByText` immediately sometimes races → use `findByText` or wrap assertions in `waitFor()`.

### 3. Update (PATCH)

**API:**
- `updateAlbum(id, updates)` issues `PATCH /albums/:id`.

**UI:**
- EditAlbumForm fetches a single album, populates fields, validates edits, and calls `updateAlbum` on submit.

**Tests:**
- EditAlbumForm tests stub the GET fetch, spy on `api.updateAlbum`, render the form, change a field, click "Update Album," and assert that `updateAlbum` was called with the right arguments and that the success message and `onUpdated` callback fire.

**Challenges & Solutions:**
- *Hook import timing:* mocked hook must be in place before component import → use top-of-file `vi.mock('../hooks/useFetch')` or `vi.spyOn(fetchHook, 'default')`.
- *Input value assertion:* asserting too early fails → use `findByDisplayValue` or `waitFor()`.

### 4. Delete (DELETE)

**API:**
- `deleteAlbum(id)` issues `DELETE /albums/:id`.

**UI:**
- In EditAlbumForm, a "Delete Album" button calls `deleteAlbum`, displays a deletion success message, and triggers the `onUpdated` callback to refresh the list.

**Tests:**
- EditAlbumForm delete test stubs the GET fetch, spies on `api.deleteAlbum`, clicks the "Delete Album" button, and asserts `deleteAlbum` was called with the correct ID, the callback fired, and the "Album deleted successfully!" message appears.

**Challenges & Solutions:**
- *Ensuring spy on deleteAlbum:* use `vi.spyOn(api, 'deleteAlbum')` in `beforeEach` so the function is a spy.
- *Waiting for callback:* wrap `expect(api.deleteAlbum).toHaveBeenCalledWith(...)` in `await waitFor()` to catch the async call.