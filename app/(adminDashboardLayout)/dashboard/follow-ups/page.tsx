'use client';

import { useState, useMemo } from 'react';
import { Check, Eye, Pencil } from 'lucide-react';

type TaskFilterTab = 'Due today' | 'Overdue' | 'Upcoming' | 'Completed';
type TaskStatusBadge = 'Overdue' | 'Due today' | 'Upcoming' | 'Completed';

interface FollowUpTask {
  id: string;
  time: string;
  customer: string;
  note: string;
  assignee: string;
  status: TaskStatusBadge;
  completed?: boolean;
}

const FILTER_TABS: { label: TaskFilterTab; count: number }[] = [
  { label: 'Due today', count: 12 },
  { label: 'Overdue', count: 3 },
  { label: 'Upcoming', count: 24 },
  { label: 'Completed', count: 86 },
];

const INITIAL_TASKS: FollowUpTask[] = [
  {
    id: 'task-1',
    time: '10:00 AM',
    customer: 'Ayesha Rahman',
    note: 'Post-delivery satisfaction check',
    assignee: 'Rafi Hassan',
    status: 'Overdue',
    completed: false,
  },
  {
    id: 'task-2',
    time: '11:30 AM',
    customer: 'Rafiqul Islam',
    note: 'Notify: precision kit back in stock',
    assignee: 'Nadia Islam',
    status: 'Due today',
    completed: false,
  },
  {
    id: 'task-3',
    time: '12:00 PM',
    customer: 'Nusrat Jahan',
    note: 'Confirm wholesale inquiry requirements',
    assignee: 'Rafi Hassan',
    status: 'Due today',
    completed: false,
  },
  {
    id: 'task-4',
    time: '2:30 PM',
    customer: 'Farhana Akter',
    note: 'Check lamp replacement delivery',
    assignee: 'Nadia Islam',
    status: 'Due today',
    completed: false,
  },
  {
    id: 'task-5',
    time: '4:00 PM',
    customer: 'Tanvir Ahmed',
    note: 'Help complete pending payment',
    assignee: 'Rafi Hassan',
    status: 'Due today',
    completed: false,
  },
];

const BADGE_STYLES: Record<TaskStatusBadge, string> = {
  Overdue: 'bg-[#F8E5E3] text-[#B85D52] font-semibold',
  'Due today': 'bg-neutral-100/95 text-neutral-900 font-semibold',
  Upcoming: 'bg-neutral-100/95 text-neutral-900 font-semibold',
  Completed: 'bg-neutral-100/95 text-neutral-900 font-semibold',
};

export default function FollowUpTasksPage() {
  const [tasks, setTasks] = useState<FollowUpTask[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<TaskFilterTab>('Due today');

  // Quick add follow-up form state
  const [isAdding, setIsAdding] = useState(false);
  const [newCustomer, setNewCustomer] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newTime, setNewTime] = useState('5:30 PM');
  const [newAssignee, setNewAssignee] = useState('Rafi Hassan');

  const toggleTaskCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const visibleTasks = useMemo(() => {
    if (activeTab === 'Completed') {
      return tasks.filter((t) => t.completed);
    }
    if (activeTab === 'Overdue') {
      return tasks.filter((t) => !t.completed && t.status === 'Overdue');
    }
    if (activeTab === 'Upcoming') {
      return tasks.filter((t) => !t.completed && t.status === 'Upcoming');
    }
    return tasks.filter((t) => !t.completed);
  }, [tasks, activeTab]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.trim() || !newNote.trim()) return;

    const created: FollowUpTask = {
      id: `task-${Date.now()}`,
      time: newTime,
      customer: newCustomer.trim(),
      note: newNote.trim(),
      assignee: newAssignee,
      status: 'Due today',
      completed: false,
    };

    setTasks((prev) => [...prev, created]);
    setNewCustomer('');
    setNewNote('');
    setIsAdding(false);
  };

  return (
    <main className="min-h-screen px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full space-y-5">
        {/* 1. TOP HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
              Follow-up tasks
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              The right conversation, at the right time.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAdding((prev) => !prev)}
            className="inline-flex h-11 items-center justify-center self-start rounded-md bg-[#111111] px-5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
          >
            + Schedule follow-up
          </button>
        </header>

        {/* Optional Quick Schedule Form */}
        {isAdding && (
          <form
            onSubmit={handleAddTask}
            className="grid grid-cols-1 gap-3 rounded-lg border border-neutral-200 bg-neutral-50/70 p-4 sm:grid-cols-2 lg:grid-cols-12"
          >
            <input
              type="text"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              placeholder="Customer name"
              className="h-10 rounded-md border border-neutral-200 bg-white px-3.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none lg:col-span-3"
            />
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Follow-up note"
              className="h-10 rounded-md border border-neutral-200 bg-white px-3.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none lg:col-span-4"
            />
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="Time (e.g., 5:30 PM)"
              className="h-10 rounded-md border border-neutral-200 bg-white px-3.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none lg:col-span-2"
            />
            <div className="flex items-center gap-2 lg:col-span-3">
              <button
                type="submit"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-[#111111] px-4 text-xs font-medium text-white hover:bg-neutral-800"
              >
                Add task
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-200/80 px-3.5 text-xs font-medium text-neutral-800 hover:bg-neutral-300/80"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* 2. FILTER TABS ROW (4-BLOCK GRID) */}
        <section
          aria-label="Follow-up task filters"
          className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`flex h-12 items-center gap-2 rounded-md px-4 text-left text-xs transition-colors ${
                  isActive
                    ? 'bg-[#111111] font-semibold text-white'
                    : 'bg-neutral-100/85 font-semibold text-neutral-900 hover:bg-neutral-200/70'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={
                    isActive ? 'font-semibold text-white' : 'text-neutral-900'
                  }
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </section>

        {/* 3. TASK LIST CARD */}
        <section
          aria-label="Today follow-up tasks"
          className="rounded-lg border border-neutral-200/90 bg-white"
        >
          {/* Card Date Header */}
          <div className="px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
            <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
              Today · 22 October 2025
            </h2>
          </div>

          {/* Actions Header aligned on right for desktop */}
          <div className="hidden border-b border-neutral-200/80 px-6 pb-2.5 text-right text-xs font-normal text-neutral-500 md:block">
            <span className="inline-block w-20 text-left">Actions</span>
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-neutral-200/80">
            {visibleTasks.length > 0 ? (
              visibleTasks.map((task) => {
                const isChecked = Boolean(task.completed);

                return (
                  <div
                    key={task.id}
                    className="flex flex-col gap-3.5 px-5 py-4 transition-colors hover:bg-neutral-50/70 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-4"
                  >
                    {/* Left Group: Checkbox + Time + Customer & Note */}
                    <div className="flex items-start gap-4 sm:items-center sm:gap-5">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isChecked}
                        aria-label={`Mark ${task.customer} follow-up as completed`}
                        onClick={() => toggleTaskCompleted(task.id)}
                        className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors md:mt-0 ${
                          isChecked
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-neutral-400 bg-white hover:border-neutral-700'
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3" strokeWidth={2.5} />}
                      </button>

                      <span className="w-16 shrink-0 text-xs text-neutral-600">
                        {task.time}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={`text-xs font-bold sm:text-[13px] ${
                            isChecked
                              ? 'text-neutral-400 line-through'
                              : 'text-neutral-950'
                          }`}
                        >
                          {task.customer}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-400">
                          {task.note}
                        </p>
                      </div>
                    </div>

                    {/* Right Group: Assignee + Status Badge + Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pl-9 sm:pl-25 md:justify-end md:gap-12 md:pl-0">
                      <span className="text-xs text-neutral-400 md:min-w-[140px]">
                        {task.assignee}
                      </span>

                      <span
                        className={`inline-block min-w-[96px] rounded px-3 py-1.5 text-left text-xs ${
                          BADGE_STYLES[task.status]
                        }`}
                      >
                        {task.status}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`View follow-up for ${task.customer}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                        >
                          <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>

                        <button
                          type="button"
                          aria-label={`Edit follow-up for ${task.customer}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                        >
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-10 text-center text-xs text-neutral-500">
                No follow-up tasks in this view.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}