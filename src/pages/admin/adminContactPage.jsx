import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../../components/loader";
import { BiTrash } from "react-icons/bi";

export default function AdminContactPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadMessages() {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/contact");
      setMessages(res.data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      console.error("Failed to load messages");
    }
  }

  async function deleteMessage(id) {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + "/api/contact/" + id);
      loadMessages();
    } catch {
      console.error("Delete failed");
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="w-full min-h-screen bg-primary/40 p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            Contact Messages
          </h1>
          <p className="text-sm text-secondary/70">
            Manage all contact form messages from your website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-secondary/10 bg-white/70 px-4 py-2 text-sm text-secondary shadow-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
            Total:{" "}
            <span className="ml-1 font-semibold text-secondary">{messages.length}</span>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white rounded-2xl border border-secondary/10 p-4 shadow-sm hover:bg-primary/70 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-secondary">{msg.name}</h3>
              <button
                onClick={() => deleteMessage(msg._id)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                <BiTrash />
              </button>
            </div>
            <p className="text-secondary/70 text-xs">{msg.email}</p>
            <p className="mt-2 text-secondary/80">{msg.message}</p>
            <p className="text-xs text-secondary/60 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-secondary/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)] overflow-hidden mt-6">
        <div className="hidden sm:block w-full overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-[900px] text-left">
              <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur">
                <tr className="text-xs uppercase tracking-wider text-secondary/70">
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">Message</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="group hover:bg-primary/35 transition-colors"
                  >
                    <td className="px-5 py-4 font-semibold text-secondary">{msg.name}</td>
                    <td className="px-5 py-4 text-secondary/70">{msg.email}</td>
                    <td className="px-5 py-4 max-w-[400px] break-words text-secondary/80">
                      {msg.message}
                    </td>
                    <td className="px-5 py-4 text-secondary/70">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        <BiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-12 text-center text-secondary/60"
                      colSpan={5}
                    >
                      No messages to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}