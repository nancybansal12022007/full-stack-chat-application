"use client";

export default function Messages({ messages }: { messages: any[] }) {
  return (
    <div className="divide-y divide-gray-800">
      {messages.map((message) => (
        <div key={message.id} className="p-4 border-b border-gray-800">
          <p className="text-lg">{message.text}</p>
        </div>
      ))}
    </div>
  );
}