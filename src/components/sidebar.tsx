"use client";

import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";

type Board = {
  id: string;
  name: string;
};

type SidebarProps = {
  boards: Board[];
  activeBoardId: string | null;
  setActiveBoardId: (id: string) => void;
  createNewBoard: (name: string) => void;
  deleteBoard: (id: string) => void;
};

const Sidebar = ({
  boards,
  activeBoardId,
  setActiveBoardId,
  createNewBoard,
  deleteBoard,
}: SidebarProps) => {
  const [newBoardName, setNewBoardName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      createNewBoard(newBoardName.trim());
      setNewBoardName("");
      setIsAdding(false);
    }
  };

  const handleDelete = (boardId: string) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      deleteBoard(boardId);
    }
  };

  return (
    <div className="w-64 bg-neutral-800 p-4">
      <h2 className="text-xl font-bold mb-4">Boards</h2>
      <ul>
        {boards.map((board) => (
          <li
            key={board.id}
            className={`flex justify-between items-center cursor-pointer p-2 rounded ${
              activeBoardId === board.id ? "bg-neutral-700" : ""
            }`}
          >
            <span onClick={() => setActiveBoardId(board.id)} className="flex-grow">
              {board.name}
            </span>
            <button
              onClick={() => handleDelete(board.id)}
              className="ml-2 text-neutral-400 hover:text-red-500"
            >
              <FiTrash />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {isAdding ? (
          <div>
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="New board name"
              className="w-full p-2 rounded bg-neutral-700"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setIsAdding(false)}
                className="text-sm text-neutral-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBoard}
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <FiPlus />
                Create
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 w-full justify-center rounded bg-neutral-700 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-600"
          >
            <FiPlus />
            Create New Board
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
