# Test Gallery API Endpoints

## Setup

1. Start dev server: `npm run dev`
2. Base URL: `http://localhost:3002/api/gallery`
3. Admin Password: `homa_admin_2024`

## Test Endpoints

### 1. GET /api/gallery (Public)

**cURL:**
```bash
curl http://localhost:3002/api/gallery
```

**Expected Response:**
```json
{
  "images": [
    {
      "id": "uuid",
      "filename": "1234567890-CHIRU1.jpg",
      "alt": "HOMA Clinic Gachibowli 1234567890 CHIRU1",
      "caption": "CHIRU1",
      "order": 0,
      "is_cover": false,
      "active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 2. POST /api/gallery/upload (Protected)

**cURL:**
```bash
curl -X POST http://localhost:3002/api/gallery \
  -H "Authorization: Bearer homa_admin_2024" \
  -F "file=@/path/to/CHIRU1.jpg" \
  -F "caption=Dr. Muddu with Chiranjeevi"
```

**Expected Response:**
```json
{
  "image": {
    "id": "uuid",
    "filename": "1234567890-CHIRU1.jpg",
    "alt": "HOMA Clinic Gachibowli 1234567890 CHIRU1",
    "caption": "Dr. Muddu with Chiranjeevi",
    "order": 1,
    "is_cover": false,
    "active": true,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Image uploaded successfully"
}
```

### 3. PATCH /api/gallery/[id] (Protected)

**cURL:**
```bash
curl -X PATCH http://localhost:3002/api/gallery/{id} \
  -H "Authorization: Bearer homa_admin_2024" \
  -H "Content-Type: application/json" \
  -d '{
    "alt": "Updated alt text",
    "caption": "Updated caption",
    "order": 5,
    "is_cover": true
  }'
```

**Expected Response:**
```json
{
  "image": {
    "id": "uuid",
    "filename": "1234567890-CHIRU1.jpg",
    "alt": "Updated alt text",
    "caption": "Updated caption",
    "order": 5,
    "is_cover": true,
    "active": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 4. DELETE /api/gallery/[id] (Protected)

**cURL:**
```bash
curl -X DELETE http://localhost:3002/api/gallery/{id} \
  -H "Authorization: Bearer homa_admin_2024"
```

**Expected Response:**
```json
{
  "message": "Gallery image deleted",
  "deletedFilename": "1234567890-CHIRU1.jpg"
}
```

### 5. POST /api/gallery/reorder (Protected)

**cURL:**
```bash
curl -X POST http://localhost:3002/api/gallery/reorder \
  -H "Authorization: Bearer homa_admin_2024" \
  -H "Content-Type: application/json" \
  -d '{
    "updates": [
      { "id": "uuid1", "order": 1 },
      { "id": "uuid2", "order": 2 }
    ]
  }'
```

**Expected Response:**
```json
{
  "message": "Images reordered successfully"
}
```

### 6. POST /api/gallery/[id]/set-cover (Protected)

**cURL:**
```bash
curl -X POST http://localhost:3002/api/gallery/{id}/set-cover \
  -H "Authorization: Bearer homa_admin_2024"
```

**Expected Response:**
```json
{
  "image": {
    "id": "uuid",
    "filename": "1234567890-CHIRU1.jpg",
    "is_cover": true,
    ...
  }
}
```

## Postman Collection

Import these requests into Postman:

1. **GET Gallery** - `GET http://localhost:3002/api/gallery`
2. **Upload Image** - `POST http://localhost:3002/api/gallery` (with file in form-data)
3. **Update Image** - `PATCH http://localhost:3002/api/gallery/{id}`
4. **Delete Image** - `DELETE http://localhost:3002/api/gallery/{id}`
5. **Reorder Images** - `POST http://localhost:3002/api/gallery/reorder`
6. **Set Cover** - `POST http://localhost:3002/api/gallery/{id}/set-cover`

## Test Checklist

- [ ] GET returns all active images ordered by `order`
- [ ] POST uploads file to `/public/images/` and creates DB entry
- [ ] PATCH updates alt, caption, order, is_cover
- [ ] DELETE removes DB entry and file from filesystem
- [ ] Reorder updates multiple images' order
- [ ] Set cover unsets all others and sets new one
- [ ] All protected routes require correct password
- [ ] All routes return proper JSON responses

