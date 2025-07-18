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
  available?: boolean;
}


export type BorrowInput = {
  book: string;
  quantity: number;
  dueDate: string;
};

export interface BorrowSummary {
  bookTitle: string;
  isbn: string;
  totalBorrowed: number;
}