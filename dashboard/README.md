# MIRROR Dashboard

Admin dashboard for managing and viewing makeup try-on sessions from the MIRROR application.

## Features

- **Sessions List View**: Browse all makeup try-on sessions with sortable columns
- **Session Details**: View all images from a specific session including:
  - Original uploaded image
  - Derendered (no makeup) image
  - All foundation try-on results with shade details
- **5-Star Rating Display**: Empty rating component ready for future integration
- **Dark Theme UI**: Sleek, modern interface optimized for admin use
- **Image Lightbox**: Click any image to view full-size

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Firebase Admin SDK** (Firestore + Cloud Storage)
- **lucide-react** (Icons)

## Setup Instructions

### 1. Environment Variables

Copy the example environment file and fill in your Firebase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase project credentials:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=melaleuca-mirror.firebasestorage.app
```

**Where to find these credentials:**
1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate New Private Key"
3. Copy the values from the downloaded JSON file

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dashboard/
├── app/
│   ├── api/
│   │   └── sessions/
│   │       ├── route.ts              # GET all sessions
│   │       └── [id]/route.ts         # GET single session
│   ├── sessions/
│   │   └── [id]/page.tsx             # Session detail page
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Home page (sessions list)
│   └── globals.css                    # Global styles
├── components/
│   ├── SessionsList.tsx               # Sessions list component
│   ├── SessionDetail.tsx              # Session detail component
│   └── StarRating.tsx                 # 5-star rating component
├── lib/
│   └── firebaseAdmin.ts               # Firebase Admin setup
└── types/
    └── session.ts                     # TypeScript types
```

## Data Structure

### Session Document (Firestore)

```typescript
{
  id: string;                          // Session ID (timestamp)
  createdAt: number;                   // Unix timestamp
  originalImageUrl: string;            // URL to original image
  derenderedImageUrl: string;          // URL to derendered image
  foundationTryons: [                  // Array of try-ons
    {
      appliedAt: number;               // Unix timestamp
      sku: string;                     // Foundation SKU
      name: string;                    // Foundation name
      hex: string;                     // Color hex code
      undertone: string;               // warm | neutral | cool
      resultImageUrl: string;          // URL to result image
    }
  ];
  status: string;                      // active | completed
  rating?: number;                     // 0-5 (optional)
}
```

### Cloud Storage Structure

```
sessions/
  {sessionId}/
    original.jpg
    derendered.jpg
    foundation-{sku}-{timestamp}.jpg
    foundation-{sku}-{timestamp}.jpg
    ...
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Local Production Build

```bash
npm run build
npm start
```

## Future Enhancements

- [ ] Interactive star rating (save to Firestore)
- [ ] Authentication/Authorization
- [ ] Search and filter sessions
- [ ] Pagination for large datasets
- [ ] Export session data
- [ ] Session deletion
- [ ] Analytics dashboard
- [ ] Real-time updates

## License

Private project for internal use.
