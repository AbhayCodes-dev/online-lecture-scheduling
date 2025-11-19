import React, { useState, useEffect } from "react";

export default function Admin({ user, onLogout }) {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);

  const [form, setForm] = useState({
    name: "",
    level: "",
    description: "",
    imageUrl: "",
  });
  const [lectureForm, setLectureForm] = useState({
    courseId: "",
    instructorId: "",
    date: "",
    numberOfBatches: 1,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const headers = { Authorization: "Bearer " + token };
    const ri = await fetch("http://localhost:5000/api/instructors", {
      headers,
    });
    if (ri.ok) setInstructors(await ri.json());

    const rc = await fetch("http://localhost:5000/api/courses", { headers });
    if (rc.ok) setCourses(await rc.json());

    const rl = await fetch("http://localhost:5000/api/lectures", { headers });
    if (rl.ok) setLectures(await rl.json());
  }

  async function addCourse() {
    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.msg || "Error creating course");
      setCourses([data, ...courses]);
      setForm({ name: "", level: "", description: "", imageUrl: "" });
    } catch (err) {
      alert("Error creating course");
    }
  }

  async function addLecture() {
    try {
      if (
        !lectureForm.courseId ||
        !lectureForm.instructorId ||
        !lectureForm.date ||
        !lectureForm.numberOfBatches
      ) {
        return alert(
          "Please fill course, instructor, date and number of batches"
        );
      }
      const body = {
        courseId: lectureForm.courseId,
        instructorId: lectureForm.instructorId,
        date: lectureForm.date,
        numberOfBatches: parseInt(lectureForm.numberOfBatches, 10),
      };
      const res = await fetch("http://localhost:5000/api/lectures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok)
        return alert(
          data.msg || "Error scheduling lecture: " + JSON.stringify(data)
        );
      await fetchData();
      setLectureForm({
        courseId: "",
        instructorId: "",
        date: "",
        numberOfBatches: 1,
      });
      alert(data.msg || "Scheduled");
    } catch (err) {
      alert("Error scheduling lecture");
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b-2 border-stone-900">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-black text-stone-900">ADMIN</h1>
          <button
            onClick={onLogout}
            className="px-5 py-2 bg-stone-900 text-white font-bold text-sm hover:bg-stone-700 transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white border-2 border-stone-900 mb-8 overflow-hidden">
          <div className="bg-stone-900 text-white px-6 py-4">
            <h2 className="text-xl font-black">CREATE COURSE</h2>
          </div>
          <div className="p-6 space-y-4">
            <input
              placeholder="Course Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 placeholder-stone-400"
            />
            <input
              placeholder="Level (e.g., Beginner, Intermediate)"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 placeholder-stone-400"
            />
            <input
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 placeholder-stone-400"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 placeholder-stone-400 resize-none"
            />
            <button
              onClick={addCourse}
              className="w-full bg-stone-900 text-white py-3 font-black text-sm hover:bg-stone-700 transition-colors"
            >
              ADD COURSE
            </button>
          </div>
        </div>

        <div className="bg-white border-2 border-stone-900 mb-8 overflow-hidden">
          <div className="bg-stone-900 text-white px-6 py-4">
            <h2 className="text-xl font-black">SCHEDULE LECTURE</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-black text-stone-900 mb-2 tracking-wide">
                COURSE
              </label>
              <select
                value={lectureForm.courseId}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, courseId: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 bg-white"
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-stone-900 mb-2 tracking-wide">
                INSTRUCTOR
              </label>
              <select
                value={lectureForm.instructorId}
                onChange={(e) =>
                  setLectureForm({
                    ...lectureForm,
                    instructorId: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 bg-white"
              >
                <option value="">Select Instructor</option>
                {instructors.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-stone-900 mb-2 tracking-wide">
                DATE
              </label>
              <input
                type="date"
                value={lectureForm.date}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, date: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-stone-900 mb-2 tracking-wide">
                NUMBER OF BATCHES
              </label>
              <input
                type="number"
                min="1"
                placeholder="Number of Batches"
                value={lectureForm.numberOfBatches}
                onChange={(e) =>
                  setLectureForm({
                    ...lectureForm,
                    numberOfBatches: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 placeholder-stone-400"
              />
            </div>

            <button
              onClick={addLecture}
              className="w-full bg-stone-900 text-white py-3 font-black text-sm hover:bg-stone-700 transition-colors"
            >
              ADD LECTURE
            </button>
          </div>
        </div>

        <div className="bg-white border-2 border-stone-900 mb-8 overflow-hidden">
          <div className="bg-stone-900 text-white px-6 py-4">
            <h2 className="text-xl font-black">ALL COURSES</h2>
          </div>
          <div className="p-6">
            {courses.length === 0 ? (
              <p className="text-stone-500 font-bold">No courses yet</p>
            ) : (
              <div className="space-y-4">
                {courses.map((c) => (
                  <div
                    key={c._id}
                    className="border-2 border-stone-200 p-4 flex gap-4 hover:border-stone-400 transition-colors"
                  >
                    {c.imageUrl ? (
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="w-32 h-20 object-cover border-2 border-stone-900"
                      />
                    ) : (
                      <div className="w-32 h-20 bg-stone-200 border-2 border-stone-900 flex items-center justify-center">
                        <span className="text-stone-400 font-bold text-xs">
                          NO IMAGE
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-stone-900">
                        {c.name}
                      </h3>
                      <p className="text-xs font-bold text-stone-500 mb-2">
                        {c.level}
                      </p>
                      <p className="text-sm text-stone-700">{c.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border-2 border-stone-900 overflow-hidden">
          <div className="bg-stone-900 text-white px-6 py-4">
            <h2 className="text-xl font-black">ALL LECTURES</h2>
          </div>
          <div className="p-6">
            {lectures.length === 0 ? (
              <p className="text-stone-500 font-bold">No lectures scheduled</p>
            ) : (
              <div className="space-y-3">
                {lectures.map((l) => (
                  <div
                    key={l._id}
                    className="border-2 border-stone-200 p-4 hover:border-stone-400 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-black text-stone-900">
                          {l.course?.name}
                        </h3>
                        <p className="text-sm font-bold text-stone-600">
                          {l.instructor?.name}
                        </p>
                      </div>
                      <span className="text-sm font-black text-stone-900 bg-stone-200 px-3 py-1">
                        {l.date}
                      </span>
                    </div>
                    <div className="bg-stone-100 border-l-4 border-stone-900 px-3 py-2">
                      <span className="text-xs font-black text-stone-700">
                        BATCHES: {l.numberOfBatches || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
