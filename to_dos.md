- [ ] task 1

```js

// Define the date schema
const dateSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
}).refine(data => {
  const fromExists = Boolean(data.from);
  const toExists = Boolean(data.to);
  return (fromExists && toExists) || (!fromExists && !toExists);
}, {
  message: "Either both 'from' and 'to' must be present or both must be absent",
});

```
