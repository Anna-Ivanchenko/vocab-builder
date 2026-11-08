import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTasks } from "../../redux/training/operations";
import { resetTraining } from "../../redux/training/slice";
import { selectResults, selectTasks } from "../../redux/training/selectors";
import Loader from "../../components/Loader/Loader";
import TrainingEmpty from "../../components/TrainingEmpty/TrainingEmpty";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";
import AddWordModal from "../../components/AddWordModal/AddWordModal";
import WellDoneModal from "../../components/WellDoneModal/WellDoneModal";

const TrainingPage = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const results = useAppSelector(selectResults);
  const [isReady, setIsReady] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    dispatch(fetchTasks()).finally(() => setIsReady(true));

    return () => {
      dispatch(resetTraining());
    };
  }, [dispatch]);

  const handleCloseResults = () => {
    setIsResultsOpen(false);
    dispatch(fetchTasks()).finally(() => setRound((prev) => prev + 1));
  };

  if (!isReady) return <Loader />;

  return (
    <div className="container">
      {tasks.length === 0 ? (
        <TrainingEmpty onAddWord={() => setIsAddOpen(true)} />
      ) : (
        <TrainingRoom
          key={round}
          tasks={tasks}
          onSaved={() => setIsResultsOpen(true)}
        />
      )}

      {isAddOpen && (
        <AddWordModal
          onClose={() => setIsAddOpen(false)}
          onSuccess={() => dispatch(fetchTasks())}
        />
      )}

      {isResultsOpen && (
        <WellDoneModal results={results} onClose={handleCloseResults} />
      )}
    </div>
  );
};

export default TrainingPage;
