"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@/types/session';
import StarRating from './StarRating';
import { ArrowLeft, Calendar, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface SessionDetailProps {
  sessionId: string;
}

export default function SessionDetail({ sessionId }: SessionDetailProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/sessions/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch session');
      }
      const data = await response.json();
      setSession(data.session);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Error loading session</p>
          <p className="text-gray-400 text-sm">{error || 'Session not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Back to Sessions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sessions
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Session {session.id}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(session.createdAt)}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  session.status === 'active'
                    ? 'bg-green-900/50 text-green-300 border border-green-700'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                }`}>
                  {session.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 mb-2">Rating</p>
              <StarRating rating={session.rating} size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Original & Derendered Images */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Original & Derendered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="group relative">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                <Image
                  src={session.originalImageUrl}
                  alt="Original"
                  fill
                  className="object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedImage(session.originalImageUrl)}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-300">Original Image</p>
                <span className="text-xs text-gray-500 font-mono">{session.originalMimeType}</span>
              </div>
            </div>

            {/* Derendered Image */}
            <div className="group relative">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                <Image
                  src={session.derenderedImageUrl}
                  alt="Derendered"
                  fill
                  className="object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedImage(session.derenderedImageUrl)}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-300">Derendered (No Makeup)</p>
                <span className="text-xs text-gray-500 font-mono">{session.derenderedMimeType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Foundation Try-ons */}
        {session.foundationTryons.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Foundation Try-ons ({session.foundationTryons.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {session.foundationTryons.map((tryon, index) => (
                <div key={index} className="group relative">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                    <Image
                      src={tryon.resultImageUrl}
                      alt={tryon.name}
                      fill
                      className="object-cover cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedImage(tryon.resultImageUrl)}
                    />
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-300">{tryon.name}</p>
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-600"
                        style={{ backgroundColor: tryon.hex }}
                        title={tryon.hex}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="capitalize">{tryon.undertone} undertone</span>
                      <span className="font-mono">{tryon.sku}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {formatDate(tryon.appliedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700 border-dashed">
            <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No foundation try-ons yet</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Full size"
              width={1200}
              height={1600}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
