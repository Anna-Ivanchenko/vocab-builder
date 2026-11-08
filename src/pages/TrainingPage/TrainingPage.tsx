import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTasks } from "../../redux/training/operations";
import { resetTraining } from "../../redux/training/slice";
import { selectTasks } from "../../redux/training/selectors";
import Loader from "../../components/Loader/Loader";
import TrainingEmpty from "../../components/TrainingEmpty/TrainingEmpty";
import AddWordModal from "../../components/AddWordModal/AddWordModal";

const TrainingPage = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const [isReady, setIsReady] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks()).finally(() => setIsReady(true));

    return () => {
      dispatch(resetTraining());
    };
  }, [dispatch]);

  if (!isReady) return <Loader />;

  return (
    <div className="container">
      {tasks.length === 0 ? (
        <TrainingEmpty onAddWord={() => setIsAddOpen(true)} />
      ) : (
        <p>Training room: {tasks.length} tasks</p>
      )}

      {isAddOpen && (
        <AddWordModal
          onClose={() => setIsAddOpen(false)}
          onSuccess={() => dispatch(fetchTasks())}
        />
      )}
    </div>
  );
};

export default TrainingPage;
