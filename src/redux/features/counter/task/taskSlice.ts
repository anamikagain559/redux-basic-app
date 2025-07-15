import type { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState{
    tasks: ITask[];
}
const initialState : InitialState = {
    tasks: [
        {
        id: "1",
        title:" Initial Task",
        description: "Complete the Redux task management setup",  
        dueDate: "2023-10-31",  
        isCompleted: false,
        priority: "high",
    },
         {
        id: "2",
        title:" Secondary Task",
        description: "Complete the Redux task management setup",  
        dueDate: "2023-10-31",  
        isCompleted: false,
        priority: "high",
    },
    ]
   
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
})

export default taskSlice.reducer;