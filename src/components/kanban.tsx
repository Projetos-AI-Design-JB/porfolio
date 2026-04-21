"use client";

import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
  useEffect,
} from "react";
import { FiPlus, FiTrash, FiEdit, FiCopy } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import Sidebar from "./sidebar";

export const Kanban = () => {
  return <KanbanApp />;
};

const KanbanApp = () => {
  const [boards, setBoards] = useLocalStorage<BoardType[]>("boards", [
    {
      id: "board-1",
      name: "Default Board",
      cards: DEFAULT_CARDS,
    },
  ]);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(
    boards.length > 0 ? boards[0].id : null
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Migrate cards from "todo" to "to do"
    const needsColumnMigration = boards.some((b) => b.cards.some((c) => c.column === ("todo" as any)));
    const needsDateMigration = boards.some((b) => b.cards.some((c) => !c.createdAt));

    if (needsColumnMigration || needsDateMigration) {
      const migratedBoards = boards.map((board) => ({
        ...board,
        cards: board.cards.map((card) => {
          let updatedCard = { ...card };
          if (updatedCard.column === ("todo" as any)) {
            updatedCard.column = "to do";
          }
          if (!updatedCard.createdAt) {
            updatedCard.createdAt = new Date().toISOString();
          }
          return updatedCard;
        }),
      }));
      setBoards(migratedBoards);
    }
  }, [boards, setBoards]);

  const activeBoard = boards.find((board) => board.id === activeBoardId);

  const createNewBoard = (name: string) => {
    const newBoard: BoardType = {
      id: `board-${Date.now()}`,
      name,
      cards: [],
    };
    setBoards([...boards, newBoard]);
    setActiveBoardId(newBoard.id);
  };

  const deleteBoard = (boardId: string) => {
    const newBoards = boards.filter((board) => board.id !== boardId);
    setBoards(newBoards);
    if (activeBoardId === boardId) {
      setActiveBoardId(newBoards.length > 0 ? newBoards[0].id : null);
    }
  };

  const setCardsForActiveBoard = (updater: SetStateAction<CardType[]>) => {
    const newBoards = boards.map((board) => {
      if (board.id === activeBoardId) {
        const newCards =
          typeof updater === "function" ? updater(board.cards) : updater;
        return { ...board, cards: newCards };
      }
      return board;
    });
    setBoards(newBoards);
  };

  const handleUpdateCard = (cardId: string, newTitle: string) => {
    if (!activeBoard) return;
    const newCards = activeBoard.cards.map((card) =>
      card.id === cardId ? { ...card, title: newTitle } : card
    );
    setCardsForActiveBoard(newCards);
  };

  const handleCopyCard = (cardId: string) => {
    if (!activeBoard) return;

    const cardToCopy = activeBoard.cards.find((c) => c.id === cardId);
    if (!cardToCopy) return;

    const newCard: CardType = {
      ...cardToCopy,
      id: Math.random().toString(),
      title: cardToCopy.title + " (Copy)",
      createdAt: new Date().toISOString(),
    };

    const originalCardIndex = activeBoard.cards.findIndex(
      (c) => c.id === cardId
    );

    const newCards = [...activeBoard.cards];
    newCards.splice(originalCardIndex + 1, 0, newCard);

    setCardsForActiveBoard(newCards);
  };

  const handleDeleteCard = (cardId: string) => {
    if (!activeBoard) return;
    const newCards = activeBoard.cards.filter((card) => card.id !== cardId);
    setCardsForActiveBoard(newCards);
  };
  if (!mounted) {
    return (
      <div className="h-screen w-full bg-neutral-900" />
    );
  }

  return (
    <div className="flex h-screen w-full bg-neutral-900 text-neutral-50 font-open-sans">
      <Sidebar
        boards={boards}
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
        createNewBoard={createNewBoard}
        deleteBoard={deleteBoard}
      />
      {activeBoard ? (
        <Board
          cards={activeBoard.cards}
          setCards={setCardsForActiveBoard}
          handleUpdateCard={handleUpdateCard}
          handleCopyCard={handleCopyCard}
          handleDeleteCard={handleDeleteCard}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl">No boards found.</h2>
          <p>Create a new board to get started.</p>
        </div>
      )}
    </div>
  );
};

const Board = ({
  cards,
  setCards,
  handleUpdateCard,
  handleCopyCard,
  handleDeleteCard,
}: {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  handleUpdateCard: (cardId: string, newTitle: string) => void;
  handleCopyCard: (cardId: string) => void;
  handleDeleteCard: (cardId: string) => void;
}) => {
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
        handleUpdateCard={handleUpdateCard}
        handleCopyCard={handleCopyCard}
        handleDeleteCard={handleDeleteCard}
      />
      <Column
        title="TO DO"
        column="to do"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
        handleUpdateCard={handleUpdateCard}
        handleCopyCard={handleCopyCard}
        handleDeleteCard={handleDeleteCard}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
        handleUpdateCard={handleUpdateCard}
        handleCopyCard={handleCopyCard}
        handleDeleteCard={handleDeleteCard}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
        handleUpdateCard={handleUpdateCard}
        handleCopyCard={handleCopyCard}
        handleDeleteCard={handleDeleteCard}
      />
      <div className="sticky top-12 h-fit">
        <BurnBarrel setCards={setCards} />
      </div>
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  handleUpdateCard: (cardId: string, newTitle: string) => void;
  handleCopyCard: (cardId: string) => void;
  handleDeleteCard: (cardId: string) => void;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  handleUpdateCard,
  handleCopyCard,
  handleDeleteCard,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              handleUpdateCard={handleUpdateCard}
              handleCopyCard={handleCopyCard}
              handleDeleteCard={handleDeleteCard}
              headingColor={headingColor}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
  handleUpdateCard: (cardId: string, newTitle: string) => void;
  handleCopyCard: (cardId: string) => void;
  handleDeleteCard: (cardId: string) => void;
  headingColor: string;
};

const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
          onClick={(e) => e.stopPropagation()} // Prevent card drag from firing on link click
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const Card = ({
  title,
  id,
  column,
  createdAt,
  handleDragStart,
  handleUpdateCard,
  handleCopyCard,
  handleDeleteCard,
  headingColor,
}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSave = () => {
    if (editTitle.trim()) {
      handleUpdateCard(id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditTitle(title);
    }
  };

  const getBorderColor = (colorClass: string) => {
    switch (colorClass) {
      case "text-neutral-500":
        return "#737373";
      case "text-yellow-200":
        return "#FEF08A";
      case "text-blue-200":
        return "#BFDBFE";
      case "text-emerald-200":
        return "#A7F3D0";
      default:
        return "#737373"; // Default color
    }
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column, createdAt })}
        className={cn(
          "group relative cursor-grab rounded border p-3 active:cursor-grabbing transition-all duration-200",
          column === "done" 
            ? "bg-emerald-950/40 border-emerald-500/40 shadow-sm shadow-emerald-900/20 hover:bg-emerald-900/40" 
            : "border-neutral-700 bg-neutral-800 hover:bg-neutral-700/50"
        )}
        style={{ borderLeft: `4px solid ${getBorderColor(headingColor)}` }}
      >
        {isEditing ? (
          <textarea
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full resize-none rounded bg-transparent text-sm text-neutral-100 focus:outline-none"
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          />
        ) : (
          <p
            className={cn(
              "text-sm",
              column === "done" ? "text-emerald-50/90 line-through decoration-emerald-500/50" : "text-neutral-100"
            )}
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {linkify(title)}
          </p>
        )}
        <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-2">
          <button onClick={() => handleCopyCard(id)}>
            <FiCopy />
          </button>
          <button onClick={() => setIsEditing(true)}>
            <FiEdit />
          </button>
          <button
            onClick={() => handleDeleteCard(id)}
            className="text-red-400 hover:text-red-500 transition-colors"
          >
            <FiTrash />
          </button>
        </div>
        {createdAt && (
          <p className="mt-2 text-right text-xs text-neutral-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        )}
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: CardType = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
      createdAt: new Date().toISOString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

type ColumnType = "backlog" | "todo" | "doing" | "done" | "to do";

type CardType = {
  title: string;
  id: string;
  column: ColumnType;
  createdAt: string;
};

type BoardType = {
  id: string;
  name: string;
  cards: CardType[];
};

const DEFAULT_CARDS: CardType[] = [
  {
    title: "Look into render bug in dashboard",
    id: "1",
    column: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    title: "SOX compliance checklist",
    id: "2",
    column: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    title: "[SPIKE] Migrate to Azure",
    id: "3",
    column: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Document Notifications service",
    id: "4",
    column: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "to do",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Postmortem for outage",
    id: "6",
    column: "to do",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Sync with product on Q3 roadmap",
    id: "7",
    column: "to do",
    createdAt: new Date().toISOString(),
  },

  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Add logging to daily CRON",
    id: "9",
    column: "doing",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
    createdAt: new Date().toISOString(),
  },
];
