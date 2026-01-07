"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@/types/session';
import StarRating from './StarRating';
import { Calendar, ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function SessionsList() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const router = useRouter();
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sessions.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, sessions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (sessions[selectedIndex]) {
          router.push(`/sessions/${sessions[selectedIndex].id}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sessions, selectedIndex, router]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sessions');
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
      const data = await response.json();
      setSessions(data.sessions);
      if (data.sessions.length > 0) {
        setSelectedIndex(0);
      }
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

  const handleSessionClick = (sessionId: string) => {
    router.push(`/sessions/${sessionId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Error loading sessions</p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button
            onClick={fetchSessions}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No sessions found</p>
          <p className="text-gray-500 text-sm mt-2">Sessions will appear here once users start trying on makeup</p>
        </div>
      </div>
    );
  }

  const selectedSession = sessions[selectedIndex];

  return (
    <div className="h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-2">Sessions Dashboard</h1>
        <p className="text-gray-400">Use arrow keys to navigate • Enter to open • Click for details</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left side - Sessions Table */}
        <div className="w-3/5 border-r border-gray-800 overflow-auto" ref={tableRef}>
          <div className="bg-gray-800/50">
            <table className="w-full">
              <thead className="bg-gray-900/50 border-b border-gray-700 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Session ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Try-ons
                  </th>
                  {/* Hidden status column - uncomment to show */}
                  {/* <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th> */}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sessions.map((session, index) => (
                  <tr
                    key={session.id}
                    onClick={() => handleSessionClick(session.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-purple-900/30 border-l-4 border-l-purple-500'
                        : 'hover:bg-gray-700/50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-mono text-gray-300">{session.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {formatDate(session.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-300">
                        {session.foundationTryons.length}
                      </span>
                    </td>
                    {/* Hidden status column - uncomment to show */}
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          session.status === 'active'
                            ? 'bg-green-900/50 text-green-300 border border-green-700'
                            : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                        }`}
                      >
                        {session.status}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StarRating rating={session.rating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side - Preview Pane */}
        <div className="w-2/5 bg-gray-900/50 overflow-auto">
          {selectedSession ? (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Preview</h2>
                <p className="text-sm text-gray-400 font-mono">Session {selectedSession.id}</p>
              </div>

              {/* Side-by-side images */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Original Image */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Original
                  </h3>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                    <Image
                      src={selectedSession.originalImageUrl}
                      alt="Original"
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                </div>

                {/* Derendered Image */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Derendered
                  </h3>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                    <Image
                      src={selectedSession.derenderedImageUrl}
                      alt="Derendered"
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-400">Foundation Try-ons:</span>
                  <span className="text-white font-medium">{selectedSession.foundationTryons.length}</span>
                </div>
                <button
                  onClick={() => handleSessionClick(selectedSession.id)}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  View Full Details
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a session to preview</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-3 border-t border-gray-800 text-center text-gray-500 text-sm">
        Showing {sessions.length} session{sessions.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
