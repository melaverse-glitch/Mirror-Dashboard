import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { Session } from '@/types/session';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sessionRef = db.collection('sessions').doc(id);
    const doc = await sessionRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const session: Session = {
      id: doc.id,
      ...doc.data(),
    } as Session;

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
