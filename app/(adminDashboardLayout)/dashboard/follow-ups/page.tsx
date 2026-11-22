"use client";

import React, { useState } from "react";
import { Clock, CheckCircle2, Phone, Calendar, Plus } from "lucide-react";

export default function FollowUpsPage() {
  const [tasks, setTasks] = useState([
    {
      id: "f-1",
      customer: "Samiul Rahman",
      phone: "01712345678",
      orderId: "#NX-10482",
      task: "Check product satisfaction 7 days after delivery of HOCO headphones",
      dueDate: "Today (Due)",
      status: "DUE",
    },
    {
      id: "f-2",
      customer: "Farhan Tanvir",
      phone: "01899887766",
      orderId: "#NX-10481",
      task: "Call to confirm delivery and discuss 10-piece wholesale quote for 21V Drills",
      dueDate: "Today (Due)",
      status: "DUE",
    },
    {
      id: "f-3",
      customer: "Anika Chowdhury",
      phone: "01611223344",
      orderId: "#NX-10480",
      task: "Notify when RGB ScreenBar extra wireless dials arrive in stock",
      dueDate: "Tomorrow",
      status: "COMPLETED",
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "COMPLETED" ? "DUE" : "COMPLETED" }
          : t
      )
    );
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 font-sans text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Follow-ups &amp; Reconnection
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Scheduled staff follow-up calls, post-delivery satisfaction checks, and re-orders.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Follow-up Task</span>
        </button>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs divide-y divide-zinc-100">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-5 flex items-start justify-between gap-4 transition-colors ${
              task.status === "COMPLETED" ? "bg-zinc-50/70 opacity-60" : "hover:bg-zinc-50/50"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <input
                type="checkbox"
                checked={task.status === "COMPLETED"}
                onChange={() => toggleTask(task.id)}
                className="mt-1 w-4 h-4 rounded border-zinc-300 text-black focus:ring-0 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-950 text-sm">
                    {task.customer}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {task.orderId}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  {task.task}
                </p>
                <div className="flex items-center gap-4 mt-2.5 text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    {task.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {task.dueDate}
                  </span>
                </div>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                task.status === "COMPLETED"
                  ? "bg-zinc-100 text-zinc-600"
                  : "bg-amber-50 text-amber-800 border border-amber-200/60"
              }`}
            >
              {task.status === "COMPLETED" ? "Completed" : "Action Due"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
