import React, { useState, useEffect } from "react";

export default function Instructor({ user, onLogout }) {
  const [lectures, setLectures] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLectures();
  }, []);

  async function fetchLectures() {
    const res = await fetch("https://online-lecture-scheduling-iq89.onrender.com/api/lectures", {
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) {
      const data = await res.json();
      setLectures(data);
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const upcomingLectures = lectures.filter((l) => l.date >= today);
  const pastLectures = lectures.filter((l) => l.date < today);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b-2 border-stone-900">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-stone-900">INSTRUCTOR</h1>
            <p className="text-sm font-bold text-stone-600 mt-1">{user.name}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-5 py-2 bg-stone-900 text-white font-bold text-sm hover:bg-stone-700 transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-2 border-stone-900 p-6">
            <div className="text-4xl font-black text-stone-900">
              {lectures.length}
            </div>
            <div className="text-sm font-bold text-stone-600 mt-1">
              TOTAL LECTURES
            </div>
          </div>
          <div className="bg-white border-2 border-stone-900 p-6">
            <div className="text-4xl font-black text-stone-900">
              {upcomingLectures.length}
            </div>
            <div className="text-sm font-bold text-stone-600 mt-1">
              UPCOMING
            </div>
          </div>
          <div className="bg-white border-2 border-stone-900 p-6">
            <div className="text-4xl font-black text-stone-900">
              {lectures.reduce((sum, l) => sum + (l.numberOfBatches || 0), 0)}
            </div>
            <div className="text-sm font-bold text-stone-600 mt-1">
              TOTAL BATCHES
            </div>
          </div>
        </div>

        {upcomingLectures.length > 0 && (
          <div className="bg-white border-2 border-stone-900 mb-8 overflow-hidden">
            <div className="bg-stone-900 text-white px-6 py-4">
              <h2 className="text-xl font-black">UPCOMING LECTURES</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {upcomingLectures.map((l) => (
                  <div
                    key={l._id}
                    className="border-2 border-stone-200 p-4 hover:border-stone-900 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-stone-900">
                          {l.course?.name}
                        </h3>
                        <p className="text-xs font-bold text-stone-500 mt-1">
                          Course
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-stone-900 bg-stone-200 px-3 py-1 inline-block">
                          {new Date(l.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-stone-100 border-l-4 border-stone-900 px-3 py-2 flex-1">
                        <span className="text-xs font-black text-stone-700">
                          BATCHES: {l.numberOfBatches || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {pastLectures.length > 0 && (
          <div className="bg-white border-2 border-stone-900 overflow-hidden">
            <div className="bg-stone-700 text-white px-6 py-4">
              <h2 className="text-xl font-black">PAST LECTURES</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {pastLectures.map((l) => (
                  <div
                    key={l._id}
                    className="border-2 border-stone-200 p-4 opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-stone-700">
                          {l.course?.name}
                        </h3>
                        <p className="text-xs font-bold text-stone-500 mt-1">
                          Course
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-stone-700 bg-stone-200 px-3 py-1 inline-block">
                          {new Date(l.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-stone-100 border-l-4 border-stone-400 px-3 py-2 flex-1">
                        <span className="text-xs font-black text-stone-600">
                          BATCHES: {l.numberOfBatches || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {lectures.length === 0 && (
          <div className="bg-white border-2 border-stone-900 p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-black text-stone-900 mb-2">
              NO LECTURES YET
            </h3>
            <p className="text-sm font-bold text-stone-600">
              Your scheduled lectures will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
