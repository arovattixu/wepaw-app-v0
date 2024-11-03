import React from 'react';

interface Member {
  id: string;
  name: string;
  avatar: string;
}

interface GroupMemberListProps {
  members: Member[];
}

export function GroupMemberList({ members }: GroupMemberListProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">Group Members</h4>
      <div className="grid grid-cols-2 gap-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium text-gray-900">{member.name}</span>
          </div>
        ))}
        {Array.from({ length: 10 - members.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <span className="text-gray-400">Waiting...</span>
          </div>
        ))}
      </div>
    </div>
  );
}