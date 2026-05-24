# TODO

- [ ] Fix AddProduct form submit timing bug: do not call `setProduct` then immediately dispatch with stale `product`.
- [ ] Pass correct payload to `dispatch(add_product(...))` including `images` and `sellerId`.
- [ ] Remove unused/incorrect `images: ""` default from initial state (set to `[]`).
- [ ] Add pending/fulfilled/rejected reducers for `add_product` in productReducer to avoid silent failures.
- [ ] Keep slice name/state consistent (use product slice instead of auth naming).
- [ ] Run `npm test`/`npm run dev` (or equivalent) / manual check: submit product and verify FormData fields are present.

