import React, { useCallback, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useRequests from './hooks/use-requests';

function App() {

  const [tasks, setTasks] = useState([]);

  const transformTasks =useCallback((data)=>{
    const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

     setTasks(loadedTasks);
  },[])

  const {error,sendRequests,loading} = useRequests(transformTasks)

  
  useEffect(() => {
    sendRequests({url:'https://react-http-6b4a6.firebaseio.com/tasks.json'},);
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={loading}
        error={error}
        onFetch={sendRequests}
      />
    </React.Fragment>
  );
}

export default App;
