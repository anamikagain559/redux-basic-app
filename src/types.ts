 export interface ITask {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
    priority: "low" | "medium" | "high";
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookInput {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}


export type BorrowInput = {
  book: string;
  quantity: number;
  dueDate: string;
};

export interface BorrowSummary {
  _id: string;
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummary[];
}
export const Genre = {
  FICTION: 'FICTION',
  NON_FICTION: 'NON_FICTION',
  SCIENCE: 'SCIENCE',
  HISTORY: 'HISTORY',
  BIOGRAPHY: 'BIOGRAPHY',
  FANTASY: 'FANTASY',
} as const;

export type Genre = keyof typeof Genre;