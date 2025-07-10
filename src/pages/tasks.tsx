import { useAppSelector } from '@/redux/hook';

const Tasks = () => {
  const tasks = useAppSelector((state) => state.todo.tasks);

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>{task.title}</div>
      ))}
    </div>
  );
};

export default Tasks;
