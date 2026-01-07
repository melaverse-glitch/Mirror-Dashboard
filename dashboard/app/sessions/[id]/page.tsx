import SessionDetail from '@/components/SessionDetail';

interface SessionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params;
  return <SessionDetail sessionId={id} />;
}
