import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { Session } from '@/types/session';

export async function GET() {
  try {
    const sessionsRef = db.collection('sessions');
    const snapshot = await sessionsRef.orderBy('createdAt', 'desc').get();

    if (snapshot.empty) {
      return NextResponse.json({ sessions: [] });
    }

    const sessions: Session[] = [];
    snapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data(),
      } as Session);
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
